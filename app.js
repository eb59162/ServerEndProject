const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
// const cors=require('cors')
const app = express()
const storyRoter = require('./Routers/RouteStory')
const userRoter = require('./Routers/RouteUser');
app.use(express.json())
// app.use(cors(configCors))

app.use('/stories', storyRoter)
app.use('/users', userRoter)

app.get('/', function (req, res) {
    res.send('Hello World!')
})
PORT = process.env.PORT || 8000
CONNECTION = process.env.CONNECTION || "mongodb://127.0.0.1:27017/stories"

mongoose.connect(CONNECTION).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));