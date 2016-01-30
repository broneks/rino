class Card {
  constructor (type, name) {
    this._type = type
    this._name = name
    this._isOutOfPlay = false
  }

  getType () {
    return this._type
  }

  getName () {
    return this._name
  }

  setOutOfPlay () {
    this._isOutOfPlay = true
  }
}

module.exports = Card
