import {PLAYER_TYPE} from '../../shared/constants'

import Player from './base/Player'

let instance = null

export default class Inspector extends Player {
  constructor (hand) {
    super(PLAYER_TYPE.inspector, 4, hand)

    // singleton
    if (!instance) instance = this
    return instance
  }

  arrest (suspect) {
    if (suspect) suspect.arrest()
  }

  exonerate (suspect) {
    if (suspect) suspect.exonerate()

    // TODO
  }
}
