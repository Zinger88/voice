import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../../firebase'

export const useGetUsers = () => {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState<any[]>([])

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(query(collection(db, 'users')), (querySnapshot) => {
            let users: any = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setValue(users)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const preparedData = value?.map((item) => {
        return {
            id: item.id,
            isOnline: item.isOnline,
            name: item.name,
            avatarUrl: item.avatarUrl,
        }
    })

    return { preparedData, loading }
}

export const useAddUserIfNotRegistered = async (user: any) => {
    const snaphot = await getDocs(collection(db, 'users'))
    const users = snaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    const isUserAlreadyRegisrted = users.some((u) => u.id === user.email)

    if (!isUserAlreadyRegisrted) {
        const newUser = {
            id: user.email,
            name: user.displayName || 'no Name',
            isOnline: true,
            avatarUrl: user.avatarUrl || user.photoURL || '',
        }
        await setDoc(doc(db, 'users', user.email), newUser)
    }
}

export const setUserOnline = async (userEmail: string) => {
    const userRef = doc(db, 'users', userEmail)
    await updateDoc(userRef, {
        isOnline: true,
    })
}

export const setUserOffline = async (userEmail: string) => {
    const userRef = doc(db, 'users', userEmail)
    console.log(userEmail, userRef)
    await updateDoc(userRef, {
        isOnline: false,
    })
}
