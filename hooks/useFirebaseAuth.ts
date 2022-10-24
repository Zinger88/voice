import { useEffect, useState } from 'react';



import { firebaseAuth } from '../firebase';
import { UserService } from '../services/users';


export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return
        }
        UserService.setUser(authState)
        await UserService.addNotExistingUserToDB(authState.email)

        setAuthUser(authState)
        setLoading(false)
    }

    useEffect(() => {
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
