const constants = require('./constants');
const util = require('./util');

const SuspectCard = require('./classes/SuspectCard');
const EvidenceCard = require('./classes/EvidenceCard');
const Board = require('./classes/Board');
const Deck = require('./classes/Deck');

const game = (() => {
  let _players = {};
  let _cards = {};
  let _turn = 1;

  return {
    init() {
      this.initCards();
    },

    initCards() {
      let cardNames = util.shuffle(constants.CARD_NAMES);

      let suspectCards = util.chunk(cardNames).map((row, rowIndex) => {
        return row.map((name, nameIndex) => {
          return new SuspectCard(name, rowIndex, nameIndex);
        });
      });

      let evidenceCards = util.shuffle(cardNames).map((name) => new EvidenceCard(name));

      _cards.board = suspectCards; // TODO: new Board()
      _cards.deck = evidenceCards; // TODO: new Deck()
    },

    start() {

    }
  };
})();

module.exports = game;
