let instance = null

class Board {
  constructor () {
    this.time = new Date()

    // singleton
    if (!instance) instance = this
    return instance
  }
}

module.exports = Board
