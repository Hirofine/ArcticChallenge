$(document).ready(function () {
  console.log("please be working");
  var res;
  var test = 10;
  $.getJSON('https://jsonplaceholder.typicode.com/todos', function(data){
    document.getElementById("json").textContent = JSON.stringify(data, undefined, 2);
  });

  var Web3 = require("web3");
  //const web3 = new Web3("http://localhost:8545");
 const web3 = new Web3("https://cloudflare-eth.com");
	
async function getBlockNumber() {
	  const latestBlockNumber = await web3.eth.getBlockNumber();
	  console.log(latestBlockNumber);
	  return latestBlockNumber;
	}	
	getBlockNumber();
});