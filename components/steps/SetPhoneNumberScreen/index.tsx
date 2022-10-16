import React from 'react'
import NumberFormat from 'react-number-format'

import { MainContext } from '../../../pages'
import { Button } from '../../Button'

type InputValueState = {
    formatedValue: string
    value: string
}

export const SetPhoneNumberScreen: React.FC = () => {
    const [inputValue, setInputValue] = React.useState<InputValueState>(
        {} as InputValueState
    )
    const isNextValueDisabled = inputValue.value && inputValue.value.length < 12
    const { onNextStep } = React.useContext(MainContext)
    console.log(inputValue)
    return (
        <div>
            <h2>Enter your phone number</h2>
            <NumberFormat
                format="+### (##) ###-##-##"
                mask="_"
                placeholder="+375 (25) 333-33-33"
                value={inputValue.value}
                //onValueChange={(values) => setInputValue(values)}
            />
            <Button onClick={onNextStep}>
                <span>Next</span>
            </Button>
        </div>
    )
}
