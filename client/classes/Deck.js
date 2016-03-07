const React = require('react')
const ReactDOM = require('react-dom')

const util = require('../../shared/util')
const gameState = require('../gameState')
const DOM = require('../DOM')

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
    let player = gameState.getPlayer()

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
      DOM.deck
    )
  }
}

module.exports = Deck
