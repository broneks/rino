'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)

const path = require('path')
// const favicon = require('serve-favicon')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, '../public')))
// app.use(favicon(__dirname + '../public/img/favicon.ico'))

require('./routes')(app, express.Router())
require('./sockets')(server)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status)
  res.render('error', {
    title: status,
    message: err.message,
    error: status
  })
})

module.exports = {
  app,
  server
}
