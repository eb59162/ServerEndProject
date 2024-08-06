const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const cors = require('cors')
const { verifyJWT, verifyRole, register } = require('./Controlers/alowers');

const app = express()
const server = http.createServer(app);
const cookiesMiddleware = require('universal-cookie-express');
const message = require('./Models/message');
require('console');

const io = new Server(server, {
  cors: {
    origin:
    //  '*',
    'http://localhost:3000',
    credentials: true,
  },
});

PORT = process.env.PORT || 8000
CONNECTION = process.env.CONNECTION || "mongodb://127.0.0.1:27017/stories"
SECRET = process.env.SECRET

const corsOptions = require('./config/corsOptions')

const storyRoter = require('./Routers/RouteStory')
const userRoter = require('./Routers/RouteUser')
const User = require('./Models/ModelUser')
const leaveRoom = require('./utils/leave-room');
const mongodbSaveMessage = require('./services/mongodb-save-message');
const mongodbGetMessages = require('./services/mongodb-get-messages');

const LoggerMiddleware = (req, res, next) => {
    // console.log(`${req.url} ${req.method} -- ${new Date()}`);
    next();
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(LoggerMiddleware)
app.use('/stories', storyRoter)
app.use('/users', userRoter)
app.use(cookiesMiddleware())

app.post('/login', async (req, res) => {
    try {
        const { name, email } = req.body
        const user = await User.findOne({ email })
        console.log("user login ", email);
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

// io.on('connection', (socket) => {
    // console.log("new user connected ", socket.id);

//     socket.on('message', (message) => {
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log(socket.id, ' disconnected')
//     });
// });

///
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('join_room', (data) => {
      const { username, room } = data;
      socket.join(room);
      let _createdtime_ = Date.now();
      socket.to(room).emit('receive_message', {
        message: `${username} has joinde the chat room`,
        username: CHAT_BOT,
        _createdtime_,
      });
  
      chatRoom = room;
      allUsers.push({ id: socket.id, username, room });
      chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.to(room).emit('chatroom_users', chatRoomUsers);
    }
    );
  
    socket.on('send_message', (data) => {
      console.log("data in send_message ",data );
      const { message, username, room, _createdtime_ } = data;
      
      const isNewUser = !allUsers.some(user => user.id === socket.id);
      io.in(room).emit('receive_message', data);
      mongodbSaveMessage(message, username, room, _createdtime_)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      
      if(isNewUser){
        mongodbGetMessages(room)
        .then((last100Messages) => {
          socket.emit('last_100_messages');
        })
        .catch((err) => console.log(err));
      }
      
      io.in(room).emit('receive_message', {
        username,
        room,
        message,
        _createdtime_,
      });
  
    
    });
  
    socket.on('leave_room', (data) => {
      const { username, room } = data;
      socket.leave(room);
      const __createdtime__ = Date.now();
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(room).emit('chatroom_users', allUsers);
      socket.to(room).emit('receive_message', {
        username: CHAT_BOT,
        message: `${username} has left the chat`,
        __createdtime__,
      });
      console.log(`${username} has left the chat`);
    });
  });

mongoose.connect(CONNECTION).then(
    () => app.listen(PORT, () => console.log(`server runing on port ${PORT}`)))
    .catch((error) => console.log(error.message));

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];

server.listen(4000, () => 'server is running on port 4000');

app.post('/register', async (req, res) => {
  try {
    const { username, role } = req.body;
    const newUser = await register(username, role);
    const secretKey = process.env.SECRET;
    const token = jwt.sign({ email:newUser.email, role: newUser.role}, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const token = await login(username, password);
//     res.json({ token });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

app.get('/admin-route', verifyRole(['admin']), async (req, res) => {

  res.json({ message: 'Welcome admin!' });
});

app.use('/protected', async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  try {
    const user = await verifyJWT(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get('/protected/data', (req, res) => {
  res.json({ data: 'Protected data' });
});
// const mongoose = require('./db');
