const util = require('../../../shared/util')

const PlayerHand = require('./PlayerHand')

let internal = util.privateMap()

class Player {
  constructor (type, handMax) {
    internal(this).isTurnToPlay = false
    internal(this).hasWon = false
    internal(this).type = type
    internal(this).identityCard = null
    internal(this).hand = new PlayerHand(handMax)
  }

  isTurnToPlay () {
    return internal(this).isTurnToPlay
  }

  getType () {
    return internal(this).type
  }

  getIdentityCard () {
    return internal(this).identityCard
  }

  turnToPlay () {
    internal(this).isTurnToPlay = true
  }

  turnIsOver () {
    internal(this).isTurnToPlay = false
  }

  hasWon () {
    internal(this).hasWon = true
  }

  canPickUp () {
    return internal(this).hand.canPickUp()
  }

  pickUp (evidenceCard) {
    if (!this.isTurnToPlay()) return

    internal(this).hand.addCard(evidenceCard)
  }

  setIdentityCard (evidenceCard) {
    if (!this.isTurnToPlay()) return

    let previousIdentity = this.getIdentityCard()

    if (previousIdentity) {
      previousIdentity.setOutOfPlay()
    }

    internal(this).identityCard = evidenceCard
  }

  // shiftCards (row, column, direction) {
  //   if (!this.isTurnToPlay()) return
  //
  //   // pass
  // }
}

module.exports = Player
