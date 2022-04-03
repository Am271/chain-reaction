const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const colours = ['green', 'red'];
let count = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', (socket) => {
  	console.log('a user connected');
  	if(count == 2) count = 0;
  	console.log(colours[count] + ' was chosen');
  	socket.emit('colour', {'colour' : colours[count]});
  	socket.on('move', (move)=>{
  		io.emit('move', move);
  		console.log(move);
  	});
  	count++;
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});