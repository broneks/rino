import constants from '../shared/constants'
import settings from '../server/settings'

describe('-- settings - server --', () => {
  describe('init', () => {
    it('should create a game settings object', () => {
      expect(settings.get()).toBe(null)

      settings.init()
      let gameSettings = settings.get()

      expect(gameSettings).toEqual(jasmine.any(Object))
      expect(gameSettings.timestamp).toEqual(jasmine.any(Number))
      expect(gameSettings.cards.suspect).toEqual(jasmine.any(Array))
      expect(gameSettings.cards.evidence).toEqual(jasmine.any(Array))
      expect(gameSettings.turn.number).toEqual(1)
      expect(gameSettings.turn.player).toEqual(constants.PLAYER_TYPE.killer)
    })
  })

  describe('nextTurn', () => {
    it('should increment the turn', () => {
      expect(settings.get().turn.number).toEqual(1)
      expect(settings.get().turn.player).toEqual(constants.PLAYER_TYPE.killer)

      let nextTurn = settings.nextTurn()

      expect(settings.get().turn).toEqual(nextTurn)
      expect(nextTurn.number).toEqual(2)
      expect(nextTurn.player).toEqual(constants.PLAYER_TYPE.inspector)
    })
  })

  describe('updateDeck', () => {
    it('should pop off the last item from the evidence cards array', () => {
      let original = settings.get().cards.evidence.slice()
      let shrunken = original.slice().splice(0, original.length - 1)

      settings.updateDeck()

      expect(settings.get().cards.evidence).not.toEqual(original)
      expect(settings.get().cards.evidence).toEqual(shrunken)
    })
  })
})
