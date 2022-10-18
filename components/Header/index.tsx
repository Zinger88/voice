import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { useMainContext } from '../../contexts'
import styles from './Header.module.css'

// eslint-disable-next-line react/display-name
export const Header = React.memo((props: any) => {
    const { user } = useMainContext()
    const router = useRouter()
    const onHandleClick = () => {
        router.push('/profile/1')
    }
    return (
        <div className="container-1200">
            <div className={styles.main}>
                <div className={styles.logo}>Voice</div>
                <div className={styles.user} onClick={onHandleClick}>
                    <div className={styles.name}>{user?.email || user?.fullName}</div>
                    <div className={styles.avatar}>
                        <img src={user ? user.photoURL : '/static/user.png'} alt="user logo" width={50} height={50} />
                    </div>
                </div>
            </div>
        </div>
    )
})
