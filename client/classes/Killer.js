import {PLAYER_TYPE} from '../../shared/constants'

import Player from './base/Player'

let instance = null

export default class Killer extends Player {
  constructor (hand) {
    super(PLAYER_TYPE.killer, 1, hand)

    // singleton
    if (!instance) instance = this
    return instance
  }

  kill (suspect) {
    if (suspect) suspect.kill()
  }

  disguiseIdentity () {
    // pass
  }
}
