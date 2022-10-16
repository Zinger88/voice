import React from 'react'
import { useRouter } from 'next/router'
import { Header } from '../../components/Header'
import styles from '../../styles/Room.module.scss'
import Image from 'next/image'
import axios from '../../core/axios'

interface Room {
    id: string
    title: string
    users: Users[]
    usersCount: string
}

interface Users {
    name: string
    avatarSrc?: string
}

const Room: React.FC<Room> = ({ room: room }) => {
    const router = useRouter()
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
                        <div
                            className={styles.leave}
                            onClick={() => router.back()}>
                            Leave room
                        </div>
                    </div>
                    <div className={styles.users}>
                        {room.users.map((user: any, index: number) => {
                            return (
                                <div
                                    key={user.name + '_' + index}
                                    className={styles.user}>
                                    <div className={styles.avatar}>
                                        <Image
                                            src="/static/user.png"
                                            alt="user logo"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className={styles.userName}>
                                        {user.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const { data } = await axios({
        method: 'get',
        url: '/rooms.json',
        baseURL: 'http://localhost:3000/',
    })
    const pageId = context.query.id
    const room = data.find((item: any) => item.id === pageId)
    return {
        props: {
            room,
        },
    }
}

export default Room
