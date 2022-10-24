import React, { FC } from 'react'
import styles from './LoadingLayout.module.scss'

interface ILoadingLayout {
    children: React.ReactElement
}

export const LoadingLayout: FC<ILoadingLayout> = (props) => {
    return (
        <div className={`${styles['layout']}`}>
            { props.children }
        </div>
    )
}
