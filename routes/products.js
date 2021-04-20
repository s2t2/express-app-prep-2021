var express = require('express');
var router = express.Router();

const {fetchProducts, firebase} = require("../firebase")

router.get('/', async function(req, res, next) {
    //var products = fetchProducts()
    try {
        var products = await fetchProducts()
        res.render("products", {"products": products})
    } catch (error) {
        res.redirect("/")
    }
})

router.post('/orders', function(req, res, next) {

    console.log("FORM DATA", req.body)
    //var email = req.body.email
    var productId = req.body.productId
    var productName = req.body.productName
    var productPrice = req.body.productPrice
    console.log("TODO: ORDER PRODUCT", productId, productName, productPrice)

    req.flash("warning", "Order sent successfully!")
    res.redirect("/products")
})

module.exports = router;
