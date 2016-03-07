'use strict'

const constants = require('../shared/constants')
const util = require('../shared/util')

let gameSettings = null
let turn = null

module.exports = {
  reset () {
    gameSettings = null
    turn = null
  },

  init () {
    if (!gameSettings) {
      turn = {
        player: constants.PLAYER_TYPE.killer,
        number: 1
      }

      gameSettings = {
        turn,
        startTime: Date.now(),
        suspectCardNames: util.shuffle(constants.CARD_NAMES),
        evidenceCardNames: util.shuffle(constants.CARD_NAMES)
      }
    }
  },

  getSettings () {
    return gameSettings
  },

  nextTurn () {
    // TODO

    // turn.number += 1
    // turn.player = turn.number % 2 === 0
    //   ? constants.PLAYER_TYPE.inspector
    //   : constants.PLAYER_TYPE.killer
  }
}
