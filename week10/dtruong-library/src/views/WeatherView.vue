<template>
  <div class="container">
    <div class="header">
      <h1>Weather App</h1>
    </div>
  </div>
  <div class="search-bar">
    <input type="text" v-model="city" placeholder="Enter City Name" class="search-input" />
    <button @click="searchByCity" class="search-button">Search</button>
  </div>
  <div v-if="weatherData">
    <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
    <div>
      <img :src="iconUrl" />
      <p>{{ temperature }}</p>
    </div>
    <span>{{ weatherData.weather[0].description }}</span>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const apiKey = 'a2a5697b0b375b9a93cbeb19c227ba83'

const city = ref('')
const weatherData = ref(null)

const temperature = computed(() => {
  if (weatherData.value) {
    return `${Math.floor(weatherData.value.main.temp - 273)}`
  }
  return null
})

const iconUrl = computed(() => {
  if (weatherData.value) {
    return `http://openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
  }
  return null
})

onMounted(() => {
  fetchCurrentLocationWeather()
})

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      await fetchWeatherData(url)
    })
  }
}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
</script>
