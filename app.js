const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express()
const storyRoter = require('./Routers/RouteStory')
const userRoter = require('./Routers/RouteUser')
const User = require('./Models/ModelUser')

PORT = process.env.PORT || 8000
CONNECTION = process.env.CONNECTION || "mongodb://127.0.0.1:27017/stories"
SECRET = process.env.SECRET

app.use(express.json())

app.use('/stories', storyRoter)
app.use('/users', userRoter)

app.post('/login', (req, res) => {
    const user = User.findOne(user => user.email === req.body.email && user.name === req.body.name)
    if(user){
        const token = jwt.sign({id: req.id, name: req.name, email: req.email}, SECRET)
        res.send({ accessToken: token })
    } else {
        res.status(401).send({ message: "unauthorized" }) 
    }
})

app.get('/', function (req, res) {
    res.send('Hello World!')
})

mongoose.connect(CONNECTION).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));