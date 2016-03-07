const constants = require('../../shared/constants')

const Player = require('./base/Player')

let instance = null

class Killer extends Player {
  constructor () {
    super(constants.PLAYER_TYPE.killer, 1)

    // singleton
    if (!instance) instance = this
    return instance
  }

  kill (suspect) {
    if (suspect) suspect.kill()
  }

  disguiseIdentity () {
    // pass
  }
}

module.exports = Killer
