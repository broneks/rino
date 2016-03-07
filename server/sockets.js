'use strict'

const socketIO = require('socket.io')
const users = require('./users')
const game = require('./game')

module.exports = (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    const id = socket.id
    let user = null

    socket.on('join', (sessionId) => {
      // existing player is rejoining
      if (users.exists(sessionId)) {
        let gameSettings = game.getSettings()

        user = users.getBySessionId(sessionId)
        user.disconnected = false

        io.to(id).emit('get-user', user)
        io.to(id).emit('get-opponent', users.getOpponent(sessionId))

        if (gameSettings) io.to(id).emit('game-init', gameSettings)
      } else {
        user = users.add(id, sessionId)

        socket.broadcast.emit('player-connected', user)

        io.to(id).emit('get-user', user)
        io.to(id).emit('get-opponent', users.getOpponent(sessionId))

        // final player has joined
        if (users.maxReached()) {
          game.init()
          io.emit('game-init', game.getSettings())
        }
      }
    })

    socket.on('disconnect', () => {
      if (user) {
        user.disconnected = true
        setTimeout(() => {
          if (user.disconnected && !user.removed) {
            users.removeDisconnected()
            io.emit('player-disconnected')
            game.reset()
            socket.disconnect()
          }
        }, 4000)
      }
    })
  })
}
