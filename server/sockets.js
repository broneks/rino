import socketIO from 'socket.io'

import users from './users'
import game from './game'

export default (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    let user = null

    socket.on('event:join', (sessionId) => {
      users.join(socket.id, sessionId)
        .then((res) => {
          user = res.user

          io.to(socket.id).emit('data:get-user', user)
          io.to(socket.id).emit('data:get-opponent', users.getOpponent(sessionId))

          if (res.isNewUser) {
            socket.broadcast.emit('event:player-connected', user)

            if (users.maxReached()) io.emit('data:game-init', game.init())
          } else {
            let gameSettings = game.getSettings()

            if (gameSettings) io.to(socket.id).emit('data:game-init', gameSettings)
          }
        })
    })

    socket.on('disconnect', () => {
      users.disconnect(user)
        .then(() => {
          io.emit('event:player-disconnected')
          socket.disconnect()
          game.reset()
        })
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
