import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'

import { firebaseAuth } from '../firebase'

export const useLogin = () => {
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const provider = new GithubAuthProvider()

    const login = async () => {
        setIsPending(true)
        try {
            const res = await signInWithPopup(firebaseAuth, provider)
            if (!res) {
                throw new Error('Could not complete signup')
            }
            const user = res.user
            setIsPending(false)

            return user
        } catch (error) {
            console.log(error)
            setError(error.message)
            setIsPending(false)
        }
    }
    console.log('use login return')
    return { login, error, isPending }
}
