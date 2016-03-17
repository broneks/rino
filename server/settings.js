import constants from '../shared/constants'
import {shuffle} from '../shared/util'

let settings = null

export default {
  get () {
    return settings
  },

  reset () {
    settings = null
  },

  init () {
    if (!settings) {
      settings = {
        startTime: Date.now(),
        cardNames: {
          suspect: shuffle(constants.CARD_NAMES),
          evidence: shuffle(constants.CARD_NAMES)
        },
        turn: {
          number: 1,
          player: constants.PLAYER_TYPE.killer
        }
      }
    }

    return settings
  },

  nextTurn () {
    if (!settings) return

    settings.turn.number += 1
    settings.turn.player = settings.turn.number % 2 === 0
      ? constants.PLAYER_TYPE.inspector
      : constants.PLAYER_TYPE.killer

    return settings.turn
  },

  updateDeck () {
    if (!settings && settings.cardNames.evidence.length) return

    settings.cardNames.evidence.pop()

    return settings.cardNames.evidence
  }
}
