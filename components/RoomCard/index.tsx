import Image from 'next/image'
import React from 'react'

import styles from './RoomCard.module.scss'

interface RoomCard {
    title: string
    users: string[]
    usersCount: number
}


export const RoomCard: React.FC<RoomCard> = ({
    title,
    users = [],
    usersCount,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>{title}</div>
            <div className={styles.membersCount}>
                Количесво участников: {usersCount}
            </div>
            <ul className={styles.members}>
                {users.map((user) => {
                    return (
                        <li key={user} className={styles.member}>
                            <div className={styles.avatar}>
                                <Image
                                    src={'/static/user.png'}
                                    alt={''}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className={styles.memberName}>{user}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
