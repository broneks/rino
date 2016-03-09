'use strict'

const socketIO = require('socket.io')
const users = require('./users')
const game = require('./game')

module.exports = (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    const id = socket.id
    let user = null

    socket.on('event:join', (sessionId) => {
      // existing player is rejoining
      if (users.exists(sessionId)) {
        let gameSettings = game.getSettings()

        user = users.getBySessionId(sessionId)
        user.disconnected = false

        io.to(id).emit('data:get-user', user)
        io.to(id).emit('data:get-opponent', users.getOpponent(sessionId))

        if (gameSettings) io.to(id).emit('data:game-init', gameSettings)
      } else if (!users.maxReached()) {
        user = users.add(id, sessionId)

        socket.broadcast.emit('event:player-connected', user)

        io.to(id).emit('data:get-user', user)
        io.to(id).emit('data:get-opponent', users.getOpponent(sessionId))

        // final player has joined
        if (users.maxReached()) {
          game.init()
          io.emit('data:game-init', game.getSettings())
        }
      }
    })

    socket.on('disconnect', () => {
      if (user) {
        user.disconnected = true
        setTimeout(() => {
          if (user.disconnected && !user.removed) {
            users.removeDisconnected()
            io.emit('event:player-disconnected')
            game.reset()
            socket.disconnect()
          }
        }, 4000)
      }
    })

    socket.on('state:end-turn', () => {
      const nextTurn = game.nextTurn()
      if (nextTurn) io.emit('state:next-turn', nextTurn)
    })

    socket.on('state:card-picked-up', () => {
      const updatedDeck = game.updateDeck()
      if (updatedDeck) io.emit('state:update-deck', updatedDeck)
    })
  })
}
