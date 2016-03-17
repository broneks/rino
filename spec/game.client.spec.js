import game from '../client/game'

describe('-- game - client --', () => {
  describe('init', () => {
    it('should throw an error if gameSettings is not provided', () => {
      expect(game.init).toThrowError(/Could not initialize game/)
    })
  })

  describe('start', () => {
    it('should add a game start class to the body element', () => {
      game.start()

      expect(document.body.classList.contains(game.startClassName)).toBeTruthy()
    })
  })

  describe('reset', () => {
    it('should remove the game start class from the body element', () => {
      game.start()
      game.reset()

      expect(document.body.classList.contains(game.startClassName)).toBeFalsy()
    })
  })
})
