import constants from '../shared/constants'
import {shuffle, chunk} from '../shared/util'

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
      let suspectCards = shuffle(constants.CARD_NAMES).map((name) => {
        return {
          name,
          isArrested: false,
          isDeceased: false,
          isExonerated: false
        }
      })

      settings = {
        startTime: Date.now(),
        cards: {
          suspect: chunk(suspectCards, 5),
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
    if (!settings) return

    settings.cards.evidence.pop()

    return settings.cards.evidence
  },

  updateBoard (cards) {
    if (!settings) return

    settings.cards.suspect = cards

    return settings.cards.suspect
  },

  storeMoveDetails (description, player) {
    if (!settings) return

    settings.moveDetails = {
      description,
      player
    }

    return settings.moveDetails
  }
}
