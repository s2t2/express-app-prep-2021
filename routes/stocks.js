var express = require('express');
var router = express.Router();

//const API_KEY = process.env.ALPHAVANTAGE_API_KEY || "abc123" // obtain your own api key and set via environment variable

router.get('/form', function(req, res, next) {
  res.render("stocks_form");
});

router.post('/dashboard', function(req, res, next) {
  console.log("FORM DATA", req.body)
  var symbol = req.body.symbol || "OOPS"
  console.log("STOCK SYMBOL", symbol)

  //var requestUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
  //console.log("REQUEST URL", requestUrl)

  var parsedResponse = {"Meta Data":{}, "Time Series":{}}

  res.render("stocks_dashboard", {symbol: symbol, data: parsedResponse});
});

module.exports = router;
