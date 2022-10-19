import { useRouter } from 'next/router'
import React from 'react'

import { SignUpScreen } from '../components/SignUpScreen'
import { useMainContext } from '../contexts'
import styles from '../styles/Home.module.css'

export default function Home() {
    const { user, loading } = useMainContext()
    const router = useRouter()
    if (loading) {
        return (
            <div className={styles.container}>
                <h2 className={styles.check}>Check your Auth</h2>
            </div>
        )
    }
    if (user) {
        router.push('/rooms')
    }
    return (
        <div className={styles.container}>
            {!user && !loading && (
                <main className={styles.main}>
                    <SignUpScreen />
                </main>
            )}
        </div>
    )
}
