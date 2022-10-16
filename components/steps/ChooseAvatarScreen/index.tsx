import React from 'react'
import { MainContext } from '../../../pages'
import { Button } from '../../Button'
export const ChooseAvatarScreen: React.FC = () => {
    const context = React.useContext(MainContext)

    const chooseAvatarInput = React.useRef<HTMLInputElement>(null)

    const handleChangeInput = (event: Event): void => {
        const file = (event.target as HTMLInputElement).files[0]
        const imageUrl = URL.createObjectURL(file)
        console.log(imageUrl)
    }

    React.useEffect(() => {
        if (chooseAvatarInput?.current) {
            chooseAvatarInput?.current.addEventListener(
                'change',
                handleChangeInput
            )
        }
    }, [])

    return (
        <div className="choose-avatar">
            <h2>Welcome, {context.user?.fullname}</h2>
            <h3>
                Please, choose your avatar if you don't like current:) (avatar
                change is not working)
            </h3>
            <img
                className="choose-avatar-img"
                src={context.user?.avatarUrl}
                alt="Avatar"
            />
            <input
                ref={chooseAvatarInput}
                type="file"
                placeholder="choose avatar"
            />
            <Button onClick={context.onNextStep}>
                <span>Next</span>
            </Button>
        </div>
    )
}
