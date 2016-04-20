import React, {Component, PropTypes} from 'react'

export default class BoardArrowDisplay extends Component {
  render () {
    let rowOrColumn = {}
    let classNames = `board-arrow ${this.props.direction}-arrow`

    if (this.props.row >= 0) {
      rowOrColumn['data-row'] = this.props.row
    } else if (this.props.column >= 0) {
      rowOrColumn['data-column'] = this.props.column
    }

    return (
      <div
        {...rowOrColumn}
        className={classNames}
        data-direction={this.props.direction}
        onClick={this.props.click}></div>
    )
  }
}

BoardArrowDisplay.propTypes = {
  row: PropTypes.number,
  column: PropTypes.number,
  direction: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
}
