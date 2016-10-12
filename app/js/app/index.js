import router from '../lib/router'
import questions from './data/index.js'
import storage from './data'
import giffer from './giffer'
import { template } from './elements'

let prev
const data = storage(questions)

/**
 * Render template and append to DOM
 */
const render = (next) => {
  let questionRoot = document.getElementById('questionRoot')

  let el = template(next, update)
  questionRoot && questionRoot.appendChild(el)
  return el 
}

/**
 * Handle DOM updates, other link clicks
 */
const update = (next) => {
  let questionRoot = document.getElementById('questionRoot')

  let isGIF = /giphy/.test(next)
  if (isGIF) return giffer().open(next)

  let isPath = /^\//.test(next)
  if (isPath) return router.go(next)

  if (prev && questionRoot && questionRoot.contains(prev)) questionRoot.removeChild(prev)

  prev = render(next)

  window.location.hash = next.id
}

/**
 * Wait until new DOM is present before
 * trying to render to it
 */
router.on('after:route', ({route}) => {
  if (/(^\/|\/#[0-9]|#[0-9])/.test(route)){
    update(data.getActive())
  }
})

export default () => {
  prev = render(data.getActive())
}
