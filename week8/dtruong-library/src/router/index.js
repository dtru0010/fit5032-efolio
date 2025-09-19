import { useAuth } from '@/composables/useAuth'
import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UnauthenticatedView from '@/views/UnauthenticatedView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const requireAuth = (to, from, next) => {
  const { isAuthenticated } = useAuth()
  if (to.name !== 'Login' && !isAuthenticated.value) {
    next({
      name: 'Unauthenticated',
      params: { pathMatch: to.path.split('/').slice(1) },
      query: to.query,
      hash: to.hash,
    })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Unauthenticated',
    component: UnauthenticatedView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
