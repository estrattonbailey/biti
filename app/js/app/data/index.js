export default [
  {
    id: 1,
    prompt: `hi! what brings you to this neck of the interwebs?`,
    answers: [
      {
        value: 'who r u',
        next: 2 
      },
      {
        value: 'hiring',
        next: 3
      },
      {
        value: `it's your mom`,
        next: 4
      },
      {
        value: `funny jokes`,
        next: 5
      }
    ]
  },

  {
    id: 2,
    prompt: `i'm melanie – a graphic designer working in experiential marketing & proud iowan trying to eat ALL the BLTs`,
    answers: [
      {
        value: `what's experiential?`,
        next: 6 
      },
      {
        value: `what's a BLT?`,
        next: 7
      },
    ]
  },

  {
    id: 3,
    prompt: `rad! can i show you some projects i've worked on?`,
    answers: [
      {
        value: `yes, please!`,
        next: '/work'
      },
      {
        value: `nah, tell me about you`,
        next: '/about'
      },
      {
        value: `i'll email you instead`,
        next: '/contact'
      },
    ]
  },

  {
    id: 4,
    prompt: `hi mom! i love you!`,
    answers: [
      {
        value: `:) i love you too!`,
        next: 8
      },
      {
        value: `jk, not your mom`,
        next: 9
      },
    ]
  },

  {
    id: 5,
    prompt: `what's funnier than a rhetorical question?`,
    answers: [
      {
        value: `yes`,
        next: 10
      },
      {
        value: `no`,
        next: 'https://media.giphy.com/media/P2Hy88rAjQdsQ/giphy.gif'
      },
    ]
  },

  {
    id: 6,
    prompt: `experiential is this cool niche type of marketing, ya know?`,
    answers: [
      {
        value: `sounds cool. what have you done?`,
        next: '/work'
      },
      {
        value: `why do you like it?`,
        next: 11
      },
    ]
  },

  {
    id: 7,
    prompt: `take a wild guess...`,
    answers: [
      {
        value: `beef liver toast`,
        next: 'https://media.giphy.com/media/oFOs10SJSnzos/giphy.gif'
      },
      {
        value: `blueberry lemon tart`,
        next: 'https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif'
      },
      {
        value: `bacon lettuce tomato`,
        next: 'https://media.giphy.com/media/fqzxcmlY7opOg/giphy.gif'
      },
    ]
  },

  {
    id: 8,
    prompt: `so... can i ship laundry home to iowa?`,
    answers: [
      {
        value: `of course!`,
        next: 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif'
      },
      {
        value: `yeah, still not your mom...`,
        next: 12
      },
    ]
  },

  {
    id: 9,
    prompt: `clicking for fun, huh? good luck with this one.`,
    answers: [
      {
        value: `blue pill`,
        next: 'https://media.giphy.com/media/G7GNoaUSH7sMU/giphy.gif'
      },
      {
        value: `red pill`,
        next: 'https://media.giphy.com/media/UjujGY3mA3Jle/giphy.gif'
      },
    ]
  },

  {
    id: 10,
    prompt: `pancakes or waffles?`,
    answers: [
      {
        value: `french toast`,
        next: 'https://media.giphy.com/media/14nb6TlIRlaN1u/giphy.gif'
      },
    ]
  },

  {
    id: 11,
    prompt: `i like experiential because it's just super cool, okay?`,
    answers: [
      {
        value: `what are your favorite projects?`,
        next: 14
      },
      {
        value: `i have questions! can i email you?`,
        next: '/contact'
      },
    ]
  },  

  {
    id: 12,
    prompt: `taking this a little far don't you think?`,
    answers: [
      {
        value: `sure am`,
        next: 'https://media.giphy.com/media/qINsfDGI0z9yU/giphy.gif'
      },
      {
        value: `must click ALL buttons`,
        next: 13
      },
    ]
  },

  {
    id: 13,
    prompt: `yeah?`,
    answers: [
      {
        value: `clicking this may harm a kitten`,
        next: 'https://media.giphy.com/media/IgghkXWkdnEEo/giphy.gif'
      },
    ]
  },

  {
    id: 14,
    prompt: `of course I love my own work, but these projects deserve some serious props`,
    answers: [
      {
        value: `project 1`,
        next: 'https://twitter.com'
      },
      {
        value: `project 2`,
        next: 'https://twitter.com'
      },

      {
        value: `project 3`,
        next: 'https://twitter.com'
      },
    ]
  },
]
