const React = require('react')
const ReactDOM = require('react-dom')

const util = require('../../shared/util')
const gameState = require('../gameState')
const DOM = require('../DOM')

const EvidenceCard = require('./EvidenceCard')
const DeckDisplay = require('../components/DeckDisplay')

let internal = util.privateMap()
let instance = null

class Deck {
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
    let player = gameState.getPlayer()

    if (!gameState.isPlayersTurn() || !player.canPickUp()) return

    let card = internal(this).cards.pop()

    player.pickUp(card)
    gameState.cardPickedUp()

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
