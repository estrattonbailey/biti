# fab
Generate static HTML with React.

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
Fab can be used from the command line, or in Node via the API.

#### Command Line
Command line usage requires a `fab.config.js` file, and that the project you're compiling has React installed and imported at the top of each template file.
```javascript
// fab.config.js
module.exports = {
  dest: './site',
  pages: [
    {
      template: require('./path/to/Root.js'), 
      route: '/',
      locals: { title: 'Local data!' }
    },
    {
      template: require('./path/to/Products.js'), 
      route: 'products'
    }
  ]
}
```

Then, run fab, and your pages will be compiled to `<cwd>/<route>/index.html`.
```bash
fab
```

#### Via API
Via the API, you can manually add pages to a collection, and render them all as you wish.
```javascript
const fab = require('fab.js')
const data = require('./data.js')

// specify site output dir
fab.dest('./path/to/site')

// add data as global props
fab.data(data)

// add an array of pages
fab.pages([
  {
    template: require('./path/to/Component.js'),
    route: 'design'
  },
  {
    template: require('./path/to/Component.js'),
    route: 'development'
  }
])

// add a single page
fab.pages({
  template: require('./path/to/Component.js'),
  route: 'contact'
})

// generate pages from JSON (blog posts, for example)
data.pages.forEach(p => {
  fab.pages({
    template: require('./path/to/Component.js'),
    route: p.url,
    locals: p.content
  })
})

fab.renderPages() // render to dest path
```

MIT License
