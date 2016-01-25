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
  },

  addClass (node, classNames) {
    if (node) {
      let nodeArray = Array.from(node) || [node]
      let classNamesArray = classNames.split(' ')

      nodeArray.forEach(n => {
        classNamesArray.forEach(className => n.classList.add(className))
      })
    }

    return this
  }

  // clearNodeChildren (node) {
  //   while (node.firstChild) {
  //     node.removeChild(node.firstChild)
  //   }
  //
  //   return this
  // },
  //
  // appendNode (parent, child) {
  //   if (Array.isArray(child)) {
  //     child.forEach((childNode) => parent.appendChild(childNode))
  //   } else {
  //     parent.appendChild(child)
  //   }
  //
  //   return this
  // }
}
