const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // path module import karna zaroori hai

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// User page route
app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Admin page route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message from user', (message) => {
        console.log('Message from user:', message);
        socket.broadcast.emit('message from user', message);
    });

    socket.on('message from admin', (message) => {
        console.log('Message from admin:', message);
        socket.broadcast.emit('message from admin', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
