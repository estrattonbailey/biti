# biti
The React static site generator.

## Install
```bash
npm i biti --g
```

## Usage
```
cwd/
  - package.json
  - pages/
    - Home.js
  - components/
    - Nav.js
```
```javascript
// pages/Home.js

import React from 'react'
import Nav from '@/components/Nav.js' // @ points to cwd

export const path = '' // route name

export const state = { title: 'My Home Page' }

export async function config () {
  const page = await getHomePage()
  return {
    state: {
      description: page.description
    }
  }
}

export function view (props) {
  return (
    <div>
      <Nav />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}
```
Then, to build all templates in `pages/` to a new `static/` dir:
```bash
biti render pages/ static/
```
Or to watch for file changes during dev:
```bash
biti watch pages/ static/
```

### Pagination
If the exported `config` function (which is optional) returns an array, it will
assume it is an array of page configs. The below will output a page to `static/`
for every valid page config in the returned array.
```javascript
// pages/Page.js

import React from 'react'
import Nav from '@/components/Nav.js' // @ points to cwd

export async function config () {
  const pages = await getAllPages()
  return pages.map(page => ({
    path: page.slug,
    state: {
      title: page.title,
      description: page.description
    }
  }))
}

export function view (props) {
  return (
    <div>
      <Nav />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
