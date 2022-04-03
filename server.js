const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('move', (move)=>{
  	console.log(move);
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});