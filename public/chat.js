// Make Websocket Connection
// Socket for frontend :
const socket = io.connect('http://localhost:4000');

// Dom query
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedbacl = document.getElementById('feedback');

// Emmit event
btn.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
	});
	message.value = '';
});

// Broadcasting message : Eg: John is typing....
message.addEventListener('keypress', () => {
	socket.emit('typing', handle.value);
});

socket.on('typing', (data) => {
	feedbacl.innerHTML = `<p><em>${data} is typing....</em></p>`;
});

// Listen for events
socket.on('chat', (data) => {
	feedbacl.innerHTML = '';
	output.innerHTML += `<p><strong>${data.handle}</strong> : ${data.message}</p>`;
});
