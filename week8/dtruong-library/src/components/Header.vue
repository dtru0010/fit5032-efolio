<script setup>
import { useAuth, logout } from '@/composables/useAuth'
import router from '@/router'
const { isAuthenticated } = useAuth()

const logoutUser = () => {
  logout()
  router.push({ path: '/login' })
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
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/updatebook" class="nav-link" active-class="active"
            >Update Book</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/deletebook" class="nav-link" active-class="active"
            >Delete Book</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" v-if="!isAuthenticated" class="nav-link" active-class="active"
            >Login</router-link
          >
          <a v-else href="#" class="nav-link" @click.prevent="logoutUser">Logout</a>
        </li>
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
