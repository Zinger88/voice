import Link from 'next/link'
import React, { useEffect } from 'react'

import { RoomsAPI } from '../api/rooms'
import {setUserOffline, setUserOnline} from '../api/users'
import { AsideBar } from '../components/AsideBar'
import { Button } from '../components/Button'
import { RoomCard } from '../components/RoomCard'
import { useAuthContext } from '../contexts'
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
    const { preparedData: rooms, loading: roomsLoading } = RoomsAPI.getRooms()
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
        await RoomsAPI.createRoom({ roomName: 'New Room' })
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
                            <div className={styles['rooms__container']}>
                                {!roomsLoading ? memoMapRooms() : 'Loading rooms'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rooms
