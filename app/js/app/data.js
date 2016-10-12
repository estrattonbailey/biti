const findLink = (id, data) => data.filter(l => l.id === id)[0]

const createLink = ({ answers }, data) => answers.forEach(a => {
  let isPath = /^\//.test(a.next) ? true : false
  let isGIF = /gif/.test(a.next) ? true : false
  a.next = isPath || isGIF ? a.next : findLink(a.next, data)
})

export const createStore = (questions) => {
	questions.map(q => createLink(q, questions))
	return questions
}

export default questions => {
  return {
    store: createStore(questions),
    getActive: function(){
      return this.store.filter(q => q.id == window.location.hash.split(/#/)[1])[0] || this.store[0]
    }
  }
}
