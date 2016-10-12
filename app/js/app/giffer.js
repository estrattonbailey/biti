import { tarry, queue } from 'tarry.js'

export default () => {
  const modal = document.getElementById('gif')
  const img = modal.getElementsByTagName('img')[0]

  const show = tarry(() => modal.style.display = 'block') 
  const hide = tarry(() => modal.style.display = 'none') 
  const toggle = tarry(
    () => modal.classList.contains('is-active') 
      ? modal.classList.remove('is-active')
      : modal.classList.add('is-active')
  )

  const lazy = (url, cb) => {
    let burner = document.createElement('img')

    burner.onload = () => cb(url)

    burner.src = url
  }

  const open = url => {
    window.loader.start()
    window.loader.putz(500)

    lazy(url, url => {
      img.src = url
      queue(show, toggle(200))()
      window.loader.end()
    })
  }

  const close = () => {
    queue(toggle, hide(200))()
  }

  modal.onclick = close

  return {
    open,
    close
  }
}
