import mock from './support/mock'

import {PLAYER_TYPE} from '../shared/constants'
import state from '../client/state'

import Killer from '../client/classes/Killer'
import Inspector from '../client/classes/Inspector'

describe('-- state - client --', () => {
  mock.basicDOM()

  describe('isPlayersTurn', () => {
    let turn

    beforeEach(() => {
      turn = {
        number: 1,
        player: PLAYER_TYPE.killer
      }
    })

    it('should return true', () => {
      state._setState({
        turn,
        playerType: PLAYER_TYPE.killer
      })

      expect(state.isPlayersTurn()).toBeTruthy()
    })

    it('should return false', () => {
      state._setState({
        turn,
        playerType: PLAYER_TYPE.inspector
      })

      expect(state.isPlayersTurn()).toBeFalsy()
    })
  })

  xdescribe('setBoard', () => {

  })

  xdescribe('setDeck', () => {

  })

  describe('setPlayer', () => {
    it('should set player as killer', () => {
      state.setPlayer(PLAYER_TYPE.killer, Killer, Inspector)
    })
  })

  xdescribe('setUser', () => {

  })

  xdescribe('setOpponent', () => {

  })

  xdescribe('setMoveDetails', () => {

  })

  xdescribe('setClock', () => {

  })

  xdescribe('setTurn', () => {

  })

  xdescribe('updateDeck', () => {

  })

  xdescribe('reset', () => {

  })
})
