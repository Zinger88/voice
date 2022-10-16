import React from 'react'

import { Header } from '../components/Header'
import { ChooseAvatarScreen } from '../components/steps/ChooseAvatarScreen'
import { EnterActivateCodeScreen } from '../components/steps/EnterActivateCodeScreen'
import EnterFullNameScreen from '../components/steps/EnterFullNameScreen'
import { EnterWithAuth } from '../components/steps/EnterWithAuth'
import { SetPhoneNumberScreen } from '../components/steps/SetPhoneNumberScreen'
import { WelcomeScreen } from '../components/steps/WelcomeScreen'
import styles from '../styles/Home.module.css'

const stepsComponents = {
    0: WelcomeScreen,
    1: EnterWithAuth,
    2: EnterFullNameScreen,
    3: ChooseAvatarScreen,
    4: SetPhoneNumberScreen,
    5: EnterActivateCodeScreen,
}

type User = {
    id: string
    fullname: string
    avatarUrl: string
    isActive: number
    phone: string
    userName: string
    createdAt: string
    updatedAt: string
}

type MainContextProps = {
    step: number
    user: any
    onNextStep: any
    onSetUser: any
    onSetUserField: any
}

export const MainContext = React.createContext<MainContextProps>(
    {} as MainContextProps
)

export default function Home() {
    const [step, setStep] = React.useState<number>(0)
    const [user, setUser] = React.useState<any>({})
    const Step = stepsComponents[5]
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
        setStep((prev) => prev + 1)
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <MainContext.Provider
                    value={{
                        step,
                        user,
                        onNextStep,
                        onSetUser,
                        onSetUserField,
                    }}>
                    <Step />
                </MainContext.Provider>
            </main>
        </div>
    )
}
