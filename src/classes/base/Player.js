const util = require('../../util')
const constants = require('../../constants')

let internal = util.privateMap()
// let previousShift = null

class Player {
  constructor (type, handMax) {
    internal(this).isTurnToPlay = false
    internal(this).hasWon = false
    internal(this).type = constants.PLAYER_TYPE[type]
    internal(this).identityCard = null
    internal(this).hand = []
    internal(this).handMax = handMax
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
    return internal(this).hand.length < internal(this).handMax
  }

  pickUp (evidenceCard) {
    if (!this.isTurnToPlay()) return

    internal(this).hand.push(evidenceCard)
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
