// @ts-ignore
import { useRouter } from 'next/router'
import { Peer } from 'peerjs'

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'

import { Button } from '../../components/Button'
import { useAuthContext } from '../../contexts'
import { RoomsService } from '../../services/rooms'
import styles from '../../styles/Room.module.scss'

interface IRoom {
    id: string
    roomName: string
    members: string[]
}

let peer: Peer;
const Video = (props: any) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = props.stream
        }
    }, [])
    return <video style={{ width: '100%', height: 'auto' }} ref={videoRef} muted autoPlay />
}

interface IVideos {
    [key: string]: MediaStream
}

const NoSsrRoom = () => {
    const { user } = useAuthContext()
    const router = useRouter()
    const id = router.query.id as string
    const [room, setRoom] = useState<IRoom | undefined>()
    const refUsersVideos2 = useRef<{} | IVideos>({});
    const [members, setMembers] = useState<string[]>([]);

    const addUserToObj = (stream: any, id: string) => {
        // @ts-ignore
        if (refUsersVideos2.current[id]) return
        // @ts-ignore
        refUsersVideos2.current[id] = stream
        setMembers(prevState => {
            if (prevState.includes(id)) return prevState;
            return [...prevState, id]
        });
    }
    const connectToNewUser = (userId: string, media: MediaStream) => {
        const call = peer.call(userId, media)
        call.on('stream', (userVideoStream: any) => {
            console.log('on stream . get another stream from connect to new User', userVideoStream);
            addUserToObj(userVideoStream, userId)
        })

        call.on('close', () => {
            console.log('remove ----------', userId)
        })
    }

    useEffect(() => {
        if (!room) return
        console.log(room.members, members)
        room.members.forEach(member => {
            if (!Object.keys(refUsersVideos2.current).includes(member) && member !== user.uid) {
                if (peer) {
                    // @ts-ignore
                    connectToNewUser(member, refUsersVideos2.current[user.uid])
                }
            }
        })

        if (room.members.length < members.length) {
            members.forEach(member => {
                if (!room.members.includes(member)) {
                    // @ts-ignore
                    delete refUsersVideos2.current[member]
                    setMembers(room.members)
                    console.log('DELETE VIDEO')
                }
            })

        }

    }, [room?.members, Object.keys(refUsersVideos2.current).length])

    useEffect(() => {
        if (!id) return
        async function startCapture() {
            const mediaStreem = await navigator?.mediaDevices?.getUserMedia({
                audio: true,
                video: {
                    height: 50,
                    width: 50,
                },
            })
            return mediaStreem
        }

        startCapture()
            .then((media) => {
                const mediaStream = media
                addUserToObj(mediaStream, user.uid) // my video to render

                peer = new Peer(user.uid, {
                    //host: '/',
                    //port: '3002', // commented to use free server
                })

                peer.on('open', () => {
                    console.log('I join')
                    // firebase triggered setRoom
                })

                peer.on('call', (call) => {
                    console.log('another peer call')
                    call.answer(media)
                    call.on('stream', (userVideoStream) => {
                        // add new stream
                        console.log('call on stream from peer initialization. add new video to render', userVideoStream)
                        addUserToObj(userVideoStream, user.uid) //
                    })
                })

                peer.on('disconnected', (obj) => {
                    console.log('disconnect', obj)
                })
            })
            .catch((err) => {
                console.log('error getting user media streem', err)
            })
    }, [id])

    useEffect(() => {
        let oneRoomListener: any
        if (!id) void router.push('/rooms')
        const setRoomsData = async () => {
            await RoomsService.setMemberToRoom(id, user.uid)
            oneRoomListener = await RoomsService.oneRoomSubscribe(id, setRoom)
        }
        void setRoomsData()
        return () => {
            if (oneRoomListener) {
                oneRoomListener()
            }
            void RoomsService.leaveMemberFromRoom(user.uid)
        }
    }, [id]);

    useLayoutEffect(() => {
        return () => {
            if (peer) {
                peer.disconnect()
            }
            if (refUsersVideos2.current) {
                Object.values(refUsersVideos2.current).forEach((video: MediaStream) => {
                    const tracks = video.getTracks()
                    tracks.forEach((track) => {
                        track.stop()
                    })
                })
            }
            refUsersVideos2.current = {}
        }
    }, [])

    const onBackHandler = () => {
        router.back()
    }

    if (!room) return null
    return (
        <div className="main">
            <div className="container-1200">
                <div className="mb-30" onClick={onBackHandler}>
                    <Button>Back to rooms</Button>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.topbar}>
                        <div className={styles.title}>{room?.roomName}</div>
                        <div className={styles.leave} onClick={() => router.back()}>
                            Leave room
                        </div>
                    </div>
                    <div className={styles.users}>
                        {Object.values(refUsersVideos2.current).length > 0 && Object.values(refUsersVideos2.current).map((stream, index) => {
                            return (
                                <div
                                    key={index + 'video'}
                                    style={{ border: '1px solid black', borderRadius: '5px', padding: '5px' }}
                                >
                                    <Video stream={stream} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoSsrRoom
