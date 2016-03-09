const util = require('../../../shared/util')

const PlayerHand = require('./PlayerHand')

let internal = util.privateMap()

class Player {
  constructor (type, handMax) {
    internal(this).type = type
    internal(this).identityCard = null
    internal(this).hand = new PlayerHand(handMax)
  }

  getType () {
    return internal(this).type
  }

  getIdentityCard () {
    return internal(this).identityCard
  }

  canPickUp () {
    return internal(this).hand.canPickUp()
  }

  pickUp (evidenceCard) {
    internal(this).hand.addCard(evidenceCard)
  }

  setIdentityCard (evidenceCard) {
    let previousIdentity = this.getIdentityCard()

    if (previousIdentity) {
      previousIdentity.setOutOfPlay()
    }

    internal(this).identityCard = evidenceCard
  }

  // shiftCards (row, column, direction) {
  //   // pass
  // }
}

module.exports = Player
