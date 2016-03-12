export const PLAYER_TYPE = {
  inspector: 'inspector',
  killer: 'killer'
}

export const CARD_TYPE = {
  suspect: 'suspect',
  evidence: 'evidence'
}

export const CARD_NAMES = [
  'Albin', 'Benjamin', 'Candace', 'Duncan', 'Eleanor',
  'Felix', 'Geneva', 'Hugo', 'Isaac', 'Joan',
  'Karin', 'Lucija', 'Maurice', 'Nico', 'Oskar',
  'Phillip', 'Quinton', 'Rafael', 'Shawna', 'Toby',
  'Ulysses', 'Violet', 'Wyatt', 'Yvonne', 'Zoe'
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
