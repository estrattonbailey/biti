const path = require('path')
const getModule = require('which-module')
const chokidar = require('chokidar')
const readdir = require('recursive-readdir')
const req = require('./require.js')

const log = require('./logger.js')('fab')

/**
 * recursively walk dependeccies of a Module
 */
function flatten (children, obj, carry = []) {
  for (let child of children) {
    // filter out dupes
    if (carry.indexOf(child.filename) > -1) continue

    carry.push(child.filename)

    // recurse
    flatten(child.children, obj, carry)

    // step down a level
    obj[child.id] = flatten(child.children, obj, [ child.filename ])
  }

  return carry
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

      const { id, children, filename } = getModule(mod)
      obj[id] = flatten(children, obj, [ filename ])
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

      r({ tree, roots })
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

    // clear out file wherever it appears in the tree
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
   * clear cache for changedFile and its deps,
   * then filter out non-tracked files and fire
   * a change event
   */
  async function prepareUpdate (changedFile) {
    try {
      delete require.cache[changedFile]
    } catch (e) {}

    const dependents = await cleanDeps(changedFile, tree)

    // filter out files not from the tracked dir
    const trackedFiles = dependents.filter(dep => dep.indexOf(dir) > -1)

    trackedFiles && emit('change', trackedFiles, changedFile)
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
      prepareUpdate(file)
    })
    .on('unlink', async file => {
      prepareUpdate(file)
      await walk()
    })
    .on('change', async file => {
      prepareUpdate(file)
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
