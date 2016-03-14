import React, {Component, PropTypes} from 'react'
import {capitalizeFirstLetter} from '../../shared/util'

export default class MoveDetailsDisplay extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={'move-details-wrapper ' + this.props.player}>
        The {capitalizeFirstLetter(this.props.player)} {this.props.description}
      </div>
    )
  }
}

MoveDetailsDisplay.propTypes = {
  description: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired
}
