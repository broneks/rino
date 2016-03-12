const isServerSide = () => typeof window === 'undefined'

export function shuffle (array) {
  let currentIndex = array.length
  let randomIndex
  let temp

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // swap values
    temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }

  return array
}

export function chunk (array, size) {
  let chunked = []
  let len = array.length

  if (len) {
    for (let i = 0; i < len; i += size) {
      chunked.push(array.slice(i, i + size))
    }
  }

  return chunked
}

export function capitalizeFirstLetter (str) {
  if (str && typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

export function generateUID () {
  return Math.random().toString(36).substring(3, 16) + Date.now()
}

export function privateMap () {
  let weakMap = new WeakMap()

  return (obj) => {
    if (!weakMap.has(obj)) weakMap.set(obj, {})
    return weakMap.get(obj)
  }
}

export function removeChildren (node) {
  if (isServerSide()) return

  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

//
// grouped exports
//

export const serverUtils = {
  shuffle,
  chunk,
  capitalizeFirstLetter
}

export default Object.assign({
  generateUID,
  privateMap,
  removeChildren
}, serverUtils)
