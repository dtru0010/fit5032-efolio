// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDnF4V4p9QOHfXwqM6KZnZROGzFQbUNko8',
  authDomain: 'fit5032-week9-3fe8e.firebaseapp.com',
  projectId: 'fit5032-week9-3fe8e',
  storageBucket: 'fit5032-week9-3fe8e.firebasestorage.app',
  messagingSenderId: '129594648829',
  appId: '1:129594648829:web:b09e5391920a924f027694',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db
