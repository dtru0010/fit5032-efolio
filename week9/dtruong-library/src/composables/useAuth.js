import { ref } from 'vue'

const isAuthenticated = ref(false)

export function useAuth() {
  return {
    isAuthenticated,
  }
}

export function login() {
  isAuthenticated.value = true
}

export function logout() {
  isAuthenticated.value = false
}
