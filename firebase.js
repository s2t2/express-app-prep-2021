

const firebase = require("firebase/app")
require("firebase/auth")
require("firebase/firestore")

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}
//console.log("FIREBASE CONFIG", firebaseConfig)

const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)

async function fetchProducts() {
    console.log("FETCHING PRODUCTS...")

    // https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#get
    const docs = await db.collection("products").get()
    console.log("DOCS:", docs.size)

    // https://googleapis.dev/nodejs/firestore/latest/QuerySnapshot.html
    // instead of returning the products as documents with separate ids and data
    // let's create a single object with both the id and the data
    // to make them easier to process and loop through later
    var products = []
    docs.forEach((doc) => {
        //console.log("DOC ID:", doc.id, "DATA", doc.data())
        var product = doc.data() // create a new object with the product info
        product["id"] = doc.id // merge the id with the object
        products.push(product)
    })
    //console.log("PRODUCTS:", products.length)
    return products
}

async function loginGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/userinfo.email") // see: https://developers.google.com/identity/protocols/oauth2/scopes

    const result = await app.auth().signInWithPopup(provider)
    //const result = await app.auth().signInWithRedirect(provider)

    var user = result.user
    var providerId = result.additionalUserInfo.providerId
    var profile = result.additionalUserInfo.profile
    var token = result.credential.accessToken
    console.log("----------------")
    console.log("LOGIN SUCCESS:")
    console.log("USER:", user) // user.uid, user.displayName, user.email, user.emailVerified, user.phoneNumber, user.photoURL, user.refreshToken
    console.log("PROVIDER:", providerId)
    console.log("USER PROFILE:", profile)
    console.log("ACCESS TOKEN", token)
    return user
}


module.exports = {
    firebaseConfig, app, db,
    fetchProducts, loginGoogle
}