<template>
  <pre>{{ jsonData }}</pre>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const jsonData = ref(null)
const error = ref(null)

onMounted(() => {
  getAllBookAPI()
})

const getAllBookAPI = async () => {
  try {
    const res = await axios.get('https://getallbooks-rtapmza2ea-uc.a.run.app')
    jsonData.value = res.data
    error.value = null
  } catch (err) {
    console.log('Error fetching all books:', err)
    error.value = err
    jsonData.value = null
  }
}
</script>
