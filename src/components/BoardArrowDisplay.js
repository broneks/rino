const React = require('react')

class BoardArrowDisplay extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let rowOrColumn = {}
    let classNames = `board-arrow ${ this.props.direction }-arrow`

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
  row: React.PropTypes.number,
  column: React.PropTypes.number,
  direction: React.PropTypes.string.isRequired,
  click: React.PropTypes.func.isRequired
}

module.exports = BoardArrowDisplay
