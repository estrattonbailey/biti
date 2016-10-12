import putz from 'putz'
import router from './lib/router'
import app from './app'
import colors from './lib/colors'

const loader = window.loader = putz(document.body, {
  speed: 100,
  trickle: 10
})

window.addEventListener('DOMContentLoaded', () => {
  app()

  router.on('after:route', ({ route }) => {
    colors.update()
  })

  colors.update()
})
