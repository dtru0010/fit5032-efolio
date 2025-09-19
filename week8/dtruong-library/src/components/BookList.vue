<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li>
    </ul>
  </div>
</template>

<script setup>
import db from '@/firebase/init'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (error) {
    console.log('Error fetching books: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped></style>
