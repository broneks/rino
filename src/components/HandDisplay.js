const React = require('react')

class HandDisplay extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let hand = this.props.hand.map(card => {
      let name = card.getName()

      return (
        <div
          className='evidence-card'
          key={name}>
          <div className='evidence-card-name'>{name}</div>
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
  hand: React.PropTypes.array.isRequired
}

module.exports = HandDisplay
