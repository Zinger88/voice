import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';

export const EnterWithAuth: React.FC = () => {
    const context = React.useContext(MainContext);
    let timer = null;
    const onClickAuth = () => {
        const win = window.open(
            "http://localhost:3001/auth/github", 
            "Auth", 
            "height=200,width=400,status=yes,toolbar=no,menubar=no,location=no"
        );
    }

    React.useEffect(()=> {
        window.addEventListener('message', (mes) => {
            if(typeof mes.data === 'string' && mes.data.indexOf('fullname') > -1) {
                context.onSetUser(JSON.parse(mes.data));
                context.onNextStep();
            }
        });
    },[]);

    return (
        <div>
            <h2>Do you want import info from GitHub?</h2>
            <div>
                <Button
                    onClick={onClickAuth}
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