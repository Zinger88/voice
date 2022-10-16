import React from 'react'

import { MainContext } from '../../contexts/MainContex'
import {
    ChooseAvatarScreen,
    EnterActivateCodeScreen,
    EnterFullNameScreen,
    EnterWithAuth,
    SetPhoneNumberScreen,
    WelcomeScreen,
} from '../steps'

interface StepsComponents {
    [key: number]: React.FC
}

const stepsComponents: StepsComponents = {
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

export const Introduction = () => {
    const [step, setStep] = React.useState<number>(0)
    const [user, setUser] = React.useState<any>({})

    const Step = stepsComponents[step]

    const onSetUser = (user: User) => {
        setUser(user)
    }

    const onSetUserField = (field: string, value: string) => {
        setUser((prev: User) => ({
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

    return (
        <MainContext.Provider
            value={{
                step,
                user,
                onNextStep,
                onSetUser,
                onSetUserField,
            }}
        >
            <Step />
        </MainContext.Provider>
    )
}
