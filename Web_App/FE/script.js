$(document).ready(function () {
    //var Web3 = require('web3');
    let conAddress = "0xEE4fb72da9AeaEc2D8A1E4a21fC9f3E0F507Dd3E"
   let abi = '[{"inputs":[],"name":"getval","outputs":[{"components":[{"internalType":"int256","name":"t","type":"int256"},{"internalType":"uint256","name":"h","type":"uint256"},{"internalType":"int256","name":"hI","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structCrudApp.Temp[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"int256","name":"t","type":"int256"},{"internalType":"uint256","name":"h","type":"uint256"},{"internalType":"int256","name":"hI","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"structCrudApp.Temp","name":"recTemp","type":"tuple"}],"name":"setval","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"weatherdb","outputs":[{"internalType":"int256","name":"t","type":"int256"},{"internalType":"uint256","name":"h","type":"uint256"},{"internalType":"int256","name":"hI","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"}]';

    let account = "0xd5a84c66d68001aBbe27569A1df9C83D4f1d1F4c";

    //const web3 = new Web3("http://172.27.63.201:7545");
    const web3 = new Web3("http://192.168.137.216:7545");
    
    let deploy_contract = new web3.eth.Contract(JSON.parse(abi),conAddress);
    deploy_contract.methods.getval().call();

    let latestKnownBlockNumber = -1;
    let blockTime = 5000;
    var i = 0;
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
            var value = await deploy_contract.methods.getval().call();
            console.log(value);
            // Do whatever you want here
            //$.getJSON('{"userId": 1, "id": 1,"title": "delectus aut autem","completed": false}', function (data) {
            //document.getElementById("json").textContent += "<li>" + JSON.stringify(transaction, undefined, 2) + "</li>";
            var li = $('<div class="expandable-item" onclick="toggle(' + i + ')"><div class="expandable-header">' +
                transaction.hash +
                '<div class="expandable-icon"><div class="line"></div><div class="line"></div></div></div><div class="expandable-body"><div class="container">' +
                format_division(transaction.blockNumber, "Block Number") + format_division(transaction.from, "From") + format_division(transaction.to, "To") + format_division(transaction.value, "Data")
                + '</div></div></div>');
            //li.find('label').text(String(transaction.s));
            $('#json').append(li);
            i++;
            //});
        }
        latestKnownBlockNumber = blockNumber;
    }

    // This function is called every blockTime, check the current block number and order the processing of the new block(s)
    async function checkCurrentBlock() {
        const currentBlockNumber = await web3.eth.getBlockNumber()
        console.log("Current blockchain top: " + currentBlockNumber, " | Script is at: " + latestKnownBlockNumber);
        for (var i = 0; i <= currentBlockNumber; i++) {
            await processBlock(i);
        }
        //setTimeout(checkCurrentBlock, blockTime);
    }

    checkCurrentBlock()
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var temp = [
        { y: '2014', a: 50 },
        { y: '2015', a: 65 },
        { y: '2016', a: 50 },
        { y: '2017', a: 75 },
        { y: '2018', a: 80 },
        { y: '2019', a: 90 },
        { y: '2020', a: 100 },
        { y: '2021', a: 115 },
        { y: '2022', a: 120 },
        { y: '2023', a: 145 },
        { y: '2024', a: 160 }
    ],
        config = {
            data: temp,
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Temperature °C'],
            fillOpacity: 0.6,
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors: ['#ffffff'],
            pointStrokeColors: ['#de6fa1'],
            lineColors: ['#de6fa1'],
            barColors: ['#de6fa1']
        };
    config.element = 'temp-chart';
    Morris.Line(config);

    var hum = [
        { y: '2014', a: 50 },
        { y: '2015', a: 65 },
        { y: '2016', a: 50 },
        { y: '2017', a: 75 },
        { y: '2018', a: 80 },
        { y: '2019', a: 90 },
        { y: '2020', a: 10 },
        { y: '2042', a: 12 },
        { y: '2022', a: 69 },
        { y: '2023', a: 42 },
        { y: '2024', a: 16 }
    ],
        config = {
            data: hum,
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Humidity %'],
            fillOpacity: 0.6,
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors: ['#ffffff'],
            pointStrokeColors: ['#de6fa1'],
            lineColors: ['#de6fa1'],
            barColors: ['#de6fa1']
        };
    config.element = 'hum-chart';
    Morris.Line(config);


});

toggle = (idx) => {
    document.querySelectorAll('.expandable-item')[idx].classList.toggle('active');
}

function format_division(parameter, title) {
    return '<div class="row"><div class="col-sm-4">' + title + '</div><div class="col-sm-8">' + parameter + '</div></div>';
}


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


