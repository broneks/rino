const constants = require('../../shared/constants')

const Player = require('./base/Player')

let instance = null

class Inspector extends Player {
  constructor () {
    super(constants.PLAYER_TYPE.inspector, 4)

    // singleton
    if (!instance) instance = this
    return instance
  }

  arrest (suspect) {
    if (suspect) suspect.arrest()
  }

  exonerate (suspect) {
    if (suspect) suspect.exonerate()

    // TODO
  }
}

module.exports = Inspector
