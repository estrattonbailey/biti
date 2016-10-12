export default [
  {
    id: 0,
    prompt: `Hi :) welcome to my site. What are you looking for?`,
    answers: [
      {
        value: 'my work',
        next: '/work' 
      },
      {
        value: 'funny jokes',
        next: 1 
      },
      {
        value: 'GIFs',
        next: 'https://media.giphy.com/media/3o6ZsUJ44ffpnAW7Dy/giphy.gif' 
      }
    ]
  },
  {
    id: 1,
    prompt: `Why?`,
    answers: [
      {
        value: 'I want to hire you!',
        next: 3 
      },
      {
        value: 'just curious',
        next: 3 
      }
    ]
  },
  {
    id: 2,
    prompt: `What's funnier than a rhetorical question?`,
    answers: [
      {
        value: 'Yes',
        next: 0 
      },
      {
        value: 'No',
        next: 3 
      }
    ]
  },
  {
    id: 3,
    prompt: `Mom?`,
    answers: [
      {
        value: 'I love you, honey!',
        next: 'https://media.giphy.com/media/FGTVmzksb2j0k/giphy.gif' 
      },
      {
        value: 'what, no',
        next: '/work' 
      }
    ]
  },
]
