<script setup>
import { ref } from 'vue'
import validCredentials from '@/assets/json/validCredentials.json'
import router from '@/router'
import { login } from '@/composables/useAuth'

const credentials = validCredentials

const loginData = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: null,
  password: null,
})

const submitLogin = () => {
  validateUsername(true)
  validatePassword(true)

  if (!errors.value.username && !errors.value.password) {
    login()
    router.push({ path: '/' })
  }
}

const validateUsername = (blur) => {
  const username = loginData.value.username
  if (username.trim() === '') {
    if (blur) errors.value.username = 'Username is required.'
  } else if (username !== credentials.username) {
    if (blur) errors.value.username = `Username is incorrect.`
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = loginData.value.password

  if (password.trim() === '') {
    if (blur) errors.value.password = 'Password is required.'
  } else if (password !== credentials.password) {
    if (blur) errors.value.password = `Password is incorrect.`
  } else {
    errors.value.password = null
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1>Login</h1>
        <form @submit.prevent="submitLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="loginData.username"
              @blur="validateUsername(true)"
              @input="validateUsername(false)"
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="loginData.password"
              @blur="validatePassword(true)"
              @input="validatePassword(false)"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
