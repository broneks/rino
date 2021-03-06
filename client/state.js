import React from 'react'
import {render as ReactRender} from 'react-dom'

import util from '../shared/util'
import constants from '../shared/constants'
import DOM from './DOM'

import ClockDisplay from './components/ClockDisplay'
import MoveDetailsDisplay from './components/MoveDetailsDisplay'

const socket = io()

let state = {
  user: null,
  player: null,
  playerType: null,
  clockInterval: null,
  cards: {},
  turn: {}
}

export default {
  listen (socketEvent, callback, context = this) {
    if (!socketEvent || !callback) return

    socket.on(socketEvent, callback.bind(context))
  },

  endTurn () {
    socket.emit('state:end-turn')
  },

  cardPickedUp () {
    socket.emit('state:card-picked-up')
  },

  boardChanged (cards) {
    socket.emit('state:update-board', cards)
  },

  storeHand (hand) {
    socket.emit('data:store-hand', state.user.sessionId, hand)
  },

  isPlayersTurn () {
    return state.turn.player === state.playerType
  },

  setBoard (newBoard) {
    state.cards.board = newBoard
  },

  setDeck (newDeck) {
    state.cards.deck = newDeck
  },

  setPlayer (playerType, hand, Killer, Inspector) {
    if (state.player) {
      return
    } else if (!Killer || !Inspector) {
      throw Error('Could not create player. Constructor was not provided.')
    }

    switch (playerType) {
      case constants.PLAYER_TYPE.killer:
        state.player = new Killer(hand)
        state.playerType = playerType
        break
      case constants.PLAYER_TYPE.inspector:
        state.player = new Inspector(hand)
        state.playerType = playerType
        break
      default:
        throw Error('Could not create player. Invalid player type.')
    }
  },

  setUser (user) {
    if (state.user) return

    document.body.classList.add(`is-${user.playerType}`)

    state.user = user
  },

  setHand (hand) {
    if (!state.player) return

    state.player.setHand(hand)
  },

  setMoveDetails (description, player = state.turn.player) {
    if (!description || !player) return constants.NOOP

    return () => {
      this.renderMoveDetails(description, player)
      socket.emit('data:move-details', description, player)
    }
  },

  renderMoveDetails (description, player) {
    if (!description || !player) return

    let DOMmove = document.getElementById(DOM.moveDetails)

    ReactRender(
      <MoveDetailsDisplay
        description={description}
        player={player} />,
      DOMmove
    )
  },

  setClock (start) {
    let DOMclock = document.getElementById(DOM.clock)
    let delta

    state.clockInterval = window.setInterval(() => {
      delta = Math.floor((Date.now() - start) / 1000)

      ReactRender(
        <ClockDisplay time={
          util.formatTime((Math.floor(delta / 3600) % 24), (Math.floor(delta / 60) % 60), (delta % 60))
        } />,
        DOMclock
      )
    }, 1000)
  },

  setTurn (turn) {
    let DOMturn = document.getElementById(DOM.turn)
    state.turn = turn

    if (this.isPlayersTurn()) {
      document.body.classList.add('is-players-turn')
      DOMturn.textContent = 'Your turn'
    } else {
      document.body.classList.remove('is-players-turn')
      DOMturn.textContent = ''
    }

    if (ENV.debug) console.log(`turn: ${state.turn.number} - ${state.turn.player} - ${this.isPlayersTurn()}`)
  },

  updateDeck (cards) {
    state.cards.deck.setCards(cards)

    if (ENV.debug) console.log('deck updated')
  },

  updateBoard (cards) {
    state.cards.board.setCards(cards)

    if (ENV.debug) console.log('board updated')
  },

  reset () {
    window.clearInterval(state.clockInterval)
    state.cards = {}
    state.turn = {}

    Object.keys(DOM).forEach((key) => {
      util.removeChildren(document.getElementById(DOM[key]))
    })

    if (ENV.debug) console.log('game reset')
  },

  getBoard () {
    return state.cards.board
  },

  getDeck () {
    return state.cards.deck
  },

  getPlayer () {
    return state.player
  },

  getPlayerType () {
    return state.playerType
  },

  getUser () {
    return state.user
  },

  getTurn () {
    return state.turn
  },

  _getState () {
    return state
  },

  _setState (newState) {
    state = newState
  }
}
