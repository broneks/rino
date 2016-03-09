const React = require('react')
const ReactDOM = require('react-dom')

const HandDisplay = require('../../components/HandDisplay')
const util = require('../../../shared/util')
const DOM = require('../../DOM')

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
    if (this.canPickUp()) {
      internal(this).hand.push(evidenceCard)
      this.render()
    }
  }

  render () {
    ReactDOM.render(
      <HandDisplay
        hand={internal(this).hand} />,
      DOM.hand
    )
  }
}

module.exports = PlayerHand
