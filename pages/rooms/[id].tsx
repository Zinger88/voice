//import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Button } from '../../components/Button'
import { RoomsService } from '../../services/rooms'
import styles from '../../styles/Room.module.scss'

interface IRoom {
    id: string
    roomName: string
    members: string[]
}

const Room = () => {
    const router = useRouter()
    const id = router.query.id as string
    const [room, setRoom] = useState<IRoom | undefined>()
    useEffect(() => {
        if (id) {
            const getRoom = async () => {
                const currentRoom = await RoomsService.getRoom(id)
                setRoom(currentRoom)
            }
            void getRoom()
        } else {
            void router.push('/rooms')
        }
    }, [id])

    if (!room) {
        return null
    }

    const onBackHandler = () => {
        router.back()
    }

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
                        {room.members.map((user: any, index: number) => {
                            return (
                                <div key={user + '_' + index} className={styles.user}>
                                    <div className={styles.avatar}>
                                        {/*<Image src="/static/user.png" alt="user logo" width={100} height={100} />*/}
                                    </div>
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
