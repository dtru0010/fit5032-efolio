<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="updateBook">
      <div>
        <label for="currentisbn">ISBN to Update:</label>
        <input type="text" v-model="isbn" id="currentisbn" required />
      </div>
      <div>
        <label for="name">New Name:</label>
        <input type="text" v-model="newName" id="newname" required />
      </div>
      <button type="submit">Update Book</button>
    </form>
  </div>
  <div>
    <BookList className="mt-5" />
  </div>
</template>

<script setup>
import BookList from '@/components/BookList.vue'
import db from '@/firebase/init'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { ref } from 'vue'

const isbn = ref('')
const newName = ref('')

const checkIfBookExists = async (isbn) => {
  const q = query(collection(db, 'books'), where('isbn', '==', isbn))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].ref
  }
  return null
}

const updateBook = async () => {
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

    await updateDoc(bookDocRef, {
      name: newName.value,
    })

    isbn.value = ''
    newName.value = ''
    alert('Book updated successfully')
  } catch (error) {
    console.log('Error updating book: ', error)
  }
}
</script>

<style scoped></style>
