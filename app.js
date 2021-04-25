const express = require('express');
const socket = require('socket.io');

const app = express();

// static files
app.use(express.static('public'));

const server = app.listen(4000, () => {
	console.log('Server is running.');
});

// Socket Setup
const io = socket(server);

// Each client will have a seperate connection from server. Client will try to connect first withthe server.
io.on('connection', (socket) => {
	console.log('Made socket connection');

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	});
});
