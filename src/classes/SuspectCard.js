const constants = require('../constants')

const Card = require('./base/Card')

class SuspectCard extends Card {
  constructor (name) {
    super(constants.CARD_TYPE.suspect, name)

    this._isDeceased = false
    this._isExonerated = false
    this._isArrested = false
  }

  isExonerated () {
    return this._isExonerated
  }

  isDeceased () {
    return this._isDeceased
  }

  isArrested () {
    return this._isArrested
  }

  exonerate () {
    if (!this._isDeceased) this._isExonerated = true
  }

  kill () {
    if (!this._isDeceased) this._isDeceased = true
  }

  arrest () {
    if (!this._isDeceased && !this._isExonerated) this._isArrested = true

    // TODO
  }

  setOutOfPlay () {
    this._pos = null
    super.setOutOfPlay()
  }
}

module.exports = SuspectCard
