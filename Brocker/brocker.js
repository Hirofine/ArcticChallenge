const Web3 = require("web3")
var weather_url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=64.749&lon=20.9594";

const web3 = new Web3("http://172.27.63.201:7545")
web3.eth.getBlockNumber(function (error, result) {
    console.log(result)
	})


    