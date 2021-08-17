import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';

export default function EnterFullNameScreen(props) {
    const { onNextStep } = React.useContext(MainContext);

    return (
        <div style={{textAlign: 'center'}}>
            <h2>Enter your full name</h2>
            <input type="text" style={{marginBottom: '20px'}} />
            <Button
                onClick={onNextStep}
            >
                <span>Next</span>
            </Button>
        </div>
    )
}