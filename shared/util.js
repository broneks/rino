'use strict'

const isServerSide = () => typeof window === 'undefined'

const util = {
  privateMap () {
    let weakMap = new WeakMap()

    return (obj) => {
      if (!weakMap.has(obj)) weakMap.set(obj, {})
      return weakMap.get(obj)
    }
  },

  shuffle (array) {
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
  },

  chunk (array, size) {
    let chunked = []
    let len = array.length

    if (len) {
      for (let i = 0; i < len; i += size) {
        chunked.push(array.slice(i, i + size))
      }
    }

    return chunked
  },

  capitalizeFirstLetter (str) {
    if (str && typeof str === 'string') {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },

  generateUID () {
    return Math.random().toString(36).substring(3, 16) + Date.now()
  },

  //
  // client-side only
  //

  addClass (node, classNames) {
    if (isServerSide()) return

    if (node) {
      let nodeArray = Array.from(node) || [node]
      let classNamesArray = classNames.split(' ')

      nodeArray.forEach(n => {
        classNamesArray.forEach(className => n.classList.add(className))
      })
    }

    return this
  },

  removeChildren (node) {
    if (isServerSide()) return

    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }

    return this
  }
}

module.exports = util
