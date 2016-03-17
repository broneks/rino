import {PLAYER_TYPE} from '../shared/constants'
import users from '../server/users'

describe('-- users - server --', () => {
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

    it('should add and return a user object with correct properties', () => {
      let id = 123

      let user = users.add(id, sessionId)
      let expected = {
        sessionId,
        id: 123,
        playerType: PLAYER_TYPE.killer,
        disconnected: false,
        removed: false
      }

      expect(users.exists(sessionId)).toBeTruthy()
      expect(user).toEqual(expected)
    })

    it("should first add a playerType 'killer' and then an 'inspector'", () => {
      let killer = users.add(234, 1)
      let inspector = users.add(345, 2)
      let c = users.add(456, 3)

      expect(killer.playerType).toEqual(PLAYER_TYPE.killer)
      expect(inspector.playerType).toEqual(PLAYER_TYPE.inspector)
    })

    it("should add a playerType 'killer' if one is not already assigned", () => {
      users._setUsers([
        {
          id: 123,
          sessionId: 1,
          playerType: PLAYER_TYPE.inspector,
          disconnected: false,
          removed: false
        }
      ])

      let newUser = users.add(234, 2)

      expect(newUser.playerType).toEqual(PLAYER_TYPE.killer)
    })
  })

  describe('killerIsAssigned', () => {
    it('should return false', () => {
      expect(users.killerIsAssigned()).toBeFalsy()
    })

    it('should return true', () => {
      users.add(123, 1)

      expect(users.killerIsAssigned()).toBeTruthy()
    })
  })

  describe('getBySessionId', () => {
    it('should return a user', () => {
      let id = 123
      let sessionId = 1

      let expected = {
        id,
        sessionId,
        playerType: PLAYER_TYPE.killer,
        disconnected: false,
        removed: false
      }

      users.add(id, sessionId)

      expect(users.getBySessionId(sessionId)).toEqual(expected)
    })

    it('should return null', () => {
      expect(users.getBySessionId()).toBeNull()

      users.add(123, 1)

      expect(users.getBySessionId(2)).toBeNull()
    })
  })

  describe('getOpponent', () => {
    it('should return the opponent player object', () => {
      let sessionId = 1
      let player = users.add(123, sessionId)
      let opponent = users.add(234, 2)

      expect(users.getOpponent(sessionId)).toEqual(opponent)
    })

    it('should return null', () => {
      expect(users.getOpponent()).toBeNull()

      users.add(123, 1)

      expect(users.getOpponent()).toBeNull()
    })
  })

  describe('join', () => {
    let user
    let user2

    beforeEach(() => {
      user = {
        id: 1,
        sessionId: 2,
        playerType: PLAYER_TYPE.killer,
        disconnected: false,
        removed: false
      }
      user2 = {
        id: 2,
        sessionId: 3,
        playerType: PLAYER_TYPE.inspector,
        disconnected: false,
        removed: false
      }

      users._setUsers([user])
    })

    it('should return a promise', () => {
      expect(users.join(1, 2)).toEqual(jasmine.any(Promise))
    })

    it('should resolve with an object that has user and isNewUser', (done) => {
      users.join(1, 2)
        .then((res) => {
          expect(res).toBeDefined()
          expect(res.hasOwnProperty('user')).toBeTruthy()
          expect(res.hasOwnProperty('isNewUser')).toBeTruthy()
        })
        .then(done)
    })

    it('should resolve and return an existing user', (done) => {
      users.join(1, 2)
        .then((res) => {
          expect(res.user).toEqual(user)
          expect(res.isNewUser).toBeFalsy()
        })
        .then(done)
    })

    it('should set disconnected property to false when returning an existing user', (done) => {
      user.disconnected = true

      users.join(1, 2)
        .then((res) => {
          expect(res.user.disconnected).toBeFalsy()
        })
        .then(done)
    })

    it('should resolve and return a new user', (done) => {
      users.join(2, 3)
        .then((res) => {
          expect(res.user).not.toEqual(user)
          expect(res.isNewUser).toBeTruthy()
        })
        .then(done)
    })

    it('should reject if user does not exist and max has been reached', (done) => {
      users._setUsers([user, user2])

      users.join(3, 4)
        .then(done.fail)
        .catch(done)
    })
  })

  describe('disconnect', () => {
    let user

    beforeEach(() => {
      user = {
        id: 1,
        sessionId: 2,
        playerType: PLAYER_TYPE.killer,
        disconnected: true,
        removed: false
      }

      users._setUsers([user])
    })

    it('should return a promise', () => {
      expect(users.disconnect(user, 0)).toEqual(jasmine.any(Promise))
    })

    it('should resolve and remove the user', (done) => {
      users.disconnect(user, 0)
        .then(() => {
          expect(users.exists(user.sessionId)).toBeFalsy()
        })
        .then(done)
    })

    it('should reject if a user has reconnected after the disconnect timeout started', (done) => {
      let delay = 10

      setInterval(() => user.disconnected = false, delay / 2)

      users.disconnect(user, delay)
        .then(done.fail)
        .catch(() => {
          expect(users.exists(user.sessionId)).toBeTruthy()
        })
        .then(done)
    })

    it('should reject if user has removed property set to true', (done) => {
      user.removed = true

      users.disconnect(user)
        .then(done.fail)
        .catch(done)
    })
  })

  describe('removeDisconnected', () => {
    it('should remove players that have a truthy disconnected property', () => {
      let p1 = users.add(123, 1)
      let p2 = users.add(234, 2)
      let p3 = users.add(345, 3)

      p2.disconnected = true
      users.removeDisconnected()

      expect(users.exists(2)).toBeFalsy()
      expect(users.exists(1)).toBeTruthy()
      expect(users.exists(3)).toBeTruthy()
    })
  })
})
