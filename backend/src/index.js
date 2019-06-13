const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = 3333

const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(require('./routes'))

server.listen(PORT, () => console.log(`Listening http://localhost:${PORT}`))