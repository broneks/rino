'use strict'

const constants = require('../shared/constants')

let users = []

module.exports = {
  max: 2,

  maxReached () {
    return users.length === this.max
  },

  exists (sessionId) {
    return !!users.length && users.map(user => user.sessionId).indexOf(sessionId) > -1
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
    users.push(user)

    return user
  },

  killerIsAssigned () {
    return users.length && (users.map(user => user.playerType).indexOf('killer') > -1)
  },

  getBySessionId (sessionId) {
    return users.length
      ? users.filter(user => user.sessionId === sessionId)[0]
      : null
  },

  getOpponent (sessionId) {
    if (!this.maxReached()) return null

    return users.filter(user => user.sessionId !== sessionId)[0]
  },

  removeDisconnected () {
    if (!users.length) return

    users.forEach((user, index) => {
      if (user.disconnected) {
        user.removed = true
        users.splice(index, 1)
      }
    })
  }
}
