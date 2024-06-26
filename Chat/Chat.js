exports.Chat=()=>{
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

let users = [];

io.on('connection', (socket) => {
  console.log('A new user has connected', socket.id);

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
    users = users.filter((user) => user.id !== socket.id);
    console.log(users);
    io.emit('userList', users.map((user) => user.username));
  });

  socket.on('setUsername', (username) => {
    const user = { id: socket.id, username };
    users.push(user);
    console.log("users");
    console.log(users);
    console.log(user);

    io.emit('userList', users.map((user) => user.username));
  });
});
// PORT = process.env.PORT || 8000


// server.listen(PORT, () => {
//   console.log('chat server is running on port 8000 or 5000');
// }
// )
;}
