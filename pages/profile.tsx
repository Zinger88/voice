import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Button } from '../components/Button'
import { MainContext } from '../contexts/MainContex'
import { useLogout } from '../hooks/useLogout'

export default function Profile() {
    const { user } = useContext(MainContext)
    const router = useRouter()
    const { logout } = useLogout()

    const onLogoutHandler = async () => {
        await logout()
        router.push('/')
    }

    return (
        <div className="main">
            <div className="container-1200">
                <div>Name: {user?.displayName}</div>
                <div>Email: {user?.email}</div>
                <div>Avatar</div>
                <div>
                    <img src={user?.photoURL} alt="avatar" />
                </div>
                <Button onClick={() => router.back()}>Back</Button>-<Button onClick={onLogoutHandler}>LogOut</Button>
            </div>
        </div>
    )
}
