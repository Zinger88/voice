import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import { firebaseAuth } from "../firebase";
import {
    ChooseAvatarScreen,
    EnterActivateCodeScreen,
    EnterFullNameScreen,
    EnterWithAuth,
    SetPhoneNumberScreen,
    SignUpScreen
} from "../components/steps";
import { MainContext } from '../contexts/MainContex'

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
    const router = useRouter()
    const [isCheckingAuth, setCheckingAuth] = useState(true)
    const [step, setStep] = React.useState<number>(0)
    const [user, setUser] = React.useState<any>({})
    const [auth, setAuth] = React.useState<any>(null)

    const Step = stepsComponents[step]
    const onSetUser = (user: any) => {
        setUser(user)
    }

    const onSetUserField = (field: string, value: string) => {
        setUser((prev: any) => ({
            ...prev,
            [field]: value,
        }))
    }

    const onNextStep = () => {
        setStep((prev) => {
            if (prev === 0) return prev + 2
            return prev + 1
        })
    }
    useEffect(() => {
        setCheckingAuth(true)
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                router.push('/rooms')
            }
            setUser(null)
            setCheckingAuth(false)
        })

        return unsubscribe;
    }, [router]);

    if (isCheckingAuth) {
        return (
            <div className={styles.container}>
                <h2 className={styles.check} >Check your Auth</h2>
            </div>

        )
    }

    return (
        <MainContext.Provider // TODO: move context to _app
            value={{
                auth,
                step,
                user,
                onNextStep,
                onSetUser,
                onSetUserField,
            }}
        >
            <div className={styles.container}>
                {!user && (
                    <main className={styles.main}>
                        <Step />
                    </main>
                )}
            </div>
        </MainContext.Provider>
    )
}
