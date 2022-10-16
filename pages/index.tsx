import React from 'react'

import { Introduction } from '../components/Introduction'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Introduction />
            </main>
        </div>
    )
}
