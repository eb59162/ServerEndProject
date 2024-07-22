const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

PORT = process.env.PORT || 8000
CONNECTION = process.env.CONNECTION || "mongodb://127.0.0.1:27017/stories"
SECRET = process.env.SECRET

const corsOptions = require('./config/corsOptions')
const cors = require('cors')
const storyRoter = require('./Routers/RouteStory')
const userRoter = require('./Routers/RouteUser')
const User = require('./Models/ModelUser')

const LoggerMiddleware = (req, res, next) => {
    console.log(`${req.url} ${req.method} -- ${new Date()}`);
    next();
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(LoggerMiddleware)
app.use('/stories', storyRoter)
app.use('/users', userRoter)

app.post('/login', async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await User.findOne({ email })
        if (user) {
            if (email === process.env.ADMINEMAIL && name === process.env.ADMINNAME) {
                const token = jwt.sign({ name, email, role: "admin" }, SECRET)
                res.send({ accessToken: token })
            }
            else {
                const token = jwt.sign({ name, email }, SECRET)
                res.send({ accessToken: token })
            }
        } else {
            res.status(401).send({ message: "unauthorized" })
        }
    } catch (error) {
        console.error('Faild log in user:', error)
        res.status(500).json({ message: 'Faild to log in' })
    }
})


app.get('/', function (req, res) {
    res.send('Hello World!')
})

io.on('connection', (socket) => {
    console.log("new user connected ", socket.id);

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log(socket.id, ' disconnected')
    });
});

mongoose.connect(CONNECTION).then(
    () => app.listen(PORT, () => console.log(`server runing on port ${PORT}`)))
    .catch((error) => console.log(error.message));