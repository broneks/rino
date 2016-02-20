const React = require('react')
const ReactDOM = require('react-dom')

const HandDisplay = require('../../components/HandDisplay')
const util = require('../../util')
const constants = require('../../constants')

let internal = util.privateMap()

class PlayerHand {
  constructor (maxCards) {
    internal(this).maxCards = maxCards
    internal(this).hand = []

    this.render()
  }

  canPickUp () {
    return internal(this).hand.length < internal(this).maxCards
  }

  addCard (evidenceCard) {
    if (internal(this).hand.length < internal(this).maxCards) {
      internal(this).hand.push(evidenceCard)
      // keep picking up
    } else {
      // drop card
    }

    this.render()
  }

  render () {
    ReactDOM.render(
      <HandDisplay
        hand={internal(this).hand} />,
      constants.DOM.hand
    )
  }
}

module.exports = PlayerHand
