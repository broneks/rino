
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

    getWhoseTurnToPlay () {
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
