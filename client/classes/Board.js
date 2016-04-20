import React from 'react'
import {render as ReactRender} from 'react-dom'

import {privateMap} from '../../shared/util'
import {PLAYER_TYPE} from '../../shared/constants'
import DOM from '../DOM'
import state from '../state'

import SuspectCard from './SuspectCard'
import BoardDisplay from '../components/BoardDisplay'

let internal = privateMap()
let moveDetails = null
let instance = null

export default class Board {
  constructor (cards) {
    internal(this).DOMboard = document.getElementById(DOM.board)

    this.setCards(cards)

    // singleton
    if (!instance) instance = this
    return instance
  }

  setCards (cards) {
    internal(this).cards = cards.map((row) => {
      return row.map((details) => {
        return new SuspectCard(details.name, details.isArrested, details.isDeceased, details.isExonerated)
      })
    })

    this.render()
  }

  onSuspectClick (event) {
    if (!state.isPlayersTurn()) return

    let player = state.getPlayer()
    let target

    if (event.target.dataset.suspect) {
      target = event.target
    } else {
      target = event.target.parentNode
    }

    let card = internal(this).cards[target.dataset.x][target.dataset.y]
    let cardName = card.getName()

    switch (player.getType()) {
      case PLAYER_TYPE.killer:
        player.kill(card)
        moveDetails = state.setMoveDetails(`killed ${cardName}`)
        break

      case PLAYER_TYPE.inspector:
        // inspector cannot arrest an exonerated suspect
        // skip re-rendering and don't end the current player's turn
        if (card.isExonerated()) return

        player.arrest(card)
        moveDetails = state.setMoveDetails(`arrested ${cardName}`)
        break
    }

    this.preRender()
  }

  onArrowClick (event) {
    if (!state.isPlayersTurn()) return

    let target = event.target

    let row = target.dataset.row
    let column = target.dataset.column
    let direction = target.dataset.direction

    if (row) {
      this.shiftRow(row, direction)
      moveDetails = state.setMoveDetails(`shifted row ${parseInt(row, 10) + 1} ${direction}`)
    } else if (column) {
      this.shiftColumn(column, direction)
      moveDetails = state.setMoveDetails(`shifted column ${parseInt(column, 10) + 1} ${direction}`)
    }

    this.preRender()
  }

  shiftRow (rowIndex, direction) {
    let row = internal(this).cards[rowIndex]

    if (direction === 'right') {
      let last = row.pop()
      row.unshift(last)
    } else {
      let first = row.shift()
      row.push(first)
    }
  }

  shiftColumn (columnIndex, direction) {
    let cardsLength = internal(this).cards.length
    let storedCard = internal(this).cards[0][columnIndex]

    internal(this).cards.forEach((row, rowIndex) => {
      let nextRowIndex
      let shiftedCard

      if (direction === 'up') {
        nextRowIndex = ((rowIndex + 1) < cardsLength ? rowIndex + 1 : 0)
        shiftedCard = (nextRowIndex === 0 ? storedCard : internal(this).cards[nextRowIndex][columnIndex])
      } else {
        nextRowIndex = ((rowIndex - 1) >= 0 ? rowIndex - 1 : cardsLength - 1)
        shiftedCard = (nextRowIndex === (cardsLength - 1) ? internal(this).cards[nextRowIndex][columnIndex] : storedCard)
      }

      if (direction === 'down') {
        storedCard = row[columnIndex]
      }

      row[columnIndex] = shiftedCard
    })
  }

  preRender () {
    // remove row if every suspect is deceased
    internal(this).cards.some((row, rowIndex) => {
      let rowIsDeceased = row.every((suspect) => suspect.isDeceased())

      if (rowIsDeceased) {
        internal(this).cards.splice(rowIndex, 1)
      }

      return rowIsDeceased
    })

    // remove column if every suspect is deceased
    internal(this).cards[0].some((card, cardIndex) => {
      let columnIsDeceased = internal(this).cards.every((row) => row[cardIndex].isDeceased())

      if (columnIsDeceased) {
        internal(this).cards.forEach((card) => card.splice(cardIndex, 1))
      }

      return columnIsDeceased
    })

    this.render()
    this.postRender()
  }

  postRender () {
    if (moveDetails) moveDetails()

    state.boardChanged(internal(this).cards.map((row) => {
      return row.map((card) => card.getProperties())
    }))
    state.endTurn()
  }

  render () {
    ReactRender(
      <BoardDisplay
        cards={internal(this).cards}
        onSuspectClick={this.onSuspectClick.bind(this)}
        onArrowClick={this.onArrowClick.bind(this)} />,
      internal(this).DOMboard
    )
  }
}
