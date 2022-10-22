import React, {FC, useEffect, useState} from 'react'
import styles from './LoadingLayout.module.scss'

interface ILoadingLayout {
    isShow: boolean,
    children: React.ReactElement
}

const SHOW_CHECKING_SCREEN_TIME = 1000

export const LoadingLayout: FC<ILoadingLayout> = (props) => {
    const [display, setDisplay] = useState(props.isShow)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplay(false)
        }, SHOW_CHECKING_SCREEN_TIME)
        return (
            clearTimeout(timer)
        )
    }, [props.isShow])

    if (!display) return null

    return (
        <div className={`${styles['layout']} ${props.isShow ? styles.active : ''}`}>
            { props.children }
        </div>
    )
}
