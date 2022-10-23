import React, { FC, useEffect, useMemo, useState } from 'react'

import { UserService } from '../../services/users'
import styles from './Aside.module.scss'
import {useAuthContext} from "../../contexts";

export const AsideBar: FC = () => {
    const [users, setUsers] = useState<any[]>([])
    const { user, loading } = useAuthContext()
    useEffect(() => {
        let usersListener: any
        if(user && !loading) {
            usersListener = UserService.usersSubscribe(setUsers)
        }

        return () => {
            usersListener && usersListener()
        }
    }, [user, loading])

    const memoizedUsersElements = useMemo(() => {
        return users?.map((user) => {
            return (
                <div key={user.id} className={styles['user']}>
                    {user.isOnline && <div className={styles['online']}></div>}
                    <img src={user.avatarUrl || '/static/user.png'} alt="" />
                    <div className={styles['info']}>
                        <div className={styles['name']}>{user.name}</div>
                        <div className={styles['email']}>{user.id}</div>
                    </div>
                </div>
            )
        })
    }, [users])

    return (
        <div className={styles.aside}>
            <h3>All users</h3>
            <div className={styles['aside__all-users']}>
                {users ? memoizedUsersElements : <span>Loading users...</span>}
            </div>
        </div>
    )
}
