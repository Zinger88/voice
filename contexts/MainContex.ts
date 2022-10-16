import React from 'react'

type MainContextProps = {
    step: number
    user: any
    onNextStep: any
    onSetUser: any
    onSetUserField: any
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps)
