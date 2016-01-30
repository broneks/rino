const React = require('react')

class DeckDisplay extends React.Component {
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
    if (this.state.cards.length) {
      let cards = this.state.cards.map((card, index) => {
        let style = {
          top: index ? index / 2 : 0,
          left: index ? index / 2 : 0
        }

        return (
          <div key={index} className='deck-card' style={style}></div>
        )
      })

      return (
        <div className='game-deck-wrapper' onClick={this.props.cardClick}>{cards}</div>
      )
    } else {
      return (
        <div className='game-deck-wrapper is-empty'>
          <div className='message'>Deck is empty...</div>
        </div>
      )
    }
  }
}

DeckDisplay.propTypes = {
  cards: React.PropTypes.array.isRequired,
  cardClick: React.PropTypes.func.isRequired
}

module.exports = DeckDisplay
