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
        // TODO:  дописать защиты вагон и тележку
    }, [loading, user])

    return props.children // TODO: think about flicking
}
