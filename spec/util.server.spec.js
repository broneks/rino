import util from '../shared/util'

describe('-- util - server --', () => {
  describe('shuffle', () => {
    let original

    beforeEach(() => {
      original = [1, 2, 3, 4, 5 , 6, 7]
    })

    it('shuffles an array', () => {
      let shuffled = util.shuffle(original)

      expect(shuffled).not.toEqual(original)
    })

    it('shuffled array has exact same items as original', () => {
      let shuffled = util.shuffle(original)

      expect(shuffled.every((item) => original.indexOf(item) > -1)).toBeTruthy()
    })
  })

  describe('chunk', () => {
    let arr

    beforeEach(() => {
      arr = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']
    })

    it('chunks an array by 5', () => {
      let chunked = util.chunk(arr, 5)
      let expected = [
        [1, 2, 3, 4, 5],
        ['a', 'b', 'c', 'd', 'e']
      ]

      expect(chunked).toEqual(expected)
    })
  })

  describe('capitalizeFirstLetter', () => {
    let str

    beforeEach(() => {
      str = 'hello world'
    })

    it('capitalizes the first letter', () => {
      let capitalized = util.capitalizeFirstLetter(str)

      expect(capitalized).toEqual('Hello world')
    })
  })

  describe('generateUID', () => {
    it('generates a random, unique ID', () => {
      let id = util.generateUID()
      let id2 = util.generateUID()

      expect(id).toEqual(jasmine.any(String))
      expect(id).not.toEqual(id2)
    })
  })

  describe('privateMap', () => {
    let internal
    let obj

    beforeEach(() => {
      internal = util.privateMap()
      obj = {}
    })

    it('returns a function', () => {
      expect(internal).toEqual(jasmine.any(Function))
    })

    it('sets and gets a value paired to an object', () => {
      internal(obj).hello = 'hello'
      internal(obj).world = 'world'

      expect(internal(obj).hello).toEqual('hello')
      expect(internal(obj).world).toEqual('world')
    })
  })

  describe('formatTime', () => {
    let hours
    let minutes
    let seconds

    beforeEach(() => {
      hours = 1
      minutes = 2
      seconds = 50
    })

    it('should return an array of strings', () => {
      let formatted = util.formatTime(hours, minutes, seconds)

      expect(formatted.every(item => typeof item === 'string'))
    })

    it('should pad each item with a zero', () => {
      let formatted = util.formatTime(hours, minutes, seconds)
      let expected = ['01', '02', '50']

      expect(formatted).toEqual(expected)
    })
  })
})
