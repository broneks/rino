import mock from './support/mock'

import DOM from '../client/DOM'
import {PLAYER_TYPE} from '../shared/constants'
import state from '../client/state'

import Killer from '../client/classes/Killer'
import Inspector from '../client/classes/Inspector'

describe('-- state - client --', () => {
  let stateObj

  mock.basicDOM()

  beforeEach(() => {
    stateObj = {
      user: null,
      player: null,
      playerType: null,
      clockInterval: null,
      cards: {},
      turn: {}
    }

    state._setState(stateObj)
  })

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

  describe('setBoard', () => {
    it('should set the board', () => {
      let board = {name: 'board'}

      state.setBoard(board)

      expect(state.getBoard()).toBe(board)
    })
  })

  describe('setDeck', () => {
    it('should set the deck', () => {
      let deck = {name: 'deck'}

      state.setDeck(deck)

      expect(state.getDeck()).toBe(deck)
    })
  })

  describe('setPlayer', () => {
    it('should set player as killer', () => {
      state.setPlayer(PLAYER_TYPE.killer, Killer, Inspector)

      expect(state.getPlayer().constructor).toBe(Killer)
      expect(state.getPlayerType()).toEqual(PLAYER_TYPE.killer)
    })

    it('should set player as inspector', () => {
      state.setPlayer(PLAYER_TYPE.inspector, Killer, Inspector)

      expect(state.getPlayer().constructor).toBe(Inspector)
      expect(state.getPlayerType()).toEqual(PLAYER_TYPE.inspector)
    })

    it('should throw an error because invalid player type was passed in', () => {
      expect(state.setPlayer.bind(null, 'postman', Killer, Inspector)).toThrowError(/Could not create player/)
    })

    it('should throw an error because player constructor was not provided', () => {
      expect(state.setPlayer.bind(null, PLAYER_TYPE.killer, Killer)).toThrowError(/Could not create player/)
    })
  })

  describe('setUser', () => {
    it('should set the user and add a class to the body element', () => {
      let user = {
        playerType: PLAYER_TYPE.inspector
      }

      state.setUser(user)

      expect(state.getUser()).toBe(user)
      expect(document.body.classList.contains(`is-${ user.playerType }`)).toBeTruthy()
    })
  })

  xdescribe('setClock', () => {

  })

  xdescribe('setTurn', () => {
    let turn

    beforeEach(() => {
      turn = {
        number: 1,
        player: PLAYER_TYPE.killer
      }
    })

    it('should add a class to the body if it is players turn', () => {
      state._setState({
        turn,
        playerType: PLAYER_TYPE.killer
      })

      console.log(document.body.classList)
      console.log(document.getElementById(DOM.turn))
    })
  })

  describe('reset', () => {
    it('should reset cards and turn', () => {
      stateObj.cards = {suspect: 1, evidence: 2}
      stateObj.turn = {number: 1, playerType: PLAYER_TYPE.killer}
      state._setState(stateObj)

      state.reset()

      let resetState = state._getState()

      expect(resetState.cards).toEqual({})
      expect(resetState.turn).toEqual({})
    })

    it('should remove all DOM children from target elements', () => {
      Object.keys(DOM).forEach((key) => {
        expect(document.getElementById(DOM[key]).children.length).toEqual(0)
      })
    })
  })
})
