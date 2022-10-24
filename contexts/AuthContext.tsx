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
        if (authUser) {
            void UserService.setUserOffline(authUser.email)
        }
        e.returnValue = 'Are you sure you want to exit?'
    }

    const turnOnOnline = async () => {
        if (authUser) {
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
            {!loading && props.children}
            {loading && (
                <LoadingLayout>
                    <span>Loading</span>
                </LoadingLayout>
            )}
        </AuthContext.Provider>
    )
}
