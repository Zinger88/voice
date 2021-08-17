import React from 'react';
import styles from './Header.module.css';
import { useRouter } from 'next/router';

export const Header = (props) => {
    const router = useRouter();
    const onHandleClick = () => {
        router.push('/profile/1');
    }
    return (
        <div className="container-1200">
            <div className={styles.main}>
                <div className={styles.logo}>
                    Voice
                </div>
                <div 
                    className={styles.user}
                    onClick={onHandleClick}
                >
                    <div className={styles.name}>User Name</div>
                    <div className={styles.avatar}>
                        <img src="" alt="user logo"/>
                    </div>
                </div>
            </div>
        </div>
    );
}