# fab
Itsy-bitsy teenie-weenie React static site generator.

## Install
CLI:
```bash
npm i fab.js --g
```
Node via API:
```bash
npm i fab.js --save-dev
```

## Usage
Fab can be used from the command line, or Node via the API.

#### Command Line
Command line usage requires a `fab.config.js` file, and that the project you're compiling has React installed and imported at the top of each template file.
```javascript
// fab.config.js
module.exports = {
  output: './site',
  pages: [
    {
      template: './path/to/Root.js', 
      route: '/',
      locals: { title: 'Local data!' }
    },
    {
      template: './path/to/Products.js', 
      route: 'products'
    }
  ]
}
```

Then, run `fab` from your command line and your pages will be compiled to `<config.output>/<route>/index.html`.
```bash
fab
```

#### Via API
Via the API, you can manually add pages to a collection, and render them as you wish.
```javascript
const fab = require('fab.js')
const data = require('./data.js')

// specify site output dir
fab.output('./path/to/site')

// add data as global props
fab.data(data)

// add an array of pages
fab.pages([
  {
    template: './path/to/Component.js',
    route: 'design'
  },
  {
    template: './path/to/Component.js',
    route: 'development'
  }
])

// add a single page
fab.pages({
  template: './path/to/Component.js',
  route: 'contact'
})

// generate pages from JSON (blog posts, for example)
data.pages.forEach(p => {
  fab.pages({
    template: './path/to/Component.js',
    route: p.url,
    locals: p.content
  })
})

fab.render() // render to dest path
```

## Config
#### output
Set's the destination directory to compile your site to. This is probably a `/public` or `/dist` directory where you compile all asset files for hosting. Defaults to `/site`.
```javascript
// fab.config.js
module.exports = {
  output: 'path/to/dest'
}

// API
fab.output() // returns full path to output location
fab.output('path/to/dest') // sets the output path
```

#### data
Data is your data source. It is a plain javascript object and is passed to all templates upon render.
```javascript
/**
 * fab.config.js
 */
module.exports = {
  data: {
    title: 'My Awesome Static Site'
  }
}

/**
 * API
 */

// returns data object
fab.data()

// sets data object value
fab.data({ title: 'My Awesome Static Site' })

// merges new values into existing data store
fab.data(
  Object.assign(fab.data(), {
    title: 'My Awesome Static Site' 
  })
)
```

#### pages
The pages value should be an array of page objects. Each page object can have three properties:
1. `template` - the path to your React template
2. `route` - the route structure you'd like for that template i.e. if `route = 'posts'`, the template will render to `/site/posts/index.html`
3. `locals` - and page specific data you'd like to attach (most helpful via API, generating pages from a data source). Locals are merged with the root `config.data` object on render of each page.

```javascript
/**
 * fab.config.js
 */
module.exports = {
  pages: [
    {
      template: 'path/to/Page.js',
      route: '/',
      locals: {
        title: 'My Awesome Static Site'
      }
    },
    {
      template: 'path/to/Posts.js',
      route: '/posts',
      locals: {
        posts: [
          ...posts...
        ]
      }
    }
  ]
}

/**
 * API
 */

// add an array of pages
fab.pages([
  {
    template: 'path/to/Page.js',
    route: '/'
  },
  {
    template: 'path/to/Posts.js',
    route: 'posts',
    locals: {
      posts: [
        ...posts...
      ]
    }
  }
])

// add a single page
fab.pages({
  template: 'path/to/Posts.js',
  route: '/posts',
  locals: {
    posts: [
      ...posts...
    ]
  }
})

// generate pages from JSON (blog posts, for example)
data.posts.forEach(post => {
  fab.pages({
    template: 'path/to/Post.js',
    route: p.url,
    locals: p.data
  })
})
```

#### render
To render all pages in the store, just run `fab.render()`. Otherwise, pass a page, or array of pages.
```javascript
fab.output('/public')

fab.pages({
  template: 'path/to/Home.js',
  route: '/',
  locals: {
    title: 'My Awesome Static Site'
  }
})

fab.render()

// render single page
const page = {
  template: 'path/to/Home.js',
  route: '/',
  locals: {
    title: 'My Awesome Static Site'
  }
}

fab.render(page)
```

#### transpilation
To use ES6, you'll need to specify a babel config for your files. Right now, this is done in the config file itself. All babel deps should be installed to your project's `node_modules` directory.
```javascript
// fab.config.js
module.exports = {
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
```

## Example
To run the example, clone this repo, then:
```bash
# move into example dir
cd fab/example
# install deps
yarn
# compile JS
npm run dev
# serve index.html and update with changes
cd public/ && live-server 
```

MIT License
