import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { AsideBar } from '../components/AsideBar'
import { Button } from '../components/Button'
import { RoomCard } from '../components/RoomCard'
import { useAuthContext } from '../contexts'
import { RoomsService } from '../services/rooms'
import styles from '../styles/rooms.module.scss'

interface Rooms {
    rooms: Room[]
}

type Room = {
    id: number
    title: string
    users: any
    usersCount: number
}

const Rooms: React.FC<Rooms> = () => {
    const [rooms, setRooms] = useState<any[]>([])
    const { user, loading } = useAuthContext()
    useEffect(() => {
        let roomsListener
        if (user && !loading) {
            roomsListener = RoomsService.usersSubscribe(setRooms)
        }
        return roomsListener
    }, [user, loading])

    const mapRooms = () => {
        return rooms?.map((room: any) => {
            return (
                <div key={room.id}>
                    <Link href={'/rooms/' + room.id}>
                        <span>
                            <RoomCard
                                key={room.id}
                                title={room.roomName}
                                users={room.members} //  не хватает тут
                                usersCount={room.members.length}
                            />
                        </span>
                    </Link>
                </div>
            )
        })
    }

    const memoMapRooms = React.useMemo(() => mapRooms, [rooms, mapRooms])

    const onCreateRoomHandler = async () => {
        await RoomsService.createRoom({ roomName: 'New Room' })
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container + ' container-1200'}>
                    <div className={styles.content}>
                        <AsideBar />
                        <div className={styles.rooms}>
                            <div className={styles['rooms__bar']}>
                                <h1 className={styles.topbarTitle}>All convertations</h1>
                                <Button onClick={onCreateRoomHandler}>
                                    <span>Create room</span>
                                </Button>
                            </div>
                            <div className={styles['rooms__container']}>{rooms ? memoMapRooms() : 'Loading rooms'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rooms
