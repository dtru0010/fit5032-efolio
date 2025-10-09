// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA35tNQmfXpKp2IFRb9gvtx8g-p1CZZCMw',
  authDomain: 'week7-daniel-7dab0.firebaseapp.com',
  projectId: 'week7-daniel-7dab0',
  storageBucket: 'week7-daniel-7dab0.firebasestorage.app',
  messagingSenderId: '117611640330',
  appId: '1:117611640330:web:602be55c2cc1bedce291f3',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db
