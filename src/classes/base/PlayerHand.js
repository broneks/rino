const React = require('react')
const ReactDOM = require('react-dom')

const HandDisplay = require('../../components/HandDisplay')
const constants = require('../../constants')

class PlayerHand {

  constructor (maxCards) {
    this._maxCards = maxCards
    this._hand = []

    this.render()
  }

  canPickUp () {
    return this._hand.length < this._maxCards
  }

  addCard (evidenceCard) {
    if (this._hand.length < this._maxCards) {
      this._hand.push(evidenceCard)
      // keep picking up
    } else {
      // drop card
    }

    this.render()
  }

  render () {
    ReactDOM.render(
      <HandDisplay
        hand={this._hand} />,
      constants.DOM.hand
    )
  }
}

module.exports = PlayerHand
