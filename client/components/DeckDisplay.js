import React, {Component, PropTypes} from 'react'

export default class DeckDisplay extends Component {
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
          <div className='message'>Deck is empty</div>
        </div>
      )
    }
  }
}

DeckDisplay.propTypes = {
  cards: PropTypes.array.isRequired,
  cardClick: PropTypes.func.isRequired
}
