const PLAYER_TYPE = {
  inspector: 'inspector',
  killer: 'killer'
}

const CARD_TYPE = {
  suspect: 'suspect',
  evidence: 'evidence'
}

const CARD_NAMES = [
  'Alyss', 'Barrin', 'Clive', 'Deidre', 'Ernest',
  'Franklin', 'Geneva', 'Horatio', 'Irma', 'Julian',
  'Kristoph', 'Linus', 'Marion', 'Neil', 'Ophelia',
  'Phoebe', 'Quinton', 'Ryan', 'Simon', 'Trevor',
  'Ulysses', 'Vladimir', 'Wilhelm', 'Yvonne', 'Zachary'
]

const DOM = {
  board: document.getElementById('game-board'),
  deck: document.getElementById('game-deck'),
  moveDetails: document.getElementById('move-details')
}

Object.freeze(PLAYER_TYPE)
Object.freeze(CARD_TYPE)
Object.freeze(DOM)

module.exports = {
  PLAYER_TYPE,
  CARD_TYPE,
  DOM,

  get CARD_NAMES () {
    return CARD_NAMES.slice()
  },

  get NOOP () {
    return function () {}
  }
}
