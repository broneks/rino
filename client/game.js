import state from './state'

import Board from './classes/Board'
import Deck from './classes/Deck'

export default {
  startClassName: 'game-on-good-luck',

  init (gameSettings) {
    if (!gameSettings ||
        !gameSettings.startTime ||
        !gameSettings.cardNames) {
      throw Error('Could not initialize game. Missing game settings.')
    }

    state.setBoard(new Board(gameSettings.cardNames.suspect))
    state.setDeck(new Deck(gameSettings.cardNames.evidence))
    state.setClock(gameSettings.startTime)
    state.setTurn(gameSettings.turn)

    state.listen('state:next-turn', state.setTurn)
    state.listen('state:update-deck', state.updateDeck)

    this.start()
  },

  start () {
    document.body.classList.add(this.startClassName)
  },

  reset () {
    document.body.classList.remove(this.startClassName)
    state.reset()
  }
}
