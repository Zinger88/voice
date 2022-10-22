import React, {FC, useMemo} from 'react'

import { useGetUsers } from '../../api/users'
import styles from './Aside.module.scss'

export const AsideBar: FC = () => {
    const { preparedData: users, loading } = useGetUsers()

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
                {!loading && users ? memoizedUsersElements : <span>Loading users...</span>}
            </div>
        </div>
    )
}
