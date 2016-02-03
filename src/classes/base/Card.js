const util = require('../../util')

let internal = util.privateMap()

class Card {
  constructor (type, name) {
    internal(this).type = type
    internal(this).name = name
    internal(this).isOutOfPlay = false
  }

  getType () {
    return internal(this).type
  }

  getName () {
    return internal(this).name
  }

  setOutOfPlay () {
    internal(this).isOutOfPlay = true
  }
}

module.exports = Card
