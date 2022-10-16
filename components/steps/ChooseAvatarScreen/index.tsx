import React from 'react'

import { MainContext } from '../../../contexts/MainContex'
import { Button } from '../../Button'

export const ChooseAvatarScreen: React.FC = () => {
    const context = React.useContext(MainContext)

    const chooseAvatarInput = React.useRef<HTMLInputElement>(null)

    const handleChangeInput = (event: any): void => {
        if (event.target) {
            const file = event.target.files[0]
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                console.log(imageUrl)
            }
        }
    }

    React.useEffect(() => {
        if (chooseAvatarInput?.current) {
            chooseAvatarInput?.current.addEventListener('change', handleChangeInput)
        }
    }, [])

    return (
        <div className="choose-avatar">
            <h2>Welcome, {context.user?.fullname}</h2>
            <h3>Please, choose your avatar if you dont like current</h3>
            {/* <img
                className="choose-avatar-img"
                src={context.user?.avatarUrl}
                alt="Avatar"
            /> */}
            <input ref={chooseAvatarInput} type="file" placeholder="choose avatar" />
            <Button onClick={context.onNextStep}>
                <span>Next</span>
            </Button>
        </div>
    )
}
