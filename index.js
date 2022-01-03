const express = require('express')
const importData = require("./data.json")
const importData1 = require("./data1.json")
const  satelize = require('satelize')
const app = express()
let port = process.env.PORT || 3000


 app.get("/", (req, res) => {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress

    var detail = null

    satelize.satelize({ip: `${ip}`}, function(err,payload){
        detail = payload
        console.log(payload)
    })
    res.send(`
        <p>Host: ${req.hostname}</p>
        <p>Path: ${req.path}</p>
        <p>Method: ${req.method}</p>
        <p>Agent: ${req.header('user-agent')}</p>
        <p>IP: ${ip}</p>
        <p>Datail IP Address : ${[JSON.stringify(detail)]}</p>
    `)
})

app.get("/data", (req, res) => {
    var name_search = req.query.name
    var n = req.query.n
    if(n != undefined)
    {
        var result = importData.slice(0,n)
        res.send(result)
    }
    else if(name_search !== undefined)
    {
        var result = importData.filter((data) => {
            return data.last_name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1
        })
        res.send(result)
    } else {
        res.send(importData)
    }
    
})

app.get("/data1", (req, res) => {
    res.send(importData1)
})

app.listen(port, ()=> {
    console.log(`Example app is listening on port http://localhost:${port}`);
})