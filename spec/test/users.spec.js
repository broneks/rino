import users from '../../server/users'

describe('-- users --', () => {
  beforeEach(() => {
    users._setUsers([])
  })

  describe('maxReached', () => {
    let max

    beforeEach(() => {
      max = 2
    })

    it('should return true', () => {
      users._setUsers([{}, {}])
      expect(users.maxReached()).toBeTruthy()
    })

    it('should return false', () => {
      expect(users.maxReached()).toBeFalsy()
    })
  })

  describe('exists', () => {
    let sessionId

    beforeEach(() => {
      sessionId = 1
      users._setUsers([
        { sessionId }
      ])
    })

    it('should return true', () => {
      expect(users.exists(sessionId)).toBeTruthy()
    })

    it('should return false', () => {
      expect(users.exists(2)).toBeFalsy()
    })
  })

  describe('add', () => {
    let sessionId

    beforeEach(() => {
      sessionId = 1
    })

    it('should add a user object with correct properties', () => {
      let id = 123

      let user = users.add(id, sessionId)

      expect(users.exists(sessionId)).toBeTruthy()

      expect(user.hasOwnProperty('id')).toBeTruthy()
      expect(user.hasOwnProperty('sessionId')).toBeTruthy()
      expect(user.hasOwnProperty('playerType')).toBeTruthy()
      expect(user.hasOwnProperty('disconnected')).toBeTruthy()
      expect(user.hasOwnProperty('removed')).toBeTruthy()

      expect(user.id).toEqual(id)
      expect(user.sessionId).toEqual(sessionId)
      expect(user.playerType).toEqual('killer')
      expect(user.disconnected).toBeFalsy()
      expect(user.removed).toBeFalsy()
    })
  })
})
