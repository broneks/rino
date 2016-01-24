const constants = require('../../constants');

let previousShift = null;

class Player {
  constructor(type, handMax) {
    this._isTurnToPlay = false;
    this._hasWon = false;
    this._type = constants.PLAYER_TYPE[type];
    this._identityCard = null;
    this._hand = [];
    this._handMax = handMax;
  }

  isTurnToPlay() {
    return this._isTurnToPlay;
  }

  getType() {
    return this._type;
  }

  getIdentityCard() {
    return this._identityCard;
  }

  turnToPlay() {
    this._isTurnToPlay = true;
  }

  turnIsOver() {
    this._isTurnToPlay = false;
  }

  hasWon() {
    this._hasWon = true;
  }

  pickUp(evidenceCard) {
    if (!this.isTurnToPlay()) return;

    this._hand.push(evidenceCard);

    if (this._hand.length < this._handMax) {
      // keep picking up
    } else {
      // drop card
    }
  }

  setIdentityCard(evidenceCard) {
    if (!this.isTurnToPlay()) return;

    previousIdentity = this.getIdentityCard();

    if (previousIdentity) {
      previousIdentity.setOutOfPlay();
    }

    this._identityCard = evidenceCard;
  }

  shiftCards(row, column, direction) {
    if (!this.isTurnToPlay()) return;

    // pass
  }
}

module.exports = Player;
