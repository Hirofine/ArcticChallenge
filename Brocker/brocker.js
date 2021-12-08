// Library Imports
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Connection to Blockchain Initialization
//const rpcURL = "http://172.27.63.201:7545";
const rpcURL = "http://192.168.137.216:7545";
const web3 = new Web3(rpcURL);

// Connection to serial port
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
var arduino_data;
var output;

// Data set up
let abi = '[{"inputs":[],"name":"getval","outputs":[{"components":[{"internalType":"int256","name":"t","type":"int256"},{"internalType":"uint256","name":"h","type":"uint256"},{"internalType":"int256","name":"hI","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structCrudApp.Temp[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"int256","name":"t","type":"int256"},{"internalType":"uint256","name":"h","type":"uint256"},{"internalType":"int256","name":"hI","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structCrudApp.Temp","name":"recTemp","type":"tuple"}],"name":"setval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"weatherdb","outputs":[{"internalType":"int256","name":"t","type":"int256"},{"internalType":"uint256","name":"h","type":"uint256"},{"internalType":"int256","name":"hI","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"}]';
let bytecode = '608060405234801561001057600080fd5b5061058e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806305bcfdea1461004657806331b6bd06146100795780634025029e14610097575b600080fd5b610060600480360381019061005b91906102a2565b6100b3565b60405161007094939291906103f8565b60405180910390f35b6100816100f3565b60405161008e91906103d6565b60405180910390f35b6100b160048036038101906100ac9190610275565b61017a565b005b600081815481106100c357600080fd5b90600052602060002090600402016000915090508060000154908060010154908060020154908060030154905084565b60606000805480602002602001604051908101604052809291908181526020016000905b82821015610171578382906000526020600020906004020160405180608001604052908160008201548152602001600182015481526020016002820154815260200160038201548152505081526020019060010190610117565b50505050905090565b600081908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000155602082015181600101556040820151816002015560608201518160030155505050565b6000813590506101e28161052a565b92915050565b6000608082840312156101fe576101fd61050f565b5b610208608061043d565b90506000610218848285016101d3565b600083015250602061022c84828501610260565b6020830152506040610240848285016101d3565b604083015250606061025484828501610260565b60608301525092915050565b60008135905061026f81610541565b92915050565b60006080828403121561028b5761028a610514565b5b6000610299848285016101e8565b91505092915050565b6000602082840312156102b8576102b7610514565b5b60006102c684828501610260565b91505092915050565b60006102db8383610363565b60808301905092915050565b60006102f282610472565b6102fc818561048a565b935061030783610462565b8060005b8381101561033857815161031f88826102cf565b975061032a8361047d565b92505060018101905061030b565b5085935050505092915050565b61034e8161049b565b82525050565b61035d8161049b565b82525050565b6080820160008201516103796000850182610345565b50602082015161038c60208501826103b8565b50604082015161039f6040850182610345565b5060608201516103b260608501826103b8565b50505050565b6103c1816104a5565b82525050565b6103d0816104a5565b82525050565b600060208201905081810360008301526103f081846102e7565b905092915050565b600060808201905061040d6000830187610354565b61041a60208301866103c7565b6104276040830185610354565b61043460608301846103c7565b95945050505050565b6000610447610458565b905061045382826104af565b919050565b6000604051905090565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b6000819050919050565b6000819050919050565b6104b882610519565b810181811067ffffffffffffffff821117156104d7576104d66104e0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6105338161049b565b811461053e57600080fd5b50565b61054a816104a5565b811461055557600080fd5b5056fea2646970667358221220d71271690ee289ef3f9a9b4a864b24ea31a30b4b4ffa6c5aa2f10755996b89f264736f6c63430008070033';
let conAddress = "0xEE4fb72da9AeaEc2D8A1E4a21fC9f3E0F507Dd3E"

//Contract object and account info
let deploy_contract = new web3.eth.Contract(JSON.parse(abi),conAddress);
let account = '0xd5a84c66d68001aBbe27569A1df9C83D4f1d1F4c';

// Function Parameter
let rand1 = Math.floor(Math.random()*-5);
let rand2 = Math.floor(Math.random()*99);
let rand3 = Math.floor(Math.random()*-5);
output = [rand1,rand2,rand3,Date.now()];

// Read the port data
port.on("open", () => {
	console.log('serial port open');
  });
  
  parser.on('data', data =>{
  //  console.log('got word from arduino:', data);
	arduino_data = data.split(" ");
	output = [parseInt(arduino_data[0]),parseInt(arduino_data[1]),parseInt(arduino_data[2]),Date.now()]
	console.log(output);
// Post value to blockchain 
  deploy_contract.methods.setval(output).send({from: account,gas:813325});
  console.log("this was published;"+String(output));
  });

