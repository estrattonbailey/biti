const getModule = require('which-module')
const chokidar = require('chokidar')
const readdir = require('recursive-readdir')
const req = require('./require.js')

const log = require('./logger.js')('fab')

/**
 * recursively walk dependeccies of a Module
 */
function flattenDeps (m, arr) {
  for (let c of m.children) {
    if (arr.indexOf(c.filename) > -1) continue

    arr.push(c.filename)
    flattenDeps(c, arr)
  }

  return arr
}

/**
 * gets all files in the dir and
 * passes to flattenDeps to get a flat
 * array of all dependencies
 */
function getDeps (dir, cb) {
  readdir(dir, (e, files) => {
    let obj = {}

    for (let file of files) {
      const { mod, err } = req(file)

      if (err) {
        log.error(err.message)
        continue
      }

      if (!mod) continue

      const m = getModule(mod)

      obj[m.id] = flattenDeps(m, [m.filename])
    }

    cb && cb(obj)
  })
}

/**
 * create inverse dep tree
 */
function createTree (deps) {
  let dic = {}

  for (const key in deps) {
    const val = deps[key]
    for (const file of val) {
      dic[file] = (dic[file] || []).concat(key)
    }
  }

  return dic
}

function walkDir (dir) {
  return new Promise(r => {
    getDeps(dir, deps => {
      const tree = createTree(deps)
      const roots = Object.keys(tree)

      r({
        tree,
        roots
      })
    })
  })
}

/**
 * invalidate the cache for a file,
 * anywhere in the tree
 */
function cleanDeps (file, tree) {
  const dependents = tree[file]

  if (!dependents) return

  for (const f of dependents) {
    delete require.cache[f]

    // recursive
    if (f !== file && tree[f]) {
      cleanDeps(f, tree)
    }
  }

  return dependents
}

module.exports = function watch (dir, opts) {
  let tree
  let roots
  let watcher

  const events = {}

  function emit(ev, ...data) {
    return events[ev] ? events[ev].map(fn => fn(...data)) : []
  }

  /**
   * update the file tree
   */
  function walk () {
    return walkDir(dir).then(({ tree: t, roots: r }) => {
      tree = t
      roots = r
      watcher.add(r)
    })
  }

  watcher = chokidar.watch(dir, {
    ignored: /DS_Store/,
    ignoreInitial: true,
    ...opts
  })
    .on('add', async file => {
      await walk()
      const dependents = await cleanDeps(file, tree)
      dependents && emit('change', dependents, file)
    })
    .on('unlink', async file => {
      delete require.cache[file]
      // walk old tree while file is still cached there
      const dependents = await cleanDeps(file, tree)
      dependents && emit('change', dependents, file)
      // create new tree
      await walk()
    })
    .on('change', async file => {
      delete require.cache[file]
      await walk()
      const dependents = await cleanDeps(file, tree)
      dependents && emit('change', dependents, file)
    })

  /**
   * initial call
   */
  walk()

  return {
    on (ev, fn) {
      events[ev] = events[ev] ? events[ev].concat(fn) : [ fn ]
      return () => events[ev].slice(events[ev].indexOf(fn), 1)
    }
  }
}
