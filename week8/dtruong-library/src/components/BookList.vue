<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <button @click="fetchBooksOrdered">Order by Name</button>
      <button @click="fetchBooksLimited">Show First 3 Books</button>
      <button @click="fetchBooks">Reset to Default</button>
    </div>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.name }} - ISBN: {{ book.isbn }}</li>
    </ul>
  </div>
</template>

<script setup>
import db from '@/firebase/init'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

const books = ref([])
const title = ref('Book List with ISBN > 1000')

const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
    title.value = 'Book List with ISBN > 1000'
  } catch (error) {
    console.log('Error fetching books:', error)
  }
}

const fetchBooksOrdered = async () => {
  try {
    const q = query(collection(db, 'books'), orderBy('name'))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
    title.value = 'Book List ordered by name'
  } catch (error) {
    console.log('Error fetching ordered books:', error)
  }
}

const fetchBooksLimited = async () => {
  try {
    const q = query(collection(db, 'books'), limit(3))
    const querySnapshot = await getDocs(q)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
    title.value = 'Book List limited to first 3'
  } catch (error) {
    console.log('Error fetching limited books:', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped></style>
