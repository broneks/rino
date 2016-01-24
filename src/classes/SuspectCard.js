const constants = require('../constants');

const Card = require('./base/Card');
const Position = require('./base/Position');

class SuspectCard extends Card {
  constructor(name, x, y) {
    super(constants.CARD_TYPE.suspect, name);

    this._position = new Position(x, y);
    this._isDeceased = false;
    this._isExonerated = false;
  }

  getPosition() {
    return this._position;
  }

  isExonerated() {
    return this._isExonerated;
  }

  isDeceased() {
    return this._isDeceased;
  }

  exonerate() {
    this._isExonerated = true;
  }

  kill() {
    this._isDeceased = true;
  }

  setPosition(x, y) {
    this._position = this._position.set(x, y);
  }

  setOutOfPlay() {
    this._pos = null;
    super.setOutOfPlay();
  }
}

module.exports = SuspectCard;
