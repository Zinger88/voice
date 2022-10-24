import { uuidv4 } from '@firebase/util'
import { collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase'

class RoomsServiceInstance {
    rooms: any[]
    currentRoomId: string
    user: any
    constructor() {
        this.rooms = []
        this.currentRoomId = ''
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

    setMemberToRoom = async (roomId: string, userId: string) => {
        this.currentRoomId = roomId
        console.log('set member service', this.currentRoomId)
        const roomRef = await doc(db, 'rooms', roomId)
        const docSnap = await getDoc(roomRef)
        if (!docSnap.exists()) return

        const roomData = docSnap.data()
        const filteredMembers = roomData?.members.filter((memberId: string) => memberId !== userId)
        filteredMembers.push(userId)
        await updateDoc(roomRef, {
            members: filteredMembers,
        })
    }

    leaveMemberFromRoom = async (userId: string) => {
        if (this.currentRoomId === '') return
        const roomRef = await doc(db, 'rooms', this.currentRoomId)
        const docSnap = await getDoc(roomRef)
        const roomData = docSnap.data()
        const filteredMembers = roomData?.members.filter((memberId: string) => memberId !== userId)
        console.log('leave', roomData, filteredMembers, userId)
        await updateDoc(roomRef, {
            members: filteredMembers,
        })
    }

    roomsSubscribe(callbackSetRooms: any) {
        const q = query(collection(db, 'rooms'))
        const roomsListener = onSnapshot(
            q,
            (querySnapshot) => {
                let rooms: any = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                console.log('rooms get ---- service', rooms)
                this.rooms = rooms
                callbackSetRooms(rooms)
            },
            (error) => {
                console.log('error', error)
            }
        )
        return roomsListener
    }

    oneRoomSubscribe(roomId: string, callbackSetOneRoom: any) {
        const roomsListener = onSnapshot(
            doc(db, 'rooms', roomId),
            (querySnapshot) => {
                if (!querySnapshot.exists()) return
                console.log(' one room get ---- ')
                const data: any = querySnapshot.data()
                let currentRoom: any = {
                    id: roomId,
                    members: data.members,
                    roomName: data.roomName,
                }
                callbackSetOneRoom(currentRoom)
            },
            (error) => {
                console.log('error', error)
            }
        )
        return roomsListener
    }

    createRoom = async (params: any) => {
        const { roomName } = params
        const id = uuidv4()
        const newUser = {
            id,
            roomName,
            members: [],
        }
        await setDoc(doc(db, 'rooms', id), newUser)
    }
}

export const RoomsService = new RoomsServiceInstance()
