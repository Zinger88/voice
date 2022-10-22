import { useRouter } from 'next/router'
import React from 'react'

import { SignUpScreen } from '../components/SignUpScreen'
import { useAuthContext } from '../contexts'
import styles from '../styles/Home.module.css'

export default function Home() {
    const { user } = useAuthContext()
    const router = useRouter()

    if (user) {
        router.push('/rooms')
    }
    return (
        <div className={styles.container}>
            {!user && (
                <main className={styles.main}>
                    <SignUpScreen />
                </main>
            )}
        </div>
    )
}
