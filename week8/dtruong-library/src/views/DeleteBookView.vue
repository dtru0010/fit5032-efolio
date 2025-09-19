<template>
  <div>
    <h1>Delete Book</h1>
    <form @submit.prevent="deleteBook">
      <div>
        <label for="currentisbn">ISBN to Delete:</label>
        <input type="text" v-model="isbn" id="currentisbn" required />
      </div>
      <button type="submit">Delete Book</button>
    </form>
  </div>
  <div>
    <BookList className="mt-5" />
  </div>
</template>

<script setup>
import BookList from '@/components/BookList.vue'
import db from '@/firebase/init'
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { ref } from 'vue'

const isbn = ref('')

const checkIfBookExists = async (isbn) => {
  const q = query(collection(db, 'books'), where('isbn', '==', isbn))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].ref
  }
  return null
}

const deleteBook = async () => {
  try {
    if (!isbn.value) {
      alert('ISBN is required')
      return
    }

    const isbnNumber = Number(isbn.value)
    const bookDocRef = await checkIfBookExists(isbnNumber)
    if (!bookDocRef) {
      alert('Book with the current ISBN does not exist')
      return
    }

    await deleteDoc(bookDocRef)

    isbn.value = ''
    alert('Book deleted successfully')
  } catch (error) {
    console.log('Error deleting book: ', error)
  }
}
</script>

<style scoped></style>
