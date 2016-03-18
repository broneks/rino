import {privateMap} from '../../shared/util'
import {CARD_TYPE} from '../../shared/constants'

import Card from './base/Card'

let internal = privateMap()

export default class SuspectCard extends Card {
  constructor (name, isArrested, isDeceased, isExonerated) {
    super(CARD_TYPE.suspect, name)

    internal(this).isArrested = isArrested
    internal(this).isDeceased = isDeceased
    internal(this).isExonerated = isExonerated
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

  getProperties () {
    return {
      name: this.getName(),
      isArrested: internal(this).isArrested,
      isDeceased: internal(this).isDeceased,
      isExonerated: internal(this).isExonerated
    }
  }
}
