const express = require('express')
const app = express()
const port = 3001
const cors = require("cors")
app.use(cors())
const url = new URL("http://localhost:3001")

app.get(`/books`, (req, res) => {
  res.header({'Access-Control-Allow-Origin': '*'})
  res.json({"Hello": "World"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})