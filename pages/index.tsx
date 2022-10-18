import { useRouter } from 'next/router'
import React from 'react'

import {
    ChooseAvatarScreen,
    EnterActivateCodeScreen,
    EnterFullNameScreen,
    EnterWithAuth,
    SetPhoneNumberScreen,
    SignUpScreen,
} from '../components/steps'
import { useMainContext } from '../contexts'
import styles from '../styles/Home.module.css'

interface StepsComponents {
    [key: number]: React.FC
}

const stepsComponents: StepsComponents = {
    0: SignUpScreen,
    1: EnterWithAuth,
    2: EnterFullNameScreen,
    3: ChooseAvatarScreen,
    4: SetPhoneNumberScreen,
    5: EnterActivateCodeScreen,
}

export default function Home() {
    const { user, step, loading } = useMainContext()
    const router = useRouter()
    const Step = stepsComponents[step]

    if (user) {
        router.push('/rooms')
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <h2 className={styles.check}>Check your Auth</h2>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {!user && (
                <main className={styles.main}>
                    <Step />
                </main>
            )}
        </div>
    )
}
