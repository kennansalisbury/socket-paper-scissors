let express = require('express')
let app = express()
let server = require('http').createServer(app) //sometimes people name this http instead of server
let io = require('socket.io').listen(server)
let layout = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(layout)

// SOCKET STUFF
let connections = []
let players = []

io.sockets.on('connection', socket => {
    connections.push(socket)
    // console.log(socket)
    console.log(`Connection made: ${connections.length} sockets connected`)

    socket.on('disconnect', () => {
        players.splice(players.indexOf(socket.username), 1)
        updateUsernames()
        connections.splice(connections.indexOf(socket), 1)
        io.emit('disconnected', socket.username)//sends message out to all sockets
        console.log(`Disconnected: ${connections.length} sockets connected`)
    })


    const updateUsernames = () => {
        io.sockets.emit('get players', players);
    }
})

app.get('/', (req, res) => {
    res.render('index')
})


server.listen(3000, () => {
    console.log('⭐️⭐️⭐️⭐️⭐️')
})