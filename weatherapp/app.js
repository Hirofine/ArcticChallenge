const express = require('express')
const app = express()
const port = 3000
const Web3 = require("web3")
var weather_url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=64.749&lon=20.9594";

const axios = require('axios');

// Make a request for a user with a given ID
axios.get(weather_url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

//const web3 = new Web3("http://localhost:8545")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
    console.log(result)
	})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})