import React from 'react'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { RoomCard } from '../components/RoomCard'
import Link from 'next/link'
import styles from '../styles/rooms.module.scss'
import Head from 'next/head'
import axios from 'axios'

interface Rooms {
    rooms: Room[]
}

type Room = {
    id: number
    title: string
    users: any
    usersCount: number
}

const Rooms: React.FC<Rooms> = ({ rooms = [] }) => {
    return (
        <>
            <Head>
                <title>Rooms</title>
            </Head>
            <div className={styles.main}>
                <Header />
                <div className={styles.container + ' container-1200'}>
                    <div className={styles.topbar}>
                        <h1 className={styles.topbarTitle}>
                            All convertations
                        </h1>
                        <Button>
                            <span>Create room</span>
                        </Button>
                    </div>

                    <div className={styles.wrapper}>
                        {rooms.map((room) => {
                            return (
                                <Link key={room.id} href={'/rooms/' + room.id}>
                                    <a>
                                        <RoomCard
                                            key={room.id}
                                            title={room.title}
                                            users={room.users}
                                            usersCount={room.usersCount}
                                        />
                                    </a>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const { data } = await axios({
        method: 'get',
        url: '/rooms.json',
        baseURL: 'http://localhost:3000/',
    })
    return {
        props: {
            rooms: data,
        }, // will be passed to the page component as props
    }
}

export default Rooms
