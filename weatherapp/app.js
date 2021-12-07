const express = require('express')
const app = express()
const port = 3000
const Web3 = require("web3")
const web3 = new Web3("http://localhost:8545")


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})