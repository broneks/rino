import {privateMap} from '../../shared/util'
import {CARD_TYPE} from '../../shared/constants'

import Card from './base/Card'

let internal = privateMap()

export default class SuspectCard extends Card {
  constructor (name) {
    super(CARD_TYPE.suspect, name)

    internal(this).isDeceased = false
    internal(this).isExonerated = false
    internal(this).isArrested = false
  }

  isExonerated () {
    return internal(this).isExonerated
  }

  isDeceased () {
    return internal(this).isDeceased
  }

  isArrested () {
    return internal(this).isArrested
  }

  exonerate () {
    if (!internal(this).isDeceased) internal(this).isExonerated = true
  }

  kill () {
    if (!internal(this).isDeceased) internal(this).isDeceased = true
  }

  arrest () {
    if (!internal(this).isDeceased && !internal(this).isExonerated) {
      internal(this).isArrested = true
    }

    // TODO
  }

  setOutOfPlay () {
    super.setOutOfPlay()
  }
}
