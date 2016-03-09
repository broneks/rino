'use strict'

const constants = require('../shared/constants')

let _users = []

module.exports = {
  max: 2,

  maxReached () {
    return _users.length === this.max
  },

  exists (sessionId) {
    return !!_users.length && _users.map(user => user.sessionId).indexOf(sessionId) > -1
  },

  add (id, sessionId) {
    let user
    let playerType

    if (this.killerIsAssigned()) {
      playerType = constants.PLAYER_TYPE.inspector
    } else {
      playerType = constants.PLAYER_TYPE.killer
    }
    user = {
      id,
      sessionId,
      playerType,
      disconnected: false,
      removed: false
    }
    _users.push(user)

    return user
  },

  killerIsAssigned () {
    return _users.length && (_users.map(user => user.playerType).indexOf('killer') > -1)
  },

  getBySessionId (sessionId) {
    return _users.length
      ? _users.filter(user => user.sessionId === sessionId)[0]
      : null
  },

  getOpponent (sessionId) {
    if (!this.maxReached()) return null

    return _users.filter(user => user.sessionId !== sessionId)[0]
  },

  removeDisconnected () {
    if (!_users.length) return

    _users.forEach((user, index) => {
      if (user.disconnected) {
        user.removed = true
        _users.splice(index, 1)
      }
    })
  }
}
