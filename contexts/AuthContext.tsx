import React, {useEffect} from 'react'

import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import {LoadingLayout} from "../components/LoadingLayout";
import {setUserOffline, setUserOnline} from "../api/users";


interface IAuthContextProps {
    user: any
}

export const AuthContext = React.createContext<IAuthContextProps>({
    user: {},
})

export const AuthContextProvider = (props: any) => {
    const { authUser, loading } = useFirebaseAuth()

    const turnOffOnline = async () => {
        console.log('offline', authUser?.email) // бывает когда нет юзера?
        if(authUser) {
            await setUserOffline(authUser.email)
        }
    }

    const turnOnOnline = async () => {
        console.log('online', authUser?.email) // бывает когда нет юзера?
        if(authUser) {
            await setUserOnline(authUser.email)
        }
    }

    useEffect(() => {
        void turnOnOnline()
        return () => {
            void turnOffOnline() // TODO: не работает когда закрываешь вкладку
        }
    }, [authUser])

    return (
        <AuthContext.Provider value={{ user: authUser }}>
            {props.children}
            <LoadingLayout isShow={loading}>
                <span>Checking your auth...</span>
            </LoadingLayout>

        </AuthContext.Provider>
    )
}
