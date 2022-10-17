import React, { FC } from 'react'

import { MainContext } from '../../../contexts/MainContex'
import { Button } from '../../Button'

export const EnterFullNameScreen: FC = () => {
    const { user, onSetUserField, onNextStep } = React.useContext(MainContext)
    const initialName = user?.displayName
    const [name, setInputValue] = React.useState(initialName)

    const onInputChange = (e: any) => {
        setInputValue(e.target.value)
    }

    const onNextStepHandler = () => {
        onSetUserField('displayName', name)
        onNextStep()
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Hi, { initialName } !</h2>
            <h3>Set your nickname or click `next`</h3>
            <h5>You can enter your name in Voice. Also you can do this later from your cabinet</h5>
            <p>
                <input
                    type="text"
                    onChange={ onInputChange }
                    style={{ marginBottom: '20px' }}
                    placeholder={ initialName }
                    value={ name }
                    required
                />
            </p>
            <Button onClick={onNextStepHandler}>
                <span>Next</span>
            </Button>
        </div>
    )
}
