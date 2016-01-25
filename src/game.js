const constants = require('./constants')
const util = require('./util')

const gameState = require('./gameState')

const SuspectCard = require('./classes/SuspectCard')
const EvidenceCard = require('./classes/EvidenceCard')
const Killer = require('./classes/Killer')
const Inspector = require('./classes/Inspector')
const Board = require('./classes/Board')
// const Deck = require('./classes/Deck')

const game = (() => {
  return {
    init () {
      this.initCards()
      this.initPlayers()

      this.start()
    },

    initCards () {
      let cardNames = util.shuffle(constants.CARD_NAMES)

      let suspectCards = util.chunk(cardNames).map(row => {
        return row.map(name => {
          return new SuspectCard(name)
        })
      })

      let evidenceCards = util.shuffle(cardNames).map(name => new EvidenceCard(name))

      gameState.setBoard(new Board(suspectCards))
      gameState.setDeck(evidenceCards) // TODO: new Deck()
    },

    initPlayers () {
      gameState.setKiller(new Killer())
      gameState.setInspector(new Inspector())
    },

    start () {
      // TODO

      gameState.nextTurn()
    }
  }
})()

module.exports = game
