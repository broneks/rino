import constants from '../../shared/constants'
import game from '../../server/game'

describe('-- game - server --', () => {
  describe('init', () => {
    it('should create a game settings object', () => {
      expect(game.getSettings()).toBe(null)

      game.init()
      let settings = game.getSettings()

      expect(settings).toEqual(jasmine.any(Object))
      expect(settings.startTime).toEqual(jasmine.any(Number))
      expect(settings.cardNames.suspect).toEqual(jasmine.any(Array))
      expect(settings.cardNames.evidence).toEqual(jasmine.any(Array))
      expect(settings.turn.number).toEqual(1)
      expect(settings.turn.player).toEqual(constants.PLAYER_TYPE.killer)
    })
  })

  describe('nextTurn', () => {
    it('should increment the turn', () => {
      expect(game.getSettings().turn.number).toEqual(1)
      expect(game.getSettings().turn.player).toEqual(constants.PLAYER_TYPE.killer)

      let nextTurn = game.nextTurn()

      expect(game.getSettings().turn).toEqual(nextTurn)
      expect(nextTurn.number).toEqual(2)
      expect(nextTurn.player).toEqual(constants.PLAYER_TYPE.inspector)
    })
  })

  describe('updateDeck', () => {
    it('should pop off the last item from the evidence cards array', () => {
      let original = game.getSettings().cardNames.evidence.slice()
      let shrunken = original.slice().splice(0, original.length - 1)

      game.updateDeck()

      expect(game.getSettings().cardNames.evidence).not.toEqual(original)
      expect(game.getSettings().cardNames.evidence).toEqual(shrunken)
    })
  })
})
