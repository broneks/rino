const util = require('../../shared/util')
const constants = require('../../shared/constants')

const Card = require('./base/Card')

let internal = util.privateMap()

class SuspectCard extends Card {
  constructor (name) {
    super(constants.CARD_TYPE.suspect, name)

    internal(this).isDeceased = false
    internal(this).isExonerated = false
    internal(this).isArrested = false
  }

  isExonerated () {
    return internal(this).isExonerated
  }

  isDeceased () {
    return internal(this).isDeceased
  }

  isArrested () {
    return internal(this).isArrested
  }

  exonerate () {
    if (!internal(this).isDeceased) internal(this).isExonerated = true
  }

  kill () {
    if (!internal(this).isDeceased) internal(this).isDeceased = true
  }

  arrest () {
    if (!internal(this).isDeceased && !internal(this).isExonerated) {
      internal(this).isArrested = true
    }

    // TODO
  }

  setOutOfPlay () {
    super.setOutOfPlay()
  }
}

module.exports = SuspectCard
