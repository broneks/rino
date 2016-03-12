import {privateMap} from '../../../shared/util'

let internal = privateMap()

export default class Card {
  constructor (type, name) {
    internal(this).type = type
    internal(this).name = name
    internal(this).isOutOfPlay = false
  }

  getType () {
    return internal(this).type
  }

  getName () {
    return internal(this).name
  }

  setOutOfPlay () {
    internal(this).isOutOfPlay = true
  }
}
