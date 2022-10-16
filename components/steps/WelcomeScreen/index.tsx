import { MainContext } from '../../../pages'
import { Button } from '../../Button'
import React from 'react'

export const WelcomeScreen: React.FC = (props) => {
    const { onNextStep } = React.useContext(MainContext)

    return (
        <div className="welcome">
            <h2>Welcome to Voice!</h2>
            <Button onClick={onNextStep}>
                <span>Let's start!</span>
            </Button>
        </div>
    )
}
