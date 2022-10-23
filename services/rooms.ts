import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'

import { db } from '../firebase'

class RoomsServiceInstance {
    rooms: any[]
    constructor() {
        this.rooms = []
    }

    getRoom = async (id: string) => {
        const docRef = doc(db, 'rooms', id)
        const docSnap = await getDoc(docRef)
        let room
        if (docSnap.exists()) {
            const { roomName, members } = docSnap.data()
            room = {
                id,
                roomName,
                members,
            }
        }

        return room
    }

    usersSubscribe(callbackSetRooms: any) {
        console.log('rooms?')
        const roomsListener = onSnapshot(
            query(collection(db, 'rooms')),
            (querySnapshot) => {
                console.log('rooms get ---- ')
                let rooms: any = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                this.rooms = rooms
                callbackSetRooms(rooms)
            },
            (error) => {
                console.log('error', error)
            }
        )
        return roomsListener
    }

    createRoom = async (params: any) => {
        // const { roomName } = params
        // const id = uuidv4()
        // const newUser = {
        //     roomName,
        //     members: [],
        // }
        // await setDoc(doc(db, 'rooms', id), newUser)
    }
}

export const RoomsService = new RoomsServiceInstance()
