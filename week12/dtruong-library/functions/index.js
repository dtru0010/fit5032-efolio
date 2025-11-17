/**
 * Import function triggers from their respective submodules:
 *
 * import { onCall } from "firebase-functions/v2/https";
 * import { onDocumentWritten } from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'

import admin from 'firebase-admin'
import cors from 'cors'

const corsHandler = cors({ origin: true })

admin.initializeApp()

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 })

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Counts the number of books in the Firestore 'books' collection
export const countBooks = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size
      res.status(200).send({ count })
    } catch (error) {
      console.error('Error fetching book count:', error.message)
      res.status(500).send('Failed to fetch book count')
    }
  })
})

// Capitalises a given string
export const capitalize = onRequest((req, res) => {
  corsHandler(req, res, () => {
    const text = req.query.text
    if (!text) {
      return res.status(400).send('Please provide a text query parameter')
    }
    const capitalizedText = text.toString().toUpperCase()
    res.status(200).send({ capitalizedText })
  })
})

// Get all books from the Firestore 'books' collection
export const getAllBooks = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const books = []
      snapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).send({ books })
    } catch (error) {
      console.error('Error fetching books:', error.message)
      res.status(500).send('Failed to fetch books')
    }
  })
})
