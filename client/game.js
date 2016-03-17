import state from './state'

import Board from './classes/Board'
import Deck from './classes/Deck'

export default {
  startClassName: 'game-on-good-luck',

  init (settings) {
    if (!settings ||
        !settings.startTime ||
        !settings.cardNames) {
      throw Error('Could not initialize game. Missing game settings.')
    }

    state.setBoard(new Board(settings.cardNames.suspect))
    state.setDeck(new Deck(settings.cardNames.evidence))
    state.setClock(settings.startTime)
    state.setTurn(settings.turn)

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
