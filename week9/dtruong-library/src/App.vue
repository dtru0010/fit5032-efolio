<script setup>
import JSON from './components/JSON.vue'
import Form from './views/HomeView.vue'
import Header from './components/Header.vue'
</script>

<template>
  <header>
    <Header />
  </header>

  <main class="container mt-5">
    <!-- <JSON /> -->
    <!-- <Form /> -->
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
