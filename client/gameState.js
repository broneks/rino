const socket = io()

const constants = require('../shared/constants')
const util = require('../shared/util')
const DOM = require('./DOM')

const Killer = require('./classes/Killer')
const Inspector = require('./classes/Inspector')

let state = {
  user: null,
  opponent: null,
  player: null,
  playerType: null,
  clockInterval: null,
  cards: {},
  turn: {}
}

const gameState = {
  listen (socketEvent, callback) {
    if (!socketEvent || !callback) return

    socket.on(socketEvent, callback)
  },

  endTurn () {
    socket.emit('state:end-turn')
  },

  cardPickedUp () {
    socket.emit('state:card-picked-up')
  },

  getBoard () {
    return state.cards.board
  },

  getDeck () {
    return state.cards.deck
  },

  getPlayer () {
    return state.player
  },

  getPlayerType () {
    return state.playerType
  },

  getUser () {
    return state.user
  },

  getOpponent () {
    return state.opponent
  },

  getTurn () {
    return state.turn
  },

  isPlayersTurn () {
    return state.turn.player === state.playerType
  },

  setBoard (newBoard) {
    state.cards.board = newBoard
  },

  setDeck (newDeck) {
    state.cards.deck = newDeck
  },

  setPlayer (playerType) {
    if (state.player) return

    switch (playerType) {
      case constants.PLAYER_TYPE.killer:
        state.player = new Killer()
        state.playerType = playerType
        break
      case constants.PLAYER_TYPE.inspector:
        state.player = new Inspector()
        state.playerType = playerType
        break
      default:
        throw Error('Could not create player. Invalid player type.')
    }
  },

  setUser (user) {
    if (state.user) return

    document.body.classList.add(`is-${ user.playerType }`)

    state.user = user
  },

  setOpponent (opponent) {
    if (state.opponent) return

    state.opponent = opponent
  },

  setMoveDetails (description) {
    if (!description) return

    let moveDetails = {
      description,
      player: state.playerType
    }

    // returns a function that, when called, renders the move details
    return () => {
      DOM.moveDetails.className = moveDetails.player
      DOM.moveDetails.textContent = `The ${
        util.capitalizeFirstLetter(moveDetails.player)
      } ${
        moveDetails.description
      }`
    }
  },

  setClock (startTime) {
    // TODO
    // let elapsedTime = (Date.now() - startTime)

    // const tick = () => {
    //   elapsedTime += 1
    // }

    // state.clockInterval = window.setInterval(tick, 1000)
  },

  setTurn (turn) {
    state.turn = turn

    if (ENV.debug) {
      console.log(`turn: ${ state.turn.number } - ${ state.turn.player } - ${ gameState.isPlayersTurn() }`)
    }
  },

  updateDeck (cardNames) {
    state.cards.deck.setCards(cardNames)
  },

  reset () {
    window.clearInterval(state.clockInterval)
    state.opponent = null
    state.cards = {}
    state.turn = {}

    Object.keys(DOM).forEach((key) => {
      util.removeChildren(DOM[key])
    })
  }
}

module.exports = gameState
