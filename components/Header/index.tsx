import { useRouter } from 'next/router'
import React from 'react'

import { useMainContext } from '../../contexts'
import styles from './Header.module.css'

// eslint-disable-next-line react/display-name
export const Header = React.memo(() => {
    const { user, loading } = useMainContext()
    const router = useRouter()
    const onHandleClick = () => {
        router.push('/profile')
    }
    console.log(user?.email)
    return (
        <div className="container-1200">
            <div className={styles.main}>
                <div className={styles.logo}>Voice</div>
                <div className={styles.user} onClick={onHandleClick}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div className={styles.name}>{user?.email || 'Unregiistered'}</div>
                            <div className={styles.avatar}>
                                <img
                                    src={user ? user.photoURL : '/static/user.png'}
                                    alt="user avatar"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
})
