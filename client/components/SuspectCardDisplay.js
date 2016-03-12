import React, {Component, PropTypes} from 'react'

export default class SuspectCardDisplay extends Component {
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
  card: PropTypes.object.isRequired,
  dataX: PropTypes.number.isRequired,
  dataY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired
}
