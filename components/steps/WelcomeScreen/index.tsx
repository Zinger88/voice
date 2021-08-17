import React from 'react';
import { Button } from '../../Button';
import { MainContext } from '../../../pages';

export const WelcomeScreen: React.FC = (props) => {
    const { onNextStep } = React.useContext(MainContext);

    return (
        <div className="welcome">
            <h2>Welcome to Simple Voice!</h2>
            <Button
                onClick={onNextStep}
            >
                <span>Get your name</span>
            </Button>
        </div>
    )
}