import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useCallback, useState } from 'react';

import { firebaseAuth } from "../../firebase";
import { Button } from '../Button';


export const SignUpScreen: React.FC = () => {
    const provider = new GithubAuthProvider()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const memoLogin = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await signInWithPopup(firebaseAuth, provider)
            if (!res) {
                throw new Error('Could not complete signup')
            }
            setIsLoading(false)
        } catch(err) {
            setError(err)
        }
    }, [])

    const onLoginHandler = async () => {
        await memoLogin()
    }
    return (
        <div className="welcome">
            <h2>Welcome to Voice!</h2>
            <p>
                {error ? (
                    'Something went wrong. Please, try again'
                ) : (
                    'Please, Log In with Github'
                )}

            </p>
            <Button onClick={onLoginHandler}>{isLoading ? 'Loading..' : 'Login with Github'}</Button>
            <br />
        </div>
    )
}
