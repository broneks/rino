import DOM, {updateDOM} from '../../client/DOM'

export default {
  basicDOM () {
    Object.keys(DOM).forEach((key) => {
      let div = document.createElement('div')
      div.id = DOM[key]
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
      document.body.appendChild(div)
    })
  }
}
