# biti
The tiny yet powerful React static site generator.

## Install
`biti` can be installed globally and used via the CLI, or locally and used via npm
scripts or the Node API.

```bash
npm i biti -g
```

## Getting started
`biti` is pretty simple. It operates on a single directory of pages, which each
define and export properties and methods that `biti` uses to render the page.

For the examples here, we'll use `/pages` as our pages directory, but you could
call it anything.

#### Configuring a page
Each page requires the following exports:
- `pathname` - string - the path where you'd like the page to appear
- `view` - function - a function that returns a React component

An simple page might look like this:

```javascript
import React from 'react'

export const pathname = '/about'

export function view () {
  return (
    <>
      <h1>About Us</h1>
      <p>...</p>
    </>
  )
}
```

#### Static data
Pages can also export a `props` object, which will be passed to the `view`
function when rendering.

```javascript
import React from 'react'

export const pathname = '/about'

export const props = {
  title: 'About Us',
  description: '...'
}

export function view (props) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </>
  )
}
```

#### Loading data
Routes that require data or those that need dynamic properties can define a
`config` function that *returns* a page config containing the same properties
listed above.

These values will be *deeply merged* with whatever static exports were provided.

```javascript
import React from 'react'
import { getAboutPage } from './lib/api.js'

export const pathname = '/about'

export const props = {
  title: 'About Us',
  team: [
    'Eric'
  ]
}

export function config () {
  return getAboutPage()
    .then(res => {
      return {
        props: {
          team: res.team
        }
      }
    })
}

export function view (props) {
  return (
    <>
      <h1>{props.title}</h1>

      <h2>Team</h2>

      {props.team.map(name => (
        <p key={name}>{name}</p>
      ))}
    </>
  )
}
```

#### Generating pages from loaded data
For generative pages and pagination, the `config` function *can also return an
array of page configs*. Each of these configs should define its own `pathname`,
so that each page is rendered separately.

The following example will generate a page for each post returned from
`getBlogPosts`:

```javascript
import React from 'react'
import { getBlogPosts } from './lib/api.js'

export function config () {
  return getBlogPosts()
    .then(posts => {
      return posts.map(post => ({
        pathname: `/posts/${post.slug}`,
        props: {
          title: post.title,
          content: post.content
        }
      }))
    })
}

export function view (props) {
  return (
    <>
      <h1>{props.title}</h1>

      <article>
        {props.content}
      </article>
    </>
  )
}
```

#### Pathname nesting
As we've seen above, `pathname`s can be defined statically, or dynamically. They
can also be defined using the actual file structure of the `/pages` directory.

Let's say we have the following directory structure:

```bash
pages/
  - Home.js
  - posts/
    - Post.js
```

The pathname(s) defined in `/pages/posts/Post.js` will be joined to the name
of the directory, `posts`:

```javascript
import React from 'react'

export const pathname = 'my-post'

export function view () {
  return (
    <>
      ...
    </>
  )
}
```

The resulting page will be rendered as `/posts/my-post` 👍

## Configuration
`biti` supports minimal configuration, and otherwise falls back to smart
defaults. To define a config for all rendering tasks, you can create a
`biti.config.js` file.

`biti` supports the following properties on the config file:
- `env` - object - properties on this object will be attached to `process.env`
  for use globally throughout your pages and components
- `alias` - object - module aliases

Example:

```javascript
module.exports = {
  env: {
    API_KEY: 'abcdefg'
  },
  alias: {
    components: './src/components'
  }
}
```

#### Default config
By default, `biti` defines a single alias `@` that points to `process.cwd()`.
You can use it throughout your templates like this:

```javascript
import Component from '@/src/components/Component.js'
```

## CLI
`biti` only has two commands: `render` and `watch`.

Both follow the same pattern:

```bash
biti <command> <src> <dest>
```

For example:

```bash
biti render /pages /static
```

#### Watching
A very cool feature of `biti` is the smart file watcher. Instead of re-rendering
the whole `/pages` directory on any file change, `biti` smartly traverses the
file tree, so that when a given file updates, **only the pages that depend on
that file update**.

This also means that the `config` function (if present) will only fire for the
pages that were affected by a file update. All together, it means that the
development process is much faster 🔥

## API
Using `biti` programmatically is virtually the same as using the CLI, only
you'll need to pass your configuration object manually.

```javascript
const biti = require('biti')

const config = {
  env: { ... },
  alias: { ... }
}

const app = biti(config)
```

Both `render` and `watch` have the following signature:

```javascript
app.render(src, dest[, callback])
```

#### render
Renders all pages from `src` `dest`, calling the callback on each render or
error. Returns a `Promise`

```javascript
app
  .render('/src', '/static', (e, pathname) => {
    if (e) return console.error(e)
    console.log(`rendering ${pathname}`)
  })
  .then(() => {
    console.log('rendering complete')
  })
```

#### watch
Watches all pages in `src` and renders to `dest` on file change, calling the
callback on each render or error.

```javascript
app
  .watch('/src', '/static', (e, pathname) => {
    if (e) return console.error(e)
    console.log(`rendering ${pathname}`)
  })
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
