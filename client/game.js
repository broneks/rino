import state from './state'

import Board from './classes/Board'
import Deck from './classes/Deck'

export default {
  startClassName: 'game-on-good-luck',

  init (settings) {
    if (!settings ||
        !settings.startTime ||
        !settings.cards) {
      throw Error('Could not initialize game. Missing game settings.')
    }

    state.setBoard(new Board(settings.cards.suspect))
    state.setDeck(new Deck(settings.cards.evidence))
    state.setClock(settings.startTime)
    state.setTurn(settings.turn)

    if (settings.moveDetails) {
      state.renderMoveDetails(settings.moveDetails.description, settings.moveDetails.player)
    }

    state.listen('state:next-turn', state.setTurn)
    state.listen('state:update-deck', state.updateDeck)
    state.listen('state:update-board', state.updateBoard)
    state.listen('data:move-details', state.renderMoveDetails)

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
