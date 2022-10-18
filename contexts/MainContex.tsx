import React, { useState } from 'react'
import useFirebaseAuth from "../firebase";

interface IMainContextProps {
    step: number
    setStep: (val: number) => void
    user: any
    loading: boolean
}

export const MainContext = React.createContext<IMainContextProps>({
    step: 0,
    setStep: () => {},
    user: {},
    loading: true
})

export const MainContextProvider = (props: any) => {
    const [step, setStep] = useState<number>(0)
    const { authUser, loading } = useFirebaseAuth()

    return (
        <MainContext.Provider
            value={{
                step,
                setStep,
                user: authUser,
                loading
            }}
        >
            {props.children}
        </MainContext.Provider>
    )
}
