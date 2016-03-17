import util from '../shared/util'
import state from './state'
import game from './game'

import Killer from './classes/Killer'
import Inspector from './classes/Inspector'

const socket = io()

const sessionId = window.sessionStorage.getItem('rinoUID') || util.generateUID()
window.sessionStorage.setItem('rinoUID', sessionId)

socket.emit('event:join', sessionId)

socket.on('event:player-connected', (opponent) => {
  if (ENV.debug) console.log('event:player-connected: \n\t', opponent)

  state.setOpponent(opponent)
})

socket.on('event:player-disconnected', () => {
  if (ENV.debug) console.log('event:player-disconnected')

  game.reset()
})

socket.on('data:get-user', (user) => {
  if (ENV.debug) console.log('data:get-user: \n\t', user)

  state.setUser(user)
  state.setPlayer(user.playerType, Killer, Inspector)
})

socket.on('data:get-opponent', (opponent) => {
  if (ENV.debug) console.log('data:get-opponent: \n\t', opponent)

  state.setOpponent(opponent)
})

socket.on('data:game-init', (gameSettings) => {
  if (ENV.debug) console.log('data:game-init: \n\t', gameSettings)

  game.init(gameSettings)
})
