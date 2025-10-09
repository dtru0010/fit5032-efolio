<script setup>
import JSON from './components/JSON.vue'
import Form from './views/HomeView.vue'
import Header from './components/Header.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showHeader = computed(() => {
  return router.currentRoute.value.name !== 'CountBookApi'
})
</script>

<template>
  <header v-if="showHeader">
    <Header />
  </header>

  <main class="container mt-5">
    <!-- <JSON /> -->
    <!-- <Form /> -->
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
