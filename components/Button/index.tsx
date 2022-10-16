import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import React from 'react'

import styles from './Button.module.css'

interface ButtonProps {
    disabled?: boolean | undefined
    color?: string
    onClick?: (event: any) => void
}

export const Button: React.FC<ButtonProps> = ({
    children,
    disabled = false,
    color,
    onClick,
}) => {
    const onHandleClick = (e: any) => {
        if (onClick) {
            onClick(e)
        } else {
            console.log('Click ')
        }
    }
    return (
        <button
            onClick={onHandleClick}
            className={styles.btn}
            disabled={disabled}>
            {children}
        </button>
    )
}
