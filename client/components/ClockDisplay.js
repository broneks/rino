import React, {Component, PropTypes} from 'react'

export default class ClockDisplay extends Component {
  render () {
    return (
      <div className='clock-wrapper'>
        <span className='hour'>{this.props.time[0]}</span>
        <span className='divider'>:</span>
        <span className='minutes'>{this.props.time[1]}</span>
        <span className='divier'>:</span>
        <span className='seconds'>{this.props.time[2]}</span>
      </div>
    )
  }
}

ClockDisplay.propTypes = {
  time: PropTypes.array.isRequired
}
