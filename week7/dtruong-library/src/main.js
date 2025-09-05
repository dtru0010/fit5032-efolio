import { createApp } from 'vue'
import App from './App.vue'

// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'

import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA35tNQmfXpKp2IFRb9gvtx8g-p1CZZCMw',
  authDomain: 'week7-daniel-7dab0.firebaseapp.com',
  projectId: 'week7-daniel-7dab0',
  storageBucket: 'week7-daniel-7dab0.firebasestorage.app',
  messagingSenderId: '117611640330',
  appId: '1:117611640330:web:602be55c2cc1bedce291f3',
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)

app.mount('#app')
