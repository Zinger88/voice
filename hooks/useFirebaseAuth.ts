import { useEffect, useState } from 'react'

import {useAddUserIfNotRegistered} from '../api/users'
import { firebaseAuth } from '../firebase'

export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)
    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        await useAddUserIfNotRegistered(authState)
        setAuthUser(authState)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChanged)
        return () => {
            unsubscribe()
        }
    }, [])
    return {
        authUser,
        loading,
    }
}
