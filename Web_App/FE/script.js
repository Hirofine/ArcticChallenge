$(document).ready(function () {
    //var Web3 = require('web3');
    const web3 = new Web3("http://172.27.63.201:7545");


    let latestKnownBlockNumber = -1;
    let blockTime = 5000;

    // Our function that will triggered for every block
    async function processBlock(blockNumber) {
        console.log("We process block: " + blockNumber);
        let block = await web3.eth.getBlock(blockNumber);
        console.log("new block :", block)
        for (const transactionHash of block.transactions) {
            let transaction = await web3.eth.getTransaction(transactionHash);
            let transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
            transaction = Object.assign(transaction, transactionReceipt);
            console.log("Transaction: ", transaction);
            // Do whatever you want here
            //$.getJSON('{"userId": 1, "id": 1,"title": "delectus aut autem","completed": false}', function (data) {
            //document.getElementById("json").textContent += "<li>" + JSON.stringify(transaction, undefined, 2) + "</li>";
            var li = $('<li><input type="checkbox" name="' + transaction.r + '" id="' + transaction.hash + '"/>' +
                '<label for="' + transaction.s + '"></label></li>');
            li.find('label').text(String(transaction.s));
            $('#json').append(li);
            //});
        }
        latestKnownBlockNumber = blockNumber;
    }

    // This function is called every blockTime, check the current block number and order the processing of the new block(s)
    async function checkCurrentBlock() {
        const currentBlockNumber = await web3.eth.getBlockNumber()
        console.log("Current blockchain top: " + currentBlockNumber, " | Script is at: " + latestKnownBlockNumber);
        while (latestKnownBlockNumber == -1 || currentBlockNumber > latestKnownBlockNumber) {
            await processBlock(latestKnownBlockNumber == -1 ? currentBlockNumber : latestKnownBlockNumber + 1);
        }
        setTimeout(checkCurrentBlock, blockTime);
    }

    checkCurrentBlock()
});