import React from 'react'
import {render as ReactRender} from 'react-dom'

import {privateMap} from '../../../shared/util'
import DOM from '../../DOM'
import state from '../../state'

import HandDisplay from '../../components/HandDisplay'

let internal = privateMap()

export default class PlayerHand {
  constructor (maxCards) {
    internal(this).maxCards = maxCards
    internal(this).DOMhand = document.getElementById(DOM.hand)

    this.setHand([])

    this.render()
  }

  setHand (hand) {
    internal(this).hand = hand
  }

  canPickUp () {
    return internal(this).hand.length < internal(this).maxCards
  }

  addCard (evidenceCard) {
    if (this.canPickUp()) {
      internal(this).hand.push(evidenceCard)
      this.render()
      this.postRender()
    }
  }

  postRender () {
    state.storeHand(internal(this).hand.map(card => card.getProperties()))
  }

  render () {
    ReactRender(
      <HandDisplay
        hand={internal(this).hand} />,
      internal(this).DOMhand
    )
  }
}
