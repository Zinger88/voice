import React from 'react';

import { MainContext } from '../../../contexts/MainContex';
import { useLogin } from '../../../hooks/useLogin';
import { Button } from '../../Button';


export const SignUpScreen: React.FC = (props) => {
    const { onNextStep, onSetUser } = React.useContext(MainContext)
    const { login, isPending } = useLogin()

    const onLoginHandler = async () => {
        const user = await login()
        if (user) {
            onSetUser(user)
            onNextStep()
        }
    }
    return (
        <div className="welcome">
            <h2>Welcome to Voice!</h2>
            <p>Please, Log In with Github</p>
            <Button onClick={ onLoginHandler }>
                { isPending ? 'Loading..' : 'Login with Github' }
            </Button>
            <br/>
        </div>
    )
}
