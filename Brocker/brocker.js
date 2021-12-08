const Web3 = require("web3")
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
var json_data;
var output;
// connect to session
const web3 = new Web3(new Web3.providers.HttpProvider("http://172.27.63.201:7545"));
var EthereumSession = web3.eth.Contract([
	{
		"inputs": [],
		"name": "getval",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "unit",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "value",
								"type": "int256"
							}
						],
						"internalType": "struct CrudApp.S_standard",
						"name": "temp",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "unit",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "value",
								"type": "int256"
							}
						],
						"internalType": "struct CrudApp.S_standard",
						"name": "humidity",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "unit",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "value",
								"type": "int256"
							}
						],
						"internalType": "struct CrudApp.S_standard",
						"name": "heatIndex",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct CrudApp.Temperature[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "unit",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "value",
								"type": "int256"
							}
						],
						"internalType": "struct CrudApp.S_standard",
						"name": "temp",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "unit",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "value",
								"type": "int256"
							}
						],
						"internalType": "struct CrudApp.S_standard",
						"name": "humidity",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "unit",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "value",
								"type": "int256"
							}
						],
						"internalType": "struct CrudApp.S_standard",
						"name": "heatIndex",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct CrudApp.Temperature",
				"name": "recTemperature",
				"type": "tuple"
			}
		],
		"name": "setval",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "weatherdb",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "unit",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "value",
						"type": "int256"
					}
				],
				"internalType": "struct CrudApp.S_standard",
				"name": "temp",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "unit",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "value",
						"type": "int256"
					}
				],
				"internalType": "struct CrudApp.S_standard",
				"name": "humidity",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "unit",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "value",
						"type": "int256"
					}
				],
				"internalType": "struct CrudApp.S_standard",
				"name": "heatIndex",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
],"0x008651ec1DC53170063FB9758145bfBd3d7994B6");
//var ethereumSessionInstance = EthereumSession.at("0x008651ec1DC53170063FB9758145bfBd3d7994B6");
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
    // send to blockchain
    ethereumSessionInstance.setval(output);
    console.log(ethereumSessionInstance.getval());
});
    