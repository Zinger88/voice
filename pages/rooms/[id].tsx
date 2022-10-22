import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import Axios from '../../api/axios'
import { Button } from '../../components/Button'
import styles from '../../styles/Room.module.scss'

const Room = ({ title, users }: { title: string; users: [] }) => {
    const router = useRouter()
    if (!users) {
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
                        <div className={styles.title}>{title}</div>
                        <div className={styles.leave} onClick={() => router.back()}>
                            Leave room
                        </div>
                    </div>
                    <div className={styles.users}>
                        {users.map((user: any, index: number) => {
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

export async function getServerSideProps(context: any) {
    const { data } = await Axios.get('/rooms.json')
    const room = data.find((i: any) => context.query.id)
    return {
        props: room,
    }
}

export default Room
