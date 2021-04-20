var express = require('express');
var router = express.Router();

const {loginGoogle} = require("../firebase")

router.post('/login', async function(req, res, next) {
    try {
        var currentUser = await loginGoogle()
        // todo: add currentUser to the req
        req.flash("warning", "Login successful! Welcome back, " + currentUser.email)
        res.redirect("/products")
    } catch (error) {
        req.flash("warning", "OOPS, Login Error. Please try again.")
        res.redirect("/auth/login")
    }
})

module.exports = router;
