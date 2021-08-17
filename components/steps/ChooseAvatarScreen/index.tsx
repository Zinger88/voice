import React from 'react';
import { MainContext } from '../../../pages';
import { Button } from '../../Button';
export const ChooseAvatarScreen: React.FC = () => {
    const { onNextStep } = React.useContext(MainContext);

    const chooseAvatarInput = React.useRef<HTMLInputElement>(null);
    
    const handleChangeInput = (event: Event): void => {
        const file = (event.target as HTMLInputElement).files[0];
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl);
    }

    React.useEffect(()=>{
        if(chooseAvatarInput?.current) {
            chooseAvatarInput?.current.addEventListener('change', handleChangeInput);
        }
    },[]);

    return (
        <div>
            <h2>Welcome, Serg</h2>
            <h3>Please, choose your avatar</h3>
            <img src="" alt="Avatar"/>
            <input ref={chooseAvatarInput} type="file" placeholder="choose avatar"/>
            <Button
                onClick={onNextStep}
            >
                <span>Next</span>
            </Button>
        </div>
    )
}