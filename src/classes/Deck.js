const React = require('react')
const ReactDOM = require('react-dom')

const gameState = require('../gameState')
const constants = require('../constants')
// const util = require('../util')

const DeckDisplay = require('../components/DeckDisplay')

let instance = null

class Deck {
  constructor (evidenceCards) {
    this._cards = evidenceCards

    this.render()

    // singleton
    if (!instance) instance = this
    return instance
  }

  cardClick (event) {
    let player = gameState.getWhoseTurnToPlay()

    if (!player.canPickUp()) return

    let card = this._cards.pop()

    player.pickUp(card)

    this.render()
  }

  render () {
    ReactDOM.render(
      <DeckDisplay
        cards={this._cards}
        cardClick={this.cardClick.bind(this)} />,
      constants.DOM.deck
    )
  }
}

module.exports = Deck
