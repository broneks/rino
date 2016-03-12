import constants from '../shared/constants'
import {shuffle} from '../shared/util'

let gameSettings = null

export default {
  getSettings () {
    return gameSettings
  },

  reset () {
    gameSettings = null
  },

  init () {
    if (!gameSettings) {
      gameSettings = {
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
  },

  nextTurn () {
    if (!gameSettings) return

    gameSettings.turn.number += 1
    gameSettings.turn.player = gameSettings.turn.number % 2 === 0
      ? constants.PLAYER_TYPE.inspector
      : constants.PLAYER_TYPE.killer

    return gameSettings.turn
  },

  updateDeck () {
    if (!gameSettings && gameSettings.cardNames.evidence.length) return

    gameSettings.cardNames.evidence.pop()

    return gameSettings.cardNames.evidence
  }
}
