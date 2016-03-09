const React = require('react')

class SuspectCardDisplay extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      card: this.props.card
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      card: nextProps.card
    })
  }

  render () {
    let cardName = this.state.card.getName()

    let rotateDirection = (Math.floor(Math.random() * 2) ? '-' : '')
    let rotation = Math.floor(Math.random() * (3 - 0.5) + 0.5)

    let style = {
      width: `${ this.props.width }%`,
      transform: `rotate(${ rotateDirection }${ rotation }deg)`
    }

    let classNames = 'suspect-card card ' + cardName.toLowerCase()

    if (this.state.card.isDeceased()) classNames += ' deceased'
    else if (this.state.card.isExonerated()) classNames += ' exonerated'
    else if (this.state.card.isArrested()) classNames += ' arrested'

    // players cannot act on a suspect that's already deceased
    let click = (!this.state.card.isDeceased() ? this.props.click : null)

    return (
      <div
        style={style}
        className={classNames}
        data-suspect
        data-x={this.props.dataX}
        data-y={this.props.dataY}
        data-name={cardName}
        onClick={click}>
        <div className='suspect-card-name card-name'>{cardName}</div>
      </div>
    )
  }
}

SuspectCardDisplay.propTypes = {
  card: React.PropTypes.object.isRequired,
  dataX: React.PropTypes.number.isRequired,
  dataY: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  click: React.PropTypes.func.isRequired
}

module.exports = SuspectCardDisplay
