import h0 from 'h0'
import colors from '../lib/colors'

export const div = h0('div')
export const button = h0('button')({class: 'h2 mv0 inline-block'})
export const title = h0('p')({class: 'h1 mt0 mb05 cb'})

export const template = ({prompt, answers}, cb) => {
  return div({class: 'question'})(
    title(prompt),
    div(
      ...answers.map((a, i) => button({
        onclick: (e) => cb(a.next),
        style: {
          color: colors.colors[i]
        }
      })(a.value))
    )
  )
}
