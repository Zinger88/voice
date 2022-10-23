import { useRouter } from 'next/router'
import React from 'react'

import { useAuthContext } from '../../contexts'
import styles from './Header.module.scss'

// eslint-disable-next-line react/display-name
export const Header = React.memo(() => {
    const { user, loading } = useAuthContext()
    const router = useRouter()
    const onHandleClick = () => {
        void router.push('/profile')
    }

    return (
        <div className="container-1200">
            <div className={styles.main}>
                <div className={styles.logo}>
                    Voice <span>_</span>
                </div>
                {user && (
                    <div className={styles.user} onClick={onHandleClick}>
                        <div className={styles.name}>{user.email || 'Unregiistered'}</div>
                        <div className={styles.avatar}>
                            <img src={user ? user.photoURL : '/static/user.png'} alt="user avatar" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
})
