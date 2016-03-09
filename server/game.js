'use strict'

const constants = require('../shared/constants')
const util = require('../shared/util')

let gameSettings = null

module.exports = {
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
          suspect: util.shuffle(constants.CARD_NAMES),
          evidence: util.shuffle(constants.CARD_NAMES)
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
