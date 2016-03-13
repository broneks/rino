import React from 'react'
import {render as ReactRender} from 'react-dom'

import {privateMap} from '../../shared/util'
import DOM from '../DOM'
import state from '../state'

import EvidenceCard from './EvidenceCard'
import DeckDisplay from '../components/DeckDisplay'

let internal = privateMap()
let instance = null

export default class Deck {
  constructor (cardNames) {
    this.setCards(cardNames)

    // singleton
    if (!instance) instance = this
    return instance
  }

  setCards (cardNames) {
    internal(this).cards = cardNames.map(name => new EvidenceCard(name))

    this.render()
  }

  cardClick (event) {
    let player = state.getPlayer()

    if (!state.isPlayersTurn() || !player.canPickUp()) return

    let card = internal(this).cards.pop()

    player.pickUp(card)
    state.cardPickedUp()

    this.render()
  }

  render () {
    ReactRender(
      <DeckDisplay
        cards={internal(this).cards}
        cardClick={this.cardClick.bind(this)} />,
      DOM.deck
    )
  }
}