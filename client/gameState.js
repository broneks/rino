const util = require('../shared/util')
const DOM = require('./DOM')

const Killer = require('./classes/Killer')
const Inspector = require('./classes/Inspector')

let _user = null
let _opponent = null
let _player = null
let _cards = {}
// let _turn = 0

const gameState = {
  getBoard () {
    return _cards.board
  },

  getDeck () {
    return _cards.deck
  },

  getPlayer () {
    return _player
  },

  getUser () {
    return _user
  },

  getOpponent () {
    return _opponent
  },

  setBoard (newBoard) {
    _cards.board = newBoard
  },

  setDeck (newDeck) {
    _cards.deck = newDeck
  },

  setPlayer (playerType) {
    if (_player) return

    switch (playerType) {
      case 'killer':
        _player = new Killer()
        break
      case 'inspector':
        _player = new Inspector()
        break
      default:
        throw Error('Could not create player.')
    }
  },

  setUser (user) {
    if (_user) return

    document.body.classList.add(`is-${ user.playerType }`)

    _user = user
  },

  setOpponent (opponent) {
    if (_opponent) return

    _opponent = opponent
  },

  setMoveDetails (description) {
    if (!description) return

    let moveDetails = {
      description,
      player: this.getPlayer().getType()
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

  nextTurn () {
    // TODO
  },

  reset () {
    _opponent = null
    _cards = {}
    // _turn = 0

    Object.keys(DOM).forEach((key) => {
      util.removeChildren(DOM[key])
    })
  }
}

module.exports = gameState
