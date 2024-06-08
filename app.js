const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app= express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

PORT = process.env.PORT || 8000
CONNECTION = process.env.CONNECTION || "mongodb://127.0.0.1:27017/stories"

mongoose.connect(CONNECTION).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));