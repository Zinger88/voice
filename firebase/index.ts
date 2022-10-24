import { getAuth } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { collection as fireBaseCollection, getFirestore } from 'firebase/firestore'

//import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: 'AIzaSyDXBBiLBO2S7LELNw9PBVGAQYikW572VbM',
    authDomain: 'voice-1fd70.firebaseapp.com',
    projectId: 'voice-1fd70',
    storageBucket: 'voice-1fd70.appspot.com',
    messagingSenderId: '589219586986',
    appId: '1:589219586986:web:3117554da52ec2d7ccc1d3',
    measurementId: 'G-K4MSWV8QET',
}

// Initialize Firebase
export const firebaseInstance = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseInstance)
export const collection = fireBaseCollection
//export const firebaseAnalytics = getAnalytics(firebaseInstance)
export const firebaseAuth = getAuth(firebaseInstance)
