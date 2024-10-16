const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

const userid = [];

io.on('connection', (socket) => {
	if (userid.length > 0) {
		const roomID = uuidv4();
		socket.join(roomID);
		socket.join(userid[0]);
		console.log(`Users joined room: ${roomID}`);
		userid.pop();
	} else {
		userid.push(socket.id);
		console.log(`User added with socket ID: ${socket.id}`);
	}
});

app.get('/', (req, res) => {
	res.render('index');
});

server.listen(3000, () => {
	console.log('Server is running on port http://localhost:3000');
});
