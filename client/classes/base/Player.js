import {privateMap} from '../../../shared/util'
import PlayerHand from './PlayerHand'

let internal = privateMap()

export default class Player {
  constructor (type, handMax, hand) {
    internal(this).type = type
    internal(this).identityCard = null
    internal(this).hand = new PlayerHand(handMax, hand)
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
    evidenceCard.setInHand(this.getType())
  }

  setHand (hand) {
    internal(this).hand.setHand(hand)
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
