import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';

export default function EnterFullNameScreen(props) {
    const context = React.useContext(MainContext);
    console.log('last time I set user object in context from github answer. Detect extra render ? need to check',context)
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Enter your full name</h2>
            <input type="text" style={{marginBottom: '20px'}} />
            <Button
                onClick={() => {context.onNextStep()}}
            >
                <span>Next</span>
            </Button>
        </div>
    )
}