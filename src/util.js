module.exports = {
  shuffle (array = []) {
    let currentIndex = array.length
    let randomIndex

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // swap values
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
  },

  chunk (array = [], size = 5) {
    let chunked = []
    let len = array.length

    if (len) {
      for (let i = 0; i < len; i += size) {
        chunked.push(array.slice(i, i + size))
      }
    }

    return chunked
  }
}
