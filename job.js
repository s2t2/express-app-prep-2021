
// run with: node job.js

import { firebaseConfig, fetchProducts } from "./services/firebaseService.js"

console.log("FIREBASE CONFIG ....")
console.log(firebaseConfig)

var products = fetchProducts()

console.log(products)

//products.forEach(function(product){
//    console.log("------------")
//    console.log(product)
//})
