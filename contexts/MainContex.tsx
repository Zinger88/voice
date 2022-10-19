import React from 'react'

import { useFirebaseAuth } from '../firebase'

interface IMainContextProps {
    user: any
    loading: boolean
}

export const MainContext = React.createContext<IMainContextProps>({
    user: {},
    loading: true,
})

export const MainContextProvider = (props: any) => {
    const { authUser, loading } = useFirebaseAuth()

    return <MainContext.Provider value={{ user: authUser, loading }}>{props.children}</MainContext.Provider>
}
