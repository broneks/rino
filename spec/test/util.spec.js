import util from '../../shared/util'

describe('-- util --', () => {
  describe('shuffle', () => {
    let original

    beforeEach(() => {
      original = [1, 2, 3, 4, 5 , 6, 7]
    })

    it('shuffles an array', () => {
      let shuffled = util.shuffle(original)

      expect(shuffled).not.toEqual(original)
    })

    it('shuffled array exact same items as original', () => {
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
      let expected = 'Hello world'

      expect(capitalized).toEqual(expected)
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

    beforeEach(() => {
      internal = util.privateMap()
    })

    it('returns a function', () => {
      expect(internal).toEqual(jasmine.any(Function))
    })
  })
})
