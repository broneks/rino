let instance = null

class Deck {
  constructor () {
    // pass

    // singleton
    if (!instance) instance = this
    return instance
  }
}

module.exports = Deck
