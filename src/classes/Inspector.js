const constants = require('../constants');

const Player = require('./base/Player');

let instance = null;

class Inspector extends Player {
  constructor() {
    super(PLAYER_TYPE.inspector, 4);

    // singleton
    if (!instance) instance = this;
    return instance;
  }

  arrest() {
    // pass
  }

  exonerate() {
    // pass
  }
}

module.exports = Inspector;
