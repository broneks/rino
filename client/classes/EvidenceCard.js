import {privateMap} from '../../shared/util'
import {CARD_TYPE, PLAYER_TYPE} from '../../shared/constants'

import Card from './base/Card'

let internal = privateMap()

export default class EvidenceCard extends Card {
  constructor (name) {
    super(CARD_TYPE.evidence, name)

    internal(this).isInHand = false
    internal(this).isIdentity = false
  }

  getProperties () {
    return {
      name: this.getName(),
      isInHand: internal(this).isInHand,
      isIdentity: internal(this).isIdentity
    }
  }

  pickUp (player) {
    internal(this).isInHand = player.getType()

    if (player.getType() === PLAYER_TYPE.killer) {
      internal(this).isIdentity = true
      player.setIdentityCard(this)
    }
  }

  exonerateSuspect (suspectCard) {
    if (internal(this).isInHand === PLAYER_TYPE.killer) return

    suspectCard.exonerate()
    this.setOutOfPlay()
  }

  setOutOfPlay () {
    internal(this).isInHand = false
    internal(this).isIdentity = false
    super.setOutOfPlay()
  }
}
