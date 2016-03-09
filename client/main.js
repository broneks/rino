const socket = io()

const util = require('../shared/util')
const gameState = require('./gameState')
const game = require('./game')

const sessionId = window.sessionStorage.getItem('rinoUID') || util.generateUID()
window.sessionStorage.setItem('rinoUID', sessionId)

socket.emit('event:join', sessionId)

socket.on('event:player-connected', (opponent) => {
  if (ENV.debug) console.log('event:player-connected: \n\t', opponent)

  gameState.setOpponent(opponent)
})

socket.on('event:player-disconnected', () => {
  if (ENV.debug) console.log('event:player disconnected')

  game.reset()
})

socket.on('data:get-user', (user) => {
  if (ENV.debug) console.log('data:get-user: \n\t', user)

  gameState.setUser(user)
  gameState.setPlayer(user.playerType)
})

socket.on('data:get-opponent', (opponent) => {
  if (ENV.debug) console.log('data:get-opponent: \n\t', opponent)

  gameState.setOpponent(opponent)
})

socket.on('data:game-init', (gameSettings) => {
  if (ENV.debug) console.log('data:game-init: \n\t', gameSettings)

  game.init(gameSettings)
})
