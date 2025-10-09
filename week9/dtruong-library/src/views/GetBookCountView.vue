<template>
  <div>
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const res = await axios.get()
    count.value = res.data.count
    error.value = null
  } catch (err) {
    console.log('Error fetching book count:', err)
    error.value = err
    count.value = null
  }
}
</script>
