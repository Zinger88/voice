import { useRouter } from 'next/router'
import React, {useEffect} from 'react'

import { SignUpScreen } from '../components/SignUpScreen'
import { useAuthContext } from '../contexts'
import styles from '../styles/Home.module.css'

export default function Home() {
    const { user, loading } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user && !loading) {
            router.push('/rooms')
        }
    }, [user, loading])

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
