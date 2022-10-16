import { useRouter } from 'next/router'
import React from 'react'

import Axios from '../../../core/axios'
import { Button } from '../../Button'

export const EnterActivateCodeScreen = () => {
    const [codes, setCodes] = React.useState(['', '', '', ''])
    const isNextValueDisabled = codes.length < 4 || codes.some((value) => !value)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id: any = event.target.id
        const value = event.target.value
        setCodes((prev) => {
            let newArr = [...prev]
            newArr[id] = value
            return newArr
        })
        if (event.target.nextSibling && value) {
            ;(event.target.nextSibling as HTMLElement).focus()
        }
    }

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            const result = await Axios.get('/posts')
            console.log(result)
            router.push('/rooms')
        } catch (error) {
            alert('Ошибка при активации')
        }
        setIsLoading(false)
    }

    return (
        <div>
            {!isLoading ? (
                <>
                    <h2>Enter your activate code</h2>

                    <div>
                        <input
                            type="tel"
                            name=""
                            placeholder="X"
                            maxLength={1}
                            id="0"
                            onChange={handleInputChange}
                            value={codes[0]}
                        />
                        <input
                            type="tel"
                            name=""
                            placeholder="X"
                            maxLength={1}
                            id="1"
                            onChange={handleInputChange}
                            value={codes[1]}
                        />
                        <input
                            type="tel"
                            name=""
                            placeholder="X"
                            maxLength={1}
                            id="2"
                            onChange={handleInputChange}
                            value={codes[2]}
                        />
                        <input
                            type="tel"
                            name=""
                            placeholder="X"
                            maxLength={1}
                            id="3"
                            onChange={handleInputChange}
                            value={codes[3]}
                        />
                    </div>
                    <Button onClick={onSubmit} disabled={isNextValueDisabled}>
                        <span>Activate</span>
                    </Button>
                </>
            ) : (
                <div>
                    <h4>Activation progress...</h4>
                </div>
            )}
        </div>
    )
}
