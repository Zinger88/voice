import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'

import { Header } from '../../components/Header'
import Axios from '../../core/axios'
import styles from '../../styles/Room.module.scss'

interface Users {
    name: string
    avatarSrc?: string
}

interface Room {
    id: string
    title: string
    users: []
}

const Room: React.FC = () => {
    const router = useRouter()
    const { id } = router.query
    const [room , setRoom] = useState<Room>({
        id: '',
        title: '',
        users: []
    })

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await Axios({
                method: 'get',
                url: '/rooms.json',
            })
            if (id) {
                const room = data.find((i : Room) => i.id === id)
                setRoom(room)
            }
        }
        getRooms()
    },[])

    if(!room) {
        return <div></div>
    }

    return (
        <div className="main">
            <Header />
            <div className="container-1200">
                <div className="mb-30" onClick={() => router.back()}>
                    All rooms
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.topbar}>
                        <div className={styles.title}>{room.title}</div>
                        <div className={styles.leave} onClick={() => router.back()}>
                            Leave room
                        </div>
                    </div>
                    <div className={styles.users}>
                        {room.users.map((user: any, index: number) => {
                            return (
                                <div key={user.name + '_' + index} className={styles.user}>
                                    <div className={styles.avatar}>
                                        <Image src="/static/user.png" alt="user logo" width={100} height={100} />
                                    </div>
                                    <div className={styles.userName}>{user.name}</div>
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
