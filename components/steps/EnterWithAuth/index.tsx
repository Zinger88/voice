import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';

export const EnterWithAuth: React.FC = () => {
    return (
        <div>
            <h2>Do you want import info from GitHub?</h2>
            <div>
                <Button
                    onClick={()=>{console.log('go')}}
                >
                    <span>Import from Github</span>
                </Button>
            </div>
            
            <div>
                <a href="">Enter my info manually</a>
            </div>
            
        </div>
    )
}