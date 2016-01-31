const constants = require('./constants')
const util = require('./util')

const gameState = (() => {
  let _cards = {}
  let _players = {}
  let _turn = 0

  return {
    getBoard () {
      return _cards.board
    },

    getDeck () {
      return _cards.deck
    },

    getInspector () {
      return _players.inspector
    },

    getKiller () {
      return _players.killer
    },

    getCurrentPlayer () {
      if (_turn % 2 === 0) {
        return _players.inspector
      }

      return _players.killer
    },

    setBoard (newBoard) {
      _cards.board = newBoard
    },

    setDeck (newDeck) {
      _cards.deck = newDeck
    },

    setInspector (newInspector) {
      _players.inspector = newInspector
    },

    setKiller (newKiller) {
      _players.killer = newKiller
    },

    setMoveDetails (description) {
      if (!description) return

      let moveDetails = {
        description,
        player: this.getCurrentPlayer().getType()
      }

      // returns a function that, when called, renders the move details
      return () => {
        constants.DOM.moveDetails.className = moveDetails.player
        constants.DOM.moveDetails.textContent = `The ${
          util.capitalizeFirstLetter(moveDetails.player)
        } ${
          moveDetails.description
        }`
      }
    },

    nextTurn () {
      _turn += 1

      if (_turn % 2 === 0) {
        _players.killer.turnIsOver()
        _players.inspector.turnToPlay()
      } else {
        _players.inspector.turnIsOver()
        _players.killer.turnToPlay()
      }
    }
  }
})()

module.exports = gameState
