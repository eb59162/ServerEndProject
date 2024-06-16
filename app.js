const express = require('express')
// const cors=require('cors')
const app = express()
const storyRoter = require('./Routers/RouteStory')
const userRoter = require('./Routers/RouteUser')
app.use(express.json())
// app.use(cors(configCors))
app.use('/stories', storyRoter)

app.use('/users', userRoter)


app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(8000, () => {
    console.log("runing port 8000");
})