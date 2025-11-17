<template>
  <pre>{{ jsonData }}</pre>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const jsonData = ref(null)
const error = ref(null)

onMounted(() => {
  getBookCountAPI()
})

const getBookCountAPI = async () => {
  try {
    const res = await axios.get('https://countbooks-rtapmza2ea-uc.a.run.app')
    jsonData.value = res.data
    error.value = null
  } catch (err) {
    console.log('Error fetching book count:', err)
    error.value = err
    jsonData.value = null
  }
}
</script>
