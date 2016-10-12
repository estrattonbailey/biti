const rootStyle = document.createElement('style')
document.head.appendChild(rootStyle)

const colors = [
  '#35D3E8',
  '#FF4E42',
  '#FFEA51'
]

const randomColor = () => colors[Math.round(Math.random() * (2 - 0) + 0)]

const saveColor = c => localStorage.setItem('mjs', JSON.stringify({
  color: c
}))

const readColor = () => localStorage.getItem('mjs') ? (
  JSON.parse(localStorage.getItem('mjs')).color
) : (
  null
)

const getColor = () => {
  let c = randomColor()
  let prev = readColor()

  while (c === prev){
    c = randomColor()
  }

  saveColor(c)
  return c
}

const update = () => {
  let color = getColor()
  
  rootStyle.innerHTML = `
    body { color: ${color} }
    ::-moz-selection {
      background-color: ${color};
    }
    ::selection {
      background-color: ${color};
    }
  `
}

export default {
  update: update,
  colors
}
