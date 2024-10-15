const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New User: ', socket.id);
});

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000);
