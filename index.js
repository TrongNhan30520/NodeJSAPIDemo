const express = require('express')
const importData = require("./data.json")
const importData1 = require("./data1.json")
const app = express()
let port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send(`
        ${req.hostname}
        ${req.ip}
        ${req.method}
        ${req.httpVersion}
    `)
})

app.get("/data", (req, res) => {
    res.send(importData)
})

app.get("/data1", (req, res) => {
    res.send(importData1)
})

app.listen(port, ()=> {
    console.log(`Example app is listening on port http://localhost:${port}`);
})