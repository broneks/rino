const util = require('../../shared/util')
const constants = require('../../shared/constants')

const Card = require('./base/Card')

let internal = util.privateMap()

class EvidenceCard extends Card {
  constructor (name) {
    super(constants.CARD_TYPE.evidence, name)

    internal(this).isInHand = false
    internal(this).isIdentity = false
  }

  pickUp (player) {
    internal(this).isInHand = player.getType()

    if (player.getType() === constants.PLAYER_TYPE.killer) {
      internal(this).isIdentity = true
      player.setIdentityCard(this)
    }
  }

  exonerateSuspect (suspectCard) {
    if (internal(this).isInHand === constants.PLAYER_TYPE.killer) return

    suspectCard.exonerate()
    this.setOutOfPlay()
  }

  setOutOfPlay () {
    internal(this).isInHand = false
    internal(this).isIdentity = false
    super.setOutOfPlay()
  }
}

module.exports = EvidenceCard
