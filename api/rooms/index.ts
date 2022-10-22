import {collection, doc, setDoc} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase'
import {useEffect} from "react";


export class RoomsAPI {
    static getRooms() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, loading, error] = useCollection(collection(db, 'rooms'), {
            snapshotListenOptions: { includeMetadataChanges: true },
        })

        const preparedData = value?.docs.map((item) => {
            const id = item.id
            const data = item.data()
            return { id, ...data }
        })

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            console.log('effect')
            return () => {
                console.log('unsub rooms')
            }
        }, [])

        return { preparedData, loading, error }
    }

    static async createRoom(params: any) {
        const { roomName } = params
        const id = uuidv4()
        const newUser = {
            roomName,
            members: []
        }
        await setDoc(doc(db, 'rooms', id), newUser)
    }
}
