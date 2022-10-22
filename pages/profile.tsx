import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Button } from '../components/Button'
import { AuthContext } from '../contexts/AuthContext'
import { useLogout } from '../hooks/useLogout'
import styles from '../styles/Profile.module.scss'

export default function Profile() {
    const { user } = useContext(AuthContext)
    const router = useRouter()
    const { logout } = useLogout()

    const onLogoutHandler = async () => {
        await logout()
        await router.push('/')
    }

    return (
        <div className="main">
            <div className="container-1200">
                <div className={styles.headline}>
                    <h1>Profile</h1>
                    <Button onClick={() => router.back()}>Back</Button>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.avatar}>
                            <img src={user?.photoURL} alt="avatar" />
                        </div>
                        <div className={styles.name}>Name: <span>{user?.displayName}</span></div>
                        <div className={styles.email}>Email: <span>{user?.email}</span></div>
                        <Button onClick={onLogoutHandler}>LogOut</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
