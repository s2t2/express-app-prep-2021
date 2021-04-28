// imports were not working the way they are in react project
// these imports are adapted from: https://fredriccliver.medium.com/directory-import-node-modules-firebase-app-is-not-supported-resolving-es-modules-imported-843d9aeceb79


import firebase from "@firebase/app"
//import "firebase/auth"
import "@firebase/firestore"

import dotenv from 'dotenv'

dotenv.config() // use environment variables from .env file

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

export const app = firebase.default.initializeApp(firebaseConfig)

export const db = firebase.default.firestore(app)

export async function fetchProducts() {
    console.log("FETCHING PRODUCTS...")

    // https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#get
    const docs = await db.collection("products").get()
    console.log("DOCS:", docs.size)

    // https://googleapis.dev/nodejs/firestore/latest/QuerySnapshot.html
    // instead of returning the products as documents with separate ids and data
    // let's create a single object with both the id and the data
    // to make them easier to process and loop through later
    //var products = []
    //docs.forEach((doc) => {
    //    //console.log("DOC ID:", doc.id, "DATA", doc.data())
    //    var product = doc.data() // create a new object with the product info
    //    product["id"] = doc.id // merge the id with the object
    //    products.push(product)
    //})
    ////console.log("PRODUCTS:", products.length)
    //return products
    return true
}
