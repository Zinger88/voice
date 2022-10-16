import React from 'react'

import { MainContext } from '../../../pages'
import { Button } from '../../Button'

export default function EnterFullNameScreen(props) {
    const context = React.useContext(MainContext)
    const name = context.user?.fullname
    const [inputValue, setInputValue] = React.useState(name)
    const onInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const onNextStepHandler = () => {
        context.onSetUserField('fullname', inputValue)
        context.onNextStep()
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Enter your full name, {context.user?.fullname}</h2>
            <input
                type="text"
                onChange={onInputChange}
                style={{ marginBottom: '20px' }}
                placeholder={inputValue}
            />
            <Button onClick={onNextStepHandler}>
                <span>Next</span>
            </Button>
        </div>
    )
}
