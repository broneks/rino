const React = require('react')
const ReactDOM = require('react-dom')

const gameState = require('../gameState')
const constants = require('../constants')

const BoardDisplay = require('../components/BoardDisplay')

let moveDetails = null
let instance = null

class Board {
  constructor (suspectCards) {
    this._cards = suspectCards

    this.render()

    // singleton
    if (!instance) instance = this
    return instance
  }

  onSuspectClick (event) {
    let player = gameState.getCurrentPlayer()
    let target

    if (event.target.dataset.suspect) {
      target = event.target
    } else {
      target = event.target.parentNode
    }

    let card = this._cards[target.dataset.x][target.dataset.y]
    let cardName = card.getName()

    switch (player.getType()) {
      case constants.PLAYER_TYPE.killer:
        player.kill(card)
        moveDetails = gameState.setMoveDetails(`killed ${ cardName }`)
        break

      case constants.PLAYER_TYPE.inspector:
        // inspector cannot arrest an exonerated suspect
        // skip re-rendering and don't end the current player's turn
        if (card.isExonerated()) return

        player.arrest(card)
        moveDetails = gameState.setMoveDetails(`arrested ${ cardName }`)
        break
    }

    this.preRender()
  }

  onArrowClick (event) {
    let target = event.target

    let row = target.dataset.row
    let column = target.dataset.column
    let direction = target.dataset.direction

    if (row) {
      this.shiftRow(row, direction)
      moveDetails = gameState.setMoveDetails(`shifted row ${ parseInt(row, 10) + 1 } ${ direction }`)
    } else if (column) {
      this.shiftColumn(column, direction)
      moveDetails = gameState.setMoveDetails(`shifted column ${ parseInt(column, 10) + 1 } ${ direction }`)
    }

    this.preRender()
  }

  shiftRow (rowIndex, direction) {
    let row = this._cards[rowIndex]

    if (direction === 'right') {
      let last = row.pop()
      row.unshift(last)
    } else {
      let first = row.shift()
      row.push(first)
    }
  }

  shiftColumn (columnIndex, direction) {
    let cardsLength = this._cards.length
    let storedCard = this._cards[0][columnIndex]

    this._cards.forEach((row, rowIndex) => {
      let nextRowIndex
      let shiftedCard

      if (direction === 'up') {
        nextRowIndex = ((rowIndex + 1) < cardsLength ? rowIndex + 1 : 0)
        shiftedCard = (nextRowIndex === 0 ? storedCard : this._cards[nextRowIndex][columnIndex])
      } else {
        nextRowIndex = ((rowIndex - 1) >= 0 ? rowIndex - 1 : cardsLength - 1)
        shiftedCard = (nextRowIndex === (cardsLength - 1) ? this._cards[nextRowIndex][columnIndex] : storedCard)
      }

      if (direction === 'down') {
        storedCard = row[columnIndex]
      }

      row[columnIndex] = shiftedCard
    })
  }

  preRender () {
    // remove row if every suspect is deceased
    this._cards.some((row, rowIndex) => {
      let rowIsDeceased = row.every(suspect => suspect.isDeceased())

      if (rowIsDeceased) {
        this._cards.splice(rowIndex, 1)
      }

      return rowIsDeceased
    })

    // remove column if every suspect is deceased
    this._cards[0].some((card, cardIndex) => {
      let columnIsDeceased = this._cards.every(row => row[cardIndex].isDeceased())

      if (columnIsDeceased) {
        this._cards.forEach(card => card.splice(cardIndex, 1))
      }

      return columnIsDeceased
    })

    this.render()
    gameState.nextTurn()
  }

  render () {
    ReactDOM.render(
      <BoardDisplay
        cards={this._cards}
        onSuspectClick={this.onSuspectClick.bind(this)}
        onArrowClick={this.onArrowClick.bind(this)} />,
      constants.DOM.board
    )

    if (moveDetails) moveDetails()
  }
}

module.exports = Board
