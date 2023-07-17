const Server = require('./models/server')

// const express = require('express')
// const app = express();

require('dotenv').config()

// app.use('/public', express.static(`${__dirname}/storage/imgs`))

const server = new Server()

server.listen()
