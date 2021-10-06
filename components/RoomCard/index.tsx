import React from 'react';
import styles from './RoomCard.module.scss';
import Image from 'next/image'

interface RoomCard {
    title: string;
    users: CardUser[];
    usersCount: number;
}

interface CardUser {
    name: string;
    avatarSrc?: string;
}

export const RoomCard : React.FC<RoomCard> = ({
    title,
    users = [],
    usersCount
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.membersCount}>Количесво участников: {usersCount}</div>
            <ul className={styles.members}>
                {users.map((user) => {
                    return (
                        <li 
                            key={user.name}
                            className={styles.member}
                        >
                            <div className={styles.avatar}>
                                <Image src={"/static/user.png"} alt={""} width={40} height={40}/>
                            </div>
                            <div className={styles.memberName}>{user.name}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}