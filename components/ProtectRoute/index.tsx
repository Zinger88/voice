import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useAuthContext } from '../../contexts'

export const ProtectRoute = (props: any) => {
    const { user, loading } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (!user && !loading) {
            router.push('./')
        }
    }, [loading, user])

    return props.children // TODO: think about flicking
}
