import gameState from './gameState'

import Board from './classes/Board'
import Deck from './classes/Deck'

export default {
  startClassName: 'game-on-good-luck',

  init (gameSettings) {
    if (!gameSettings ||
        !gameSettings.startTime ||
        !gameSettings.cardNames) {
      throw Error('could not initialize game. Missing game settings.')
    }

    gameState.setBoard(new Board(gameSettings.cardNames.suspect))
    gameState.setDeck(new Deck(gameSettings.cardNames.evidence))
    gameState.setClock(gameSettings.startTime)
    gameState.setTurn(gameSettings.turn)

    gameState.listen('state:next-turn', gameState.setTurn)
    gameState.listen('state:update-deck', gameState.updateDeck)

    this.start()
  },

  start () {
    document.body.classList.add(this.startClassName)
  },

  reset () {
    document.body.classList.remove(this.startClassName)
    gameState.reset()
  }
}
