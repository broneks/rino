import {PLAYER_TYPE} from '../shared/constants'

let users = []
let disconnectTimeout = null

export default {
  max: 2,

  maxReached () {
    return users.length === this.max
  },

  exists (sessionId) {
    return !!users.length && users.map(user => user.sessionId).indexOf(sessionId) > -1
  },

  killerIsAssigned () {
    return users.length && (users.map(user => user.playerType).indexOf('killer') > -1)
  },

  getBySessionId (sessionId) {
    return users.length
      ? users.filter(user => user.sessionId === sessionId)[0] || null
      : null
  },

  add (id, sessionId) {
    let user
    let playerType

    if (this.exists(sessionId)) return user

    if (this.killerIsAssigned()) {
      playerType = PLAYER_TYPE.inspector
    } else {
      playerType = PLAYER_TYPE.killer
    }
    user = {
      id,
      sessionId,
      playerType,
      hand: [],
      disconnected: false,
      removed: false
    }
    users.push(user)

    return user
  },

  join (id, sessionId) {
    return new Promise((resolve, reject) => {
      let user

      if (this.exists(sessionId)) {
        user = this.getBySessionId(sessionId)
        user.disconnected = false
        resolve({
          user,
          isNewUser: false
        })
      } else if (!this.maxReached()) {
        user = this.add(id, sessionId)
        resolve({
          user,
          isNewUser: true
        })
      } else {
        reject()
      }
    })
  },

  disconnect (user, delay = 3000) {
    return new Promise((resolve, reject) => {
      if (user.removed) reject()

      user.disconnected = true

      clearTimeout(disconnectTimeout)
      disconnectTimeout = setTimeout(() => {
        if (user.disconnected) {
          this.removeDisconnected()
          resolve()
        } else {
          reject()
        }
      }, delay)
    })
  },

  removeDisconnected () {
    if (!users.length) return

    users.forEach((user, index) => {
      if (user.disconnected) {
        user.removed = true
        users.splice(index, 1)
      }
    })
  },

  storeHand (user, hand) {
    if (!user || !hand) return

    user.hand = hand
  },

  _setUsers (newUsers) {
    users = newUsers
  }
}
