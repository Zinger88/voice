import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { useLogout } from '../../hooks/useLogout'
import { MainContext } from "../../contexts/MainContex";

export default function Profile() {
    const { user } = useContext(MainContext)
    const router = useRouter()
    const { logout } = useLogout()
    const onLogoutHandler = () => {
        logout()
        router.push('/')
    }
    return (
        <div className="main">
            <Header />
            <div className="container-1200">
                <div>Name: { user?.displayName }</div>
                <div onClick={() => router.back()}>Back</div>
                <div>PROFILE</div>
                <Button onClick={onLogoutHandler}>LogOut</Button>
            </div>
        </div>
    )
}
