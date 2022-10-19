import { useRouter } from 'next/router'
import React from 'react'

import { useLogin } from '../../hooks/useLogin'
import { Button } from '../Button'

export const SignUpScreen: React.FC = () => {
    const { login, isPending } = useLogin()
    const router = useRouter()

    const onLoginHandler = async () => {
        // perform bug
        await login()
        await router.push('/rooms')
    }

    return (
        <div className="welcome">
            <h2>Welcome to Voice!</h2>
            <p>Please, Log In with Github</p>
            <Button onClick={onLoginHandler}>{isPending ? 'Loading..' : 'Login with Github'}</Button>
            <br />
        </div>
    )
}
