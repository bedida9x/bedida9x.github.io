const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
const http = require('http')
const server = http.createServer(app)
app.use(express.static(__dirname + "/public"));
const {
    Server
} = require('socket.io')

const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })
})

server.listen(port, () => {
    console.log('Listening on port 3000');
})