import { signOut } from 'firebase/auth'
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore'

import { db, firebaseAuth } from '../firebase'
import { RoomsService } from './rooms'

class UserServiceInstance {
    user: any
    constructor() {
        this.user = null
    }

    setUser(user: any) {
        this.user = user
    }

    usersSubscribe(callbackSetUsers: any) {
        const userListener = onSnapshot(
            query(collection(db, 'users')),
            (querySnapshot) => {
                console.log('get user snaphot')
                let users: any = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                callbackSetUsers(users)
            },
            (error) => {
                console.log('error', error)
            }
        )

        return userListener
    }

    userLogout = async (userId: string) => {
        await this.setUserOffline(userId)
        await signOut(firebaseAuth)
        await RoomsService.leaveMemberFromRoom(userId)
    }

    addNotExistingUserToDB = async (user: any) => {
        const snaphot = await getDocs(collection(db, 'users'))
        const users = snaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        const isUserAlreadyRegisrted = users.some((u) => u.id === user)
        if (!isUserAlreadyRegisrted) {
            const newUser = {
                id: user,
                name: user.displayName || 'no Name',
                isOnline: true,
                avatarUrl: user.avatarUrl || user.photoURL || '',
            }
            await setDoc(doc(db, 'users', user.email), newUser)
        }
    }

    setUserOnline = async (userId: string) => {
        console.log('set Online')
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            isOnline: true,
        })
    }

    setUserOffline = async (userId: string) => {
        console.log('set offline')
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            isOnline: false,
        })
        await RoomsService.leaveMemberFromRoom(userId)
    }
}

export const UserService = new UserServiceInstance()
