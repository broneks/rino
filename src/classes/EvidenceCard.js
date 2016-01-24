const constants = require('../constants');

const Card = require('./base/Card');

class EvidenceCard extends Card {
  constructor(name) {
    super(constants.CARD_TYPE.evidence, name);

    this._isInHand = false;
    this._isIdentity = false;
  }

  pickUp(player) {
    this._isInHand = player.getType();

    if (player.getType() === constants.PLAYER_TYPE.killer) {
      this._isIdentity = true;
      player.setIdentityCard(this);
    }
  }

  exonerateSuspect(suspectCard) {
    if (this._isInHand === constants.PLAYER_TYPE.killer) return;

    suspectCard.exonerate();
    this.setOutOfPlay();
  }

  setOutOfPlay() {
    this._isInHand = false;
    this._isIdentity = false;
    super.setOutOfPlay();
  }
}

module.exports = EvidenceCard;
