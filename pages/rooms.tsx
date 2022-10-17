import Head from 'next/head'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { RoomCard } from '../components/RoomCard'
import Axios from '../core/axios'
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
    const [rooms, setRooms] = useState([{id: '', title: '', users: [], usersCount: 0}])

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await Axios({
                method: 'get',
                url: '/rooms.json',
            })
            setRooms(data)
        }
        getRooms()
    },[])

    const mapRooms = () => {
        return rooms.map((room) => {
            return (
                <Link key={room.id} href={'/rooms/' + room.id}>
                    <a>
                        <RoomCard key={room.id} title={room.title} users={room.users} usersCount={room.usersCount} />
                    </a>
                </Link>
            )
        })
    }

    const memoMapRooms = React.useMemo(() => mapRooms, [rooms, mapRooms])

    return (
        <>
            <Head>
                <title>Rooms</title>
            </Head>
            <div className={styles.main}>
                <Header />
                <div className={styles.container + ' container-1200'}>
                    <div className={styles.topbar}>
                        <h1 className={styles.topbarTitle}>All convertations</h1>
                        <Button>
                            <span>Create room</span>
                        </Button>
                    </div>

                    <div className={styles.wrapper}>{memoMapRooms()}</div>
                </div>
            </div>
        </>
    )
}

// export async function getStaticProps() {
//     const { data } = await Axios({
//         method: 'get',
//         url: '/rooms.json',
//     })
//     return {
//         props: {
//             rooms: data || [],
//             fallback: false,
//         }, // will be passed to the page component as props
//     }
// }

export default Rooms
