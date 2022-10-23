import { signOut } from 'firebase/auth'
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore'

import { db, firebaseAuth } from '../firebase'

class UserServiceInstance {
    usersSubscribe(callbackSetUsers: any) {
        const userListener = onSnapshot(query(collection(db, 'users')), (querySnapshot) => {
            console.log('get user snaphot')
            let users: any = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            callbackSetUsers(users)
        }, (error) => {
                console.log('error', error)
            }
        )

        return userListener
    }

    userLogout = async () => {
        await signOut(firebaseAuth)
    }

    addNotExistingUserToDB = async (user: any) => {
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

    setUserOnline = async (userEmail: string) => {
        console.log('set Online')
        const userRef = doc(db, 'users', userEmail)
        await updateDoc(userRef, {
            isOnline: true,
        })
    }

    setUserOffline = async (userEmail: string) => {
        console.log('set offline')
        const userRef = doc(db, 'users', userEmail)
        await updateDoc(userRef, {
            isOnline: false,
        })
    }
}

export const UserService = new UserServiceInstance()
