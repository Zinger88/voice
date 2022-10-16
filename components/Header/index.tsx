import styles from './Header.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export const Header = (props: any) => {
    const router = useRouter()
    const onHandleClick = () => {
        router.push('/profile/1')
    }
    return (
        <div className="container-1200">
            <div className={styles.main}>
                <div className={styles.logo}>Voice</div>
                <div className={styles.user} onClick={onHandleClick}>
                    <div className={styles.name}>User Name</div>
                    <div className={styles.avatar}>
                        <Image
                            src="/static/user.png"
                            alt="user logo"
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
