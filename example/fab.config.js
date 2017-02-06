module.exports = {
  output: './public',
  pages: [
    {
      template: './src/markup/pages/Home.js',
      route: '/',
    }
  ],
  data: {
    projects: [
      {
        title: 'Startup Stock Photos',
        description: 'CC0 photos for nice people and projects.',
        url: 'http://startupstockphotos.com'
      },
      {
        title: 'svbstrate',
        description: 'A hyper-minimal functional CSS library',
        url: 'https://github.com/estrattonbailey/svbstrate'
      },
      {
        title: 'relaze',
        description: '1kb image lazy loading library for React.',
        url: 'https://github.com/estrattonbailey/relaze'
      },
      {
        title: 'apollo-prefetch',
        description: 'Async middleware and utilities for prefetching data in React + React-Router + Apollo projects.',
        url: 'https://github.com/estrattonbailey/apollo-prefetch'
      },
      {
        title: 'operator.js',
        description: 'An AJAX + routing library that transforms a normal site into a Single Page Application (SPA).',
        url: 'https://github.com/estrattonbailey/operator.js'
      },
      {
        title: 'fab.js',
        description: 'Static site generator in React.',
        url: 'https://github.com/estrattonbailey/fab.js'
      },
      {
        title: 'overunder',
        description: 'A tiny waypoint library for scroll and resize events.',
        url: 'https://github.com/estrattonbailey/overunder'
      },
      {
        title: 'srraf',
        description: 'Better scroll and resize listeners using requestAnimationFrame.',
        url: 'https://github.com/estrattonbailey/srraf'
      },
      {
        title: 'svel',
        description: 'Calculate velocity over an interval for scroll or resize events.',
        url: 'https://github.com/estrattonbailey/svel'
      },
      {
        title: 'sroll-restoration',
        description: 'A tiny scroll management library using native DOM APIs.',
        url: 'https://github.com/estrattonbailey/scroll-restoration'
      },
      {
        title: 'tarry.js',
        description: 'Hyper-minimal composable sequencing library.',
        url: 'https://github.com/estrattonbailey/tarry.js'
      },
      {
        title: 'loop.js',
        description: 'Part of a knot. Loop is a bare-bones pub/sub style event emitter.',
        url: 'https://github.com/estrattonbailey/loop.js'
      },
      {
        title: 'valencia',
        description: 'A hyper-minimal wrapper to fetch Instagram posts from an authenticated user.',
        url: 'https://github.com/estrattonbailey/valencia'
      },
      {
        title: 'conform.js',
        description: 'A tiny form submission utility library.',
        url: 'https://github.com/estrattonbailey/conform.js'
      },
      {
        title: 'putz',
        description: 'A tiny progress bar library for AJAX and SPAs in ES6.',
        url: 'https://github.com/estrattonbailey/putz'
      },
      {
        title: 'sharable',
        description: `An easily configurable social share libary that uses the social data in your document's head by default.`,
        url: 'https://github.com/estrattonbailey/sharable'
      },
      {
        title: 'micromanager',
        description: `Route-managed client-side binding controller in ES6.`,
        url: 'https://github.com/estrattonbailey/micromanager'
      },
      {
        title: 'meta-to-object',
        description: `Scrape document.head for specific meta tags and values.`,
        url: 'https://github.com/estrattonbailey/meta-to-object'
      },
      {
        title: 'micro-jsonp',
        description: `A hyper-minimal standalone jsonp implementation in ES6.`,
        url: 'https://github.com/estrattonbailey/micro-jsonp'
      },
      {
        title: 'up-down',
        description: `A quantity selector in ES6.`,
        url: 'https://github.com/estrattonbailey/up-down'
      },
      {
        title: 'lookoutjs',
        description: `A tiny reactive accessor library in JS.`,
        url: 'https://github.com/estrattonbailey/lookoutjs'
      },
      {
        title: 'object-keypath',
        description: `Return the path to a key of a specified value.`,
        url: 'https://github.com/estrattonbailey/object-keypath'
      },
      {
        title: '.dotfiles',
        description: 'Configs for vim, git, and Hyper.',
        url: 'https://github.com/estrattonbailey/.dotfiles'
      },
      {
        title: 'php-functional-components',
        description: 'Experiment. Functional, composable components in PHP.',
        url: 'https://github.com/estrattonbailey/php-functional-components'
      },
      {
        title: 'barrel/promobar',
        description: 'A lightweight and easily configurable promo bar in ES6.',
        url: 'https://github.com/barrel/promobar'
      },
      {
        title: 'maxrolon/shopify-shipper',
        description: '⚓️ A shipping calculator library for Shopify',
        url: 'https://github.com/maxrolon/shopify-shipper'
      },
      {
        title: 'the-couch/paralless',
        description: 'Simple Parallax powered by CSS3 Transitions',
        url: 'https://github.com/the-couch/paralless'
      },
    ]
  },
  babel: {
    plugins: [
      ['module-resolver', {
        'root': ['.'],
        'alias': {
          'Components': 'src/markup/components',
          'Pages': 'src/markup/pages',
          'Root': 'src/markup',
        }
      }],
      'lodash',
      'transform-object-rest-spread',
      'transform-object-assign',
    ],
    presets: [
      'es2015',
      'react',
    ]
  }
}
