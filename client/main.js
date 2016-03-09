const socket = io()

const util = require('../shared/util')
const gameState = require('./gameState')
const game = require('./game')

const sessionId = window.sessionStorage.getItem('rinoUID') || util.generateUID()
window.sessionStorage.setItem('rinoUID', sessionId)

socket.emit('join', sessionId)

socket.on('get-user', (user) => {
  console.log('get-user: ', user)
  gameState.setUser(user)
  gameState.setPlayer(user.playerType)
})

socket.on('get-opponent', (opponent) => {
  console.log('get-opponent: ', opponent)
  gameState.setOpponent(opponent)
})

socket.on('player-connected', (opponent) => {
  console.log('player-connected: ', opponent)
  gameState.setOpponent(opponent)
})

socket.on('player-disconnected', () => {
  console.log('player disconnected')
  game.reset()
})

socket.on('game-init', (gameSettings) => {
  console.log('game-init')
  game.init(gameSettings)
})
