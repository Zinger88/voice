import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';



import { Button } from '../../components/Button';
import { useAuthContext } from "../../contexts";
import { RoomsService } from '../../services/rooms';
import styles from '../../styles/Room.module.scss';


interface IRoom {
    id: string
    roomName: string
    members: string[]
}

const Room = () => {
    const { user } = useAuthContext()
    const router = useRouter()
    const id = router.query.id as string
    const [room, setRoom] = useState<IRoom | undefined>()

    const audioTag = useRef(null)
    const localMediaStreem = useRef<any>(null)


    useEffect(() => {
        console.log('effect room members', room?.members)
        if(room) {
            async function startCapture() {
                const mediaStreem = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                })
                return mediaStreem
            }

            startCapture().then((media) => {
                const mediaStreem = media
                localMediaStreem.current = media
                if(audioTag?.current) {
                    //audioTag.current.srcObject = mediaStreem
                }
            }).catch((err) => {
                console.log('error getting user media streem', err)
            })
        }
        return () => {
            if(localMediaStreem.current) {
                localMediaStreem.current.getTracks().forEach((track: any) => track.stop())
            }
        }
    }, [room?.members])

    useEffect(() => {
        console.log('effect id', id)
        let oneRoomListener: any
        if(!id) void router.push('/rooms')
        const setRoomsData = async () => {
            await RoomsService.setMemberToRoom(id, user.email)
            oneRoomListener = await RoomsService.oneRoomSubscribe(id, setRoom)
        }
        void setRoomsData()

        return () => {
            if(oneRoomListener) {
                oneRoomListener()
            }

            void RoomsService.leaveMemberFromRoom(user.email)
        }
    }, [id])

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
                        {room?.members.map((user: any, index: number) => {
                            return (
                                <div key={user + '_' + index} className={styles.user}>
                                    <div className={styles.avatar}>
                                        <Image src={'/static/user.png'} alt="user logo" width={100} height={100} />
                                    </div>
                                    <audio
                                        ref={audioTag}
                                        //muted={true}
                                        autoPlay
                                    ></audio>
                                    <div className={styles.userName}>{user}</div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room
