import React, { useEffect } from 'react'

import { LoadingLayout } from '../components/LoadingLayout'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import { UserService } from '../services/users'

interface IAuthContextProps {
    user: any
    loading: boolean
}

export const AuthContext = React.createContext<IAuthContextProps>({
    user: {},
    loading: false,
})

export const AuthContextProvider = (props: any) => {
    const { authUser, loading } = useFirebaseAuth()

    const turnOffOnline = (e: any) => {
        e.preventDefault()
        if (authUser && authUser.isOnline) {
            void UserService.setUserOffline(authUser.email)
        }
    }

    const turnOnOnline = async () => {
        if (authUser && !authUser.isOnline) {
            console.log('set online')
            await UserService.setUserOnline(authUser.email)
        }
    }

    useEffect(() => {
        void turnOnOnline()
        window.addEventListener('beforeunload', turnOffOnline, { capture: true })
        return () => {
            window.removeEventListener('beforeunload', turnOffOnline)
        }
    }, [authUser])

    return (
        <AuthContext.Provider value={{ user: authUser, loading }}>
            {props.children}
            {/*<LoadingLayout isShow={loading}>*/}
            {/*    <span>Checking your auth...</span>*/}
            {/*</LoadingLayout>*/}
        </AuthContext.Provider>
    )
}
