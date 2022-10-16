import React from 'react'
import { useRouter } from 'next/router'
import { Header } from '../../components/Header'

export default function Profile() {
    const router = useRouter()

    return (
        <div className="main">
            <Header />
            <div className="container-1200">
                <div onClick={() => router.back()}>Back</div>
                <div>PROFILE</div>
            </div>
        </div>
    )
}
