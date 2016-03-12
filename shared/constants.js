export const PLAYER_TYPE = {
  inspector: 'inspector',
  killer: 'killer'
}

export const CARD_TYPE = {
  suspect: 'suspect',
  evidence: 'evidence'
}

export const CARD_NAMES = [
  'Alyss', 'Barrin', 'Clive', 'Deidre', 'Ernest',
  'Franklin', 'Geneva', 'Horatio', 'Irma', 'Julian',
  'Kristoph', 'Linus', 'Marion', 'Neil', 'Ophelia',
  'Phoebe', 'Quinton', 'Ryan', 'Simon', 'Trevor',
  'Ulysses', 'Vladimir', 'Wilhelm', 'Yvonne', 'Zachary'
]

export default {
  PLAYER_TYPE,
  CARD_TYPE,

  get CARD_NAMES () {
    return CARD_NAMES.slice()
  },

  get NOOP () {
    return function () {}
  }
}
