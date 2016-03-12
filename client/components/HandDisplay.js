import React, {Component, PropTypes} from 'react'

export default class HandDisplay extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let hand = this.props.hand.map(card => {
      let name = card.getName()

      return (
        <div
          className='evidence-card card'
          key={name}>
          <div className='card-name'>{name}</div>
        </div>
      )
    })

    return (
      <div className='hand-wrapper'>
        {hand}
      </div>
    )
  }
}

HandDisplay.propTypes = {
  hand: PropTypes.array.isRequired
}
