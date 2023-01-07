const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server , {
    cors: {
        origin: ['http://localhost:3000']
    }
})

io.on("connection", (socket) => {
    socket.on('join-room', (roomId, userId) => {
        console.log('room id', roomId);
        socket.join(roomId);
    })

    socket.on('connection-request', (roomId, userId) => {
        socket.to(roomId).emit('user-connected', userId);
    })
});

server.listen(3001);
