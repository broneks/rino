const React = require('react')

const SuspectCardDisplay = require('./SuspectCardDisplay')
const BoardArrowDisplay = require('./BoardArrowDisplay')

class BoardDisplay extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      cards: this.props.cards
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      cards: nextProps.cards
    })
  }

  render () {
    let rowLength = this.state.cards[0].length
    let topArrowRow = []
    let bottomArrowRow = []

    let rows = this.state.cards.map((row, rowIndex) => {
      let cards = row.map((card, cardIndex) => {
        return (
          <SuspectCardDisplay
            key={card.getName()}
            card={card}
            dataX={rowIndex}
            dataY={cardIndex}
            width={100 / row.length}
            click={this.props.onSuspectClick} />
        )
      })

      let leftArrow = (
        <BoardArrowDisplay
          row={rowIndex}
          direction='left'
          click={this.props.onArrowClick} />
      )

      let rightArrow = (
        <BoardArrowDisplay
          row={rowIndex}
          direction='right'
          click={this.props.onArrowClick} />
      )

      return (
        <div key={rowIndex} className='row'>
          {leftArrow}
          {cards}
          {rightArrow}
        </div>
      )
    })

    for (let col = 0; col < rowLength; col++) {
      let topArrow = (
        <div className='board-arrow-wrapper' key={col}>
          <BoardArrowDisplay
            column={col}
            direction='up'
            click={this.props.onArrowClick} />
        </div>
      )

      let bottomArrow = (
        <div className='board-arrow-wrapper' key={col}>
          <BoardArrowDisplay
            column={col}
            direction='down'
            click={this.props.onArrowClick} />
        </div>
      )

      topArrowRow.push(topArrow)
      bottomArrowRow.push(bottomArrow)
    }

    return (
      <div className='board-wrapper'>
        <div className='board-arrow-row top-row'>
          {topArrowRow}
        </div>

        {rows}

        <div className='board-arrow-row bottom-row'>
          {bottomArrowRow}
        </div>
      </div>
    )
  }
}

BoardDisplay.propTypes = {
  cards: React.PropTypes.array.isRequired,
  onSuspectClick: React.PropTypes.func.isRequired,
  onArrowClick: React.PropTypes.func.isRequired
}

module.exports = BoardDisplay
