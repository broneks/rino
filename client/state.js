import React from 'react'
import {render as ReactRender} from 'react-dom'

import util from '../shared/util'
import {PLAYER_TYPE} from '../shared/constants'
import DOM from './DOM'

import ClockDisplay from './components/ClockDisplay'

const socket = io()

let state = {
  user: null,
  opponent: null,
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

  getOpponent () {
    return state.opponent
  },

  getTurn () {
    return state.turn
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

  setPlayer (playerType, Killer, Inspector) {
    if (state.player) return

    switch (playerType) {
      case PLAYER_TYPE.killer:
        state.player = new Killer()
        state.playerType = playerType
        break
      case PLAYER_TYPE.inspector:
        state.player = new Inspector()
        state.playerType = playerType
        break
      default:
        throw Error('Could not create player. Invalid player type.')
    }
  },

  setUser (user) {
    if (state.user) return

    document.body.classList.add(`is-${ user.playerType }`)

    state.user = user
  },

  setOpponent (opponent) {
    if (state.opponent) return

    state.opponent = opponent
  },

  setMoveDetails (description) {
    if (!description) return

    let moveDetails = {
      description,
      player: state.playerType
    }

    // returns a function that, when called, renders the move details
    return () => {
      DOM.moveDetails.className = moveDetails.player
      DOM.moveDetails.textContent = `The ${
        util.capitalizeFirstLetter(moveDetails.player)
      } ${
        moveDetails.description
      }`
    }
  },

  setClock (start) {
    let delta

    state.clockInterval = window.setInterval(() => {
      delta = Math.floor((Date.now() - start) / 1000)

      ReactRender(
        <ClockDisplay time={
          util.formatTime((Math.floor(delta / 3600) % 24), (Math.floor(delta / 60) % 60), (delta % 60))
        } />
      , DOM.clock)
    }, 1000)
  },

  setTurn (turn) {
    state.turn = turn

    if (this.isPlayersTurn()) {
      document.body.classList.add('is-players-turn')
    } else {
      document.body.classList.remove('is-players-turn')
    }

    if (ENV.debug) {
      console.log(`turn: ${ state.turn.number } - ${ state.turn.player } - ${ this.isPlayersTurn() }`)
    }
  },

  updateDeck (cardNames) {
    state.cards.deck.setCards(cardNames)
  },

  reset () {
    window.clearInterval(state.clockInterval)
    state.opponent = null
    state.cards = {}
    state.turn = {}

    Object.keys(DOM).forEach((key) => {
      util.removeChildren(DOM[key])
    })
  }
}