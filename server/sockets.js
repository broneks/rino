import socketIO from 'socket.io'

import users from './users'
import settings from './settings'

export default (server) => {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    let user = null

    socket.on('event:join', (sessionId) => {
      users.join(socket.id, sessionId)
        .then((res) => {
          user = res.user

          io.to(socket.id).emit('data:get-user', user)

          if (res.isNewUser) {
            socket.broadcast.emit('event:player-connected', user)

            if (users.maxReached()) io.emit('data:game-init', settings.init())
          } else {
            let gameSettings = settings.get()

            if (gameSettings) io.to(socket.id).emit('data:game-init', gameSettings)
          }
        })
    })

    socket.on('disconnect', () => {
      users.disconnect(user)
        .then(() => {
          io.emit('event:player-disconnected')
          socket.disconnect()
          settings.reset()
        })
    })

    socket.on('state:end-turn', () => {
      const nextTurn = settings.nextTurn()
      if (nextTurn) io.emit('state:next-turn', nextTurn)
    })

    socket.on('state:card-picked-up', () => {
      const [updatedDeck, cardPickedUp] = settings.updateDeck()

      if (updatedDeck) {
        socket.broadcast.emit('state:update-deck', updatedDeck)
      }
    })

    socket.on('state:update-board', (cards) => {
      settings.updateBoard(cards)
      socket.broadcast.emit('state:update-board', cards)
    })

    socket.on('data:move-details', (description, player) => {
      settings.storeMoveDetails(description, player)
      socket.broadcast.emit('data:move-details', description, player)
    })

    socket.on('data:store-hand', (sessionId, hand) => {
      const user = users.getBySessionId(sessionId)
      users.storeHand(user, hand)
    })
  })
}
