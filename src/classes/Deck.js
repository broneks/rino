const React = require('react')
const ReactDOM = require('react-dom')

const util = require('../util')
const gameState = require('../gameState')
const constants = require('../constants')

const DeckDisplay = require('../components/DeckDisplay')

let internal = util.privateMap()
let instance = null

class Deck {
  constructor (evidenceCards) {
    internal(this).cards = evidenceCards

    this.render()

    // singleton
    if (!instance) instance = this
    return instance
  }

  cardClick (event) {
    let player = gameState.getCurrentPlayer()

    if (!player.canPickUp()) return

    let card = internal(this).cards.pop()

    player.pickUp(card)

    this.render()
  }

  render () {
    ReactDOM.render(
      <DeckDisplay
        cards={internal(this).cards}
        cardClick={this.cardClick.bind(this)} />,
      constants.DOM.deck
    )
  }
}

module.exports = Deck
