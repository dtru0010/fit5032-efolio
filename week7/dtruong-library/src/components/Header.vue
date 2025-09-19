<script setup>
import { useAuth, logout } from '@/composables/useAuth'
import router from '@/router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { onMounted, ref } from 'vue'
const { isAuthenticated } = useAuth()

const logoutUser = () => {
  logout()
  router.push({ path: '/login' })
}

const isLoggedIn = ref(false)
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user)
    isLoggedIn.value = !!user
  })
})

const handleSignOut = async () => {
  try {
    await signOut(auth)
    router.push('/firebaseSignin')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" v-if="!isAuthenticated" class="nav-link" active-class="active"
            >Login</router-link
          >
          <a v-else href="#" class="nav-link" @click.prevent="logoutUser">Logout</a>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a href="#" class="nav-link" @click.prevent="handleSignOut">Firebase Logout</a>
        </li>
        <template v-else>
          <li class="nav-item">
            <router-link to="/FireLogin" class="nav-link" active-class="active"
              >Firebase Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/FireRegister" class="nav-link" active-class="active"
              >Firebase Register</router-link
            >
          </li>
        </template>
      </ul>
    </header>
  </div>
  <hr class="full-divider" />
</template>

<style>
.full-divider {
  width: 100%;
  border: none;
  border-top: 1px solid #000000;
  margin: 0;
}
</style>
