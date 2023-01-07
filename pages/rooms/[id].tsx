// @ts-ignore
import React from 'react'
import dynamic from 'next/dynamic'

const RoomWithNoSSR = dynamic(
    () => import('../../components/NoSsrRoom/NoSsrRoom'),
    { ssr: false }
)

const Room = () => {
    return (
        <>
            <RoomWithNoSSR />
        </>
    )
}

export default Room
