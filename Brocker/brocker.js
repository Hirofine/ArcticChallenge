const Web3 = require("web3")
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
var json_data;
var output;

const web3 = new Web3("http://172.27.63.201:7545")
var EthereumSession = web3.eth.contract();
var ethereumSessionInstance = EthereumSession.at(" ");

web3.eth.defaultAccount = web3.eth.accounts[0];

// Read the port data
port.on("open", () => {
    console.log('serial port open');
});

parser.on('data', data =>{
//  console.log('got word from arduino:', data);
    json_data = data.split(" ");
    output = [["celsius",parseInt(json_data[0])],["percentage",parseInt(json_data[1])],["celsius",parseInt(json_data[2])],Date.now()]
    console.log(output);
    ethereumSessionInstance.setval(output);
    console.log(ethereumSessionInstance.getval());
// Here we need to send output to the blockchain, how? ask romain

});
    