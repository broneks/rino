const util = require('../shared/util')

const gameState = require('./gameState')

const SuspectCard = require('./classes/SuspectCard')
const EvidenceCard = require('./classes/EvidenceCard')
const Board = require('./classes/Board')
const Deck = require('./classes/Deck')

const game = {
  startClassName: 'game-on-good-luck',

  init (gameSettings) {
    if (!gameSettings ||
        !gameSettings.suspectCardNames ||
        !gameSettings.evidenceCardNames) {
      throw Error('could not initialize game.')
    }

    const suspectCards = util.chunk(gameSettings.suspectCardNames, 5).map(row => {
      return row.map(name => {
        return new SuspectCard(name)
      })
    })
    const evidenceCards = gameSettings.evidenceCardNames.map(name => new EvidenceCard(name))

    gameState.setBoard(new Board(suspectCards))
    gameState.setDeck(new Deck(evidenceCards))

    this.start()
  },

  start () {
    document.body.classList.add(this.startClassName)

    // TODO
    console.log(gameState.getBoard())
    console.log(gameState.getDeck())
  },

  reset () {
    console.log('reset')
    document.body.classList.remove(this.startClassName)
    gameState.reset()
  }
}

module.exports = game
