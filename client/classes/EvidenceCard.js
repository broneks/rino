import {privateMap} from '../../shared/util'
import {CARD_TYPE, PLAYER_TYPE} from '../../shared/constants'

import Card from './base/Card'

let internal = privateMap()

export default class EvidenceCard extends Card {
  constructor (name, isInHand = false, isIdentity = false) {
    super(CARD_TYPE.evidence, name)

    internal(this).isInHand = isInHand
    internal(this).isIdentity = isIdentity
  }

  getProperties () {
    return {
      name: this.getName(),
      isInHand: internal(this).isInHand,
      isIdentity: internal(this).isIdentity
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

  setInHand (playerType = false) {
    internal(this).isInHand = playerType

    // if (player.getType() === PLAYER_TYPE.killer) {
    //   internal(this).isIdentity = true
    //   player.setIdentityCard(this)
    // }
  }
}
