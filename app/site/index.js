(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Layzr.js 2.2.1 - A small, fast, and modern library for lazy loading images.
 * Copyright (c) 2016 Michael Cavalea - http://callmecavs.github.io/layzr.js/
 * License: MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Layzr=e()}(this,function(){"use strict";var t={};t["extends"]=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};var e=function(){function e(t,e){return c[t]=c[t]||[],c[t].push(e),this}function n(t,n){return n._once=!0,e(t,n),this}function r(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return e?c[t].splice(c[t].indexOf(e),1):delete c[t],this}function i(t){for(var e=this,n=arguments.length,i=Array(n>1?n-1:0),o=1;n>o;o++)i[o-1]=arguments[o];var s=c[t]&&c[t].slice();return s&&s.forEach(function(n){n._once&&r(t,n),n.apply(e,i)}),this}var o=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],c={};return t["extends"]({},o,{on:e,once:n,off:r,emit:i})},n=function(){function t(){return window.scrollY||window.pageYOffset}function n(){d=t(),r()}function r(){l||(requestAnimationFrame(function(){return u()}),l=!0)}function i(t){return t.getBoundingClientRect().top+d}function o(t){var e=d,n=e+v,r=i(t),o=r+t.offsetHeight,c=m.threshold/100*v;return o>=e-c&&n+c>=r}function c(t){if(w.emit("src:before",t),p&&t.hasAttribute(m.srcset))t.setAttribute("srcset",t.getAttribute(m.srcset));else{var e=g>1&&t.getAttribute(m.retina);t.setAttribute("src",e||t.getAttribute(m.normal))}w.emit("src:after",t),[m.normal,m.retina,m.srcset].forEach(function(e){return t.removeAttribute(e)}),a()}function s(t){var e=t?"addEventListener":"removeEventListener";return["scroll","resize"].forEach(function(t){return window[e](t,n)}),this}function u(){return v=window.innerHeight,h.forEach(function(t){return o(t)&&c(t)}),l=!1,this}function a(){return h=Array.prototype.slice.call(document.querySelectorAll("["+m.normal+"]")),this}var f=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],d=t(),l=void 0,h=void 0,v=void 0,m={normal:f.normal||"data-normal",retina:f.retina||"data-retina",srcset:f.srcset||"data-srcset",threshold:f.threshold||0},p=document.body.classList.contains("srcset")||"srcset"in document.createElement("img"),g=window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI,w=e({handlers:s,check:u,update:a});return w};return n});
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createBar = function createBar(root, classname) {
  var o = document.createElement('div');
  var i = document.createElement('div');

  o.className = classname;
  i.className = classname + '__inner';
  o.appendChild(i);
  root.insertBefore(o, root.children[0]);

  return {
    outer: o,
    inner: i
  };
};

exports.default = function () {
  var root = arguments.length <= 0 || arguments[0] === undefined ? document.body : arguments[0];
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var timer = null;
  var speed = opts.speed || 200;
  var classname = opts.classname || 'putz';
  var trickle = opts.trickle || 5;
  var state = {
    active: false,
    progress: 0
  };

  var bar = createBar(root, classname);

  var render = function render() {
    var val = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    state.progress = val;
    bar.inner.style.cssText = '\n      transform: translateY(' + (state.active ? '0' : '-100%') + ') translateX(' + (-100 + state.progress) + '%);';
  };

  var go = function go(val) {
    if (!state.active) {
      return;
    }
    render(Math.min(val, 95));
  };

  var inc = function inc() {
    var val = arguments.length <= 0 || arguments[0] === undefined ? Math.random() * trickle : arguments[0];
    return go(state.progress + val);
  };

  var end = function end() {
    state.active = false;
    render(100);
    setTimeout(function () {
      return render();
    }, speed);
    if (timer) {
      clearTimeout(timer);
    }
  };

  var start = function start() {
    state.active = true;
    inc();
  };

  var putz = function putz() {
    var interval = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];

    if (!state.active) {
      return;
    }
    timer = setInterval(function () {
      return inc();
    }, interval);
  };

  return Object.create({
    putz: putz,
    start: start,
    inc: inc,
    go: go,
    end: end,
    getState: function getState() {
      return state;
    }
  }, {
    bar: {
      value: bar
    }
  });
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var run = function run(cb, args) {
  cb();
  args.length > 0 && args.shift().apply(undefined, _toConsumableArray(args));
};

var tarry = exports.tarry = function tarry(cb) {
  var delay = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var override = 'number' === typeof args[0] ? args[0] : null;
    return 'number' === typeof override && override > -1 ? tarry(cb, override) : 'number' === typeof delay && delay > -1 ? setTimeout(function () {
      return run(cb, args);
    }, delay) : run(cb, args);
  };
};

var queue = exports.queue = function queue() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function () {
    return args.shift().apply(undefined, args);
  };
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var findLink = function findLink(id, data) {
  return data.filter(function (l) {
    return l.id === id;
  })[0];
};

var createLink = function createLink(_ref, data) {
  var answers = _ref.answers;
  return answers.forEach(function (a) {
    var isPath = /^\//.test(a.next) ? true : false;
    var isGIF = /gif/.test(a.next) ? true : false;
    a.next = isPath || isGIF ? a.next : findLink(a.next, data);
  });
};

var createStore = exports.createStore = function createStore(questions) {
  questions.map(function (q) {
    return createLink(q, questions);
  });
  return questions;
};

exports.default = function (questions) {
  return {
    store: createStore(questions),
    getActive: function getActive() {
      return this.store.filter(function (q) {
        return q.id == window.location.hash.split(/#/)[1];
      })[0] || this.store[0];
    }
  };
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  id: 1,
  prompt: 'hi! what brings you to this neck of the interwebs?',
  answers: [{
    value: 'who r u',
    next: 2
  }, {
    value: 'hiring',
    next: 3
  }, {
    value: 'it\'s your mom',
    next: 4
  }, {
    value: 'funny jokes',
    next: 5
  }]
}, {
  id: 2,
  prompt: 'i\'m melanie – a graphic designer working in experiential marketing & proud iowan trying to eat ALL the BLTs',
  answers: [{
    value: 'what\'s experiential?',
    next: 6
  }, {
    value: 'what\'s a BLT?',
    next: 7
  }]
}, {
  id: 3,
  prompt: 'rad! can i show you some projects i\'ve worked on?',
  answers: [{
    value: 'yes, please!',
    next: '/work'
  }, {
    value: 'nah, tell me about you',
    next: '/about'
  }, {
    value: 'i\'ll email you instead',
    next: '/contact'
  }]
}, {
  id: 4,
  prompt: 'hi mom! i love you!',
  answers: [{
    value: ':) i love you too!',
    next: 8
  }, {
    value: 'jk, not your mom',
    next: 9
  }]
}, {
  id: 5,
  prompt: 'what\'s funnier than a rhetorical question?',
  answers: [{
    value: 'yes',
    next: 10
  }, {
    value: 'no',
    next: 'https://media.giphy.com/media/P2Hy88rAjQdsQ/giphy.gif'
  }]
}, {
  id: 6,
  prompt: 'experiential is this cool niche type of marketing, ya know?',
  answers: [{
    value: 'sounds cool. what have you done?',
    next: '/work'
  }, {
    value: 'why do you like it?',
    next: 11
  }]
}, {
  id: 7,
  prompt: 'take a wild guess...',
  answers: [{
    value: 'beef liver toast',
    next: 'https://media.giphy.com/media/oFOs10SJSnzos/giphy.gif'
  }, {
    value: 'blueberry lemon tart',
    next: 'https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif'
  }, {
    value: 'bacon lettuce tomato',
    next: 'https://media.giphy.com/media/fqzxcmlY7opOg/giphy.gif'
  }]
}, {
  id: 8,
  prompt: 'so... can i ship laundry home to iowa?',
  answers: [{
    value: 'of course!',
    next: 'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif'
  }, {
    value: 'yeah, still not your mom...',
    next: 12
  }]
}, {
  id: 9,
  prompt: 'clicking for fun, huh? good luck with this one.',
  answers: [{
    value: 'blue pill',
    next: 'https://media.giphy.com/media/G7GNoaUSH7sMU/giphy.gif'
  }, {
    value: 'red pill',
    next: 'https://media.giphy.com/media/UjujGY3mA3Jle/giphy.gif'
  }]
}, {
  id: 10,
  prompt: 'pancakes or waffles?',
  answers: [{
    value: 'french toast',
    next: 'https://media.giphy.com/media/14nb6TlIRlaN1u/giphy.gif'
  }]
}, {
  id: 11,
  prompt: 'i like experiential because it\'s just super cool, okay?',
  answers: [{
    value: 'what are your favorite projects?',
    next: 14
  }, {
    value: 'i have questions! can i email you?',
    next: '/contact'
  }]
}, {
  id: 12,
  prompt: 'taking this a little far don\'t you think?',
  answers: [{
    value: 'sure am',
    next: 'https://media.giphy.com/media/qINsfDGI0z9yU/giphy.gif'
  }, {
    value: 'must click ALL buttons',
    next: 13
  }]
}, {
  id: 13,
  prompt: 'yeah?',
  answers: [{
    value: 'clicking this may harm a kitten',
    next: 'https://media.giphy.com/media/IgghkXWkdnEEo/giphy.gif'
  }]
}, {
  id: 14,
  prompt: 'of course I love my own work, but these projects deserve some serious props',
  answers: [{
    value: 'project 1',
    next: 'https://twitter.com'
  }, {
    value: 'project 2',
    next: 'https://twitter.com'
  }, {
    value: 'project 3',
    next: 'https://twitter.com'
  }]
}];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.template = exports.title = exports.button = exports.div = undefined;

var _h = require('h0');

var _h2 = _interopRequireDefault(_h);

var _colors = require('../lib/colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var div = exports.div = (0, _h2.default)('div');
var button = exports.button = (0, _h2.default)('button')({ class: 'h2 mv0 inline-block' });
var title = exports.title = (0, _h2.default)('p')({ class: 'h1 mt0 mb05 cb' });

var template = exports.template = function template(_ref, cb) {
  var prompt = _ref.prompt;
  var answers = _ref.answers;

  return div({ class: 'question' })(title(prompt), div.apply(undefined, _toConsumableArray(answers.map(function (a, i) {
    return button({
      onclick: function onclick(e) {
        return cb(a.next);
      },
      style: {
        color: _colors2.default.colors[i]
      }
    })(a.value);
  }))));
};

},{"../lib/colors":10,"h0":22}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tarry = require('tarry.js');

exports.default = function () {
  var modal = document.getElementById('gif');
  var img = modal.getElementsByTagName('img')[0];

  var show = (0, _tarry.tarry)(function () {
    return modal.style.display = 'block';
  });
  var hide = (0, _tarry.tarry)(function () {
    return modal.style.display = 'none';
  });
  var toggle = (0, _tarry.tarry)(function () {
    return modal.classList.contains('is-active') ? modal.classList.remove('is-active') : modal.classList.add('is-active');
  });

  var lazy = function lazy(url, cb) {
    var burner = document.createElement('img');

    burner.onload = function () {
      return cb(url);
    };

    burner.src = url;
  };

  var open = function open(url) {
    window.loader.start();
    window.loader.putz(500);

    lazy(url, function (url) {
      img.src = url;
      (0, _tarry.queue)(show, toggle(200))();
      window.loader.end();
    });
  };

  var close = function close() {
    (0, _tarry.queue)(toggle, hide(200))();
  };

  modal.onclick = close;

  return {
    open: open,
    close: close
  };
};

},{"tarry.js":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('../lib/router');

var _router2 = _interopRequireDefault(_router);

var _index = require('./data/index.js');

var _index2 = _interopRequireDefault(_index);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _giffer = require('./giffer');

var _giffer2 = _interopRequireDefault(_giffer);

var _elements = require('./elements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prev = void 0;
var data = (0, _data2.default)(_index2.default);

/**
 * Render template and append to DOM
 */
var render = function render(next) {
  var questionRoot = document.getElementById('questionRoot');

  var el = (0, _elements.template)(next, update);
  questionRoot && questionRoot.appendChild(el);
  return el;
};

/**
 * Handle DOM updates, other link clicks
 */
var update = function update(next) {
  var questionRoot = document.getElementById('questionRoot');

  var isGIF = /giphy/.test(next);
  if (isGIF) return (0, _giffer2.default)().open(next);

  var isPath = /^\//.test(next);
  if (isPath) return _router2.default.go(next);

  if (prev && questionRoot && questionRoot.contains(prev)) questionRoot.removeChild(prev);

  prev = render(next);

  window.location.hash = next.id;
};

/**
 * Wait until new DOM is present before
 * trying to render to it
 */
_router2.default.on('after:route', function (_ref) {
  var route = _ref.route;

  if (/(^\/|\/#[0-9]|#[0-9])/.test(route)) {
    update(data.getActive());
  }
});

exports.default = function () {
  prev = render(data.getActive());
};

},{"../lib/router":11,"./data":4,"./data/index.js":5,"./elements":6,"./giffer":7}],9:[function(require,module,exports){
'use strict';

var _putz = require('putz');

var _putz2 = _interopRequireDefault(_putz);

var _router = require('./lib/router');

var _router2 = _interopRequireDefault(_router);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _colors = require('./lib/colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loader = window.loader = (0, _putz2.default)(document.body, {
  speed: 100,
  trickle: 10
});

window.addEventListener('DOMContentLoaded', function () {
  (0, _app2.default)();

  _router2.default.on('after:route', function (_ref) {
    var route = _ref.route;

    _colors2.default.update();
  });

  _colors2.default.update();
});

},{"./app":8,"./lib/colors":10,"./lib/router":11,"putz":2}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootStyle = document.createElement('style');
document.head.appendChild(rootStyle);

var colors = ['#35D3E8', '#FF4E42', '#FFEA51'];

var randomColor = function randomColor() {
  return colors[Math.round(Math.random() * (2 - 0) + 0)];
};

var saveColor = function saveColor(c) {
  return localStorage.setItem('mjs', JSON.stringify({
    color: c
  }));
};

var readColor = function readColor() {
  return localStorage.getItem('mjs') ? JSON.parse(localStorage.getItem('mjs')).color : null;
};

var getColor = function getColor() {
  var c = randomColor();
  var prev = readColor();

  while (c === prev) {
    c = randomColor();
  }

  saveColor(c);
  return c;
};

var update = function update() {
  var color = getColor();

  rootStyle.innerHTML = '\n    body { color: ' + color + ' }\n    ::-moz-selection {\n      background-color: ' + color + ';\n    }\n    ::selection {\n      background-color: ' + color + ';\n    }\n  ';
};

exports.default = {
  update: update,
  colors: colors
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layzr = require('layzr.js');

var _layzr2 = _interopRequireDefault(_layzr);

var _operator = require('../../../../operator');

var _operator2 = _interopRequireDefault(_operator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Send page views to 
 * Google Analytics
 */
var gaTrackPageView = function gaTrackPageView(path, title) {
  var ga = window.ga ? window.ga : false;

  if (!ga) return;

  ga('set', { page: path, title: title });
  ga('send', 'pageview');
};
// import operator from 'operator.js'


var images = (0, _layzr2.default)({});
images.update().check();
window.images = images;

var app = (0, _operator2.default)({
  root: '#root'
});

app.on('after:route', function (_ref) {
  var route = _ref.route;
  var title = _ref.title;

  gaTrackPageView(route, title);
  images.update().check();
});

app.on('after:transition', function () {
  return loader && loader.end();
});

window.app = app;

exports.default = app;

},{"../../../../operator":12,"layzr.js":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _loop = require('loop.js');

var _loop2 = _interopRequireDefault(_loop);

var _delegate = require('delegate');

var _delegate2 = _interopRequireDefault(_delegate);

var _nanoajax = require('nanoajax');

var _nanoajax2 = _interopRequireDefault(_nanoajax);

var _navigo = require('navigo');

var _navigo2 = _interopRequireDefault(_navigo);

var _dom = require('./lib/dom.js');

var _dom2 = _interopRequireDefault(_dom);

var _util = require('./lib/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _navigo2.default(_util.origin);

var state = {
  _state: {
    route: '',
    title: '',
    prev: {
      route: '/',
      title: ''
    }
  },
  get route() {
    return this._state.route;
  },
  set route(loc) {
    this._state.prev.route = this.route;
    this._state.route = loc;
    (0, _util.setActiveLinks)(loc);
  },
  get title() {
    return this._state.title;
  },
  set title(val) {
    this._state.prev.title = this.title;
    this._state.title = val;
    document.title = val;
  }
};

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var root = options.root || document.body;
  var duration = options.duration || 0;
  var ignore = options.ignore || [];

  var events = (0, _loop2.default)();
  var render = (0, _dom2.default)(root, duration, events);

  var instance = Object.create(_extends({}, events, {
    stop: function stop() {
      state.paused = true;
    },
    start: function start() {
      state.paused = false;
    },

    go: go,
    push: push
  }), {
    getState: {
      value: function value() {
        return state._state;
      }
    }
  });

  state.route = window.location.pathname;
  state.title = document.title;

  (0, _delegate2.default)(document, 'a', 'click', function (e) {
    var a = e.delegateTarget;
    var href = a.getAttribute('href') || '/';
    var route = (0, _util.sanitize)(href);

    if (!_util.link.isSameOrigin(href) || a.getAttribute('rel') === 'external' || matches(e, route) || _util.link.isHash(href)) {
      return;
    }

    e.preventDefault();

    if (_util.link.isSameURL(href)) {
      return;
    }

    (0, _util.saveScrollPosition)();

    go(_util.origin + '/' + route, function (to) {
      return router.navigate(to);
    });
  });

  window.onpopstate = function (e) {
    var to = e.target.location.href;

    if (matches(e, to)) {
      if (_util.link.isHash(to)) {
        return;
      }
      window.location.reload();
      return;
    }

    /**
     * Popstate bypasses router, so we 
     * need to tell it where we went to
     * without pushing state
     */
    go(to, function (loc) {
      return router.resolve(loc);
    });
  };

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';

    if (history.state && history.state.scrollTop !== undefined) {
      window.scrollTo(0, history.state.scrollTop);
    }

    window.onbeforeunload = _util.saveScrollPosition;
  }

  function go(route) {
    var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var to = (0, _util.sanitize)(route);

    events.emit('before:route', { route: to });

    if (state.paused) {
      return;
    }

    var req = get(_util.origin + '/' + to, function (title) {
      cb ? cb(to, title) : router.navigate(to);

      // Update state
      pushRoute(to, title);

      events.emit('after:route', { route: to, title: title });
    });
  }

  function push() {
    var loc = arguments.length <= 0 || arguments[0] === undefined ? state.route : arguments[0];
    var title = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    router.navigate(loc);
    state.route = loc;
    title ? state.title = title : null;
  }

  function get(route, cb) {
    return _nanoajax2.default.ajax({
      method: 'GET',
      url: route
    }, function (status, res, req) {
      if (req.status < 200 || req.status > 300 && req.status !== 304) {
        return window.location = _util.origin + '/' + state._state.prev.route;
      }
      render(req.response, cb);
    });
  }

  function pushRoute(loc) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    state.route = loc;
    title ? state.title = title : null;
  }

  function matches(event, route) {
    return ignore.filter(function (t) {
      if (Array.isArray(t)) {
        var res = t[1](route);
        if (res) {
          events.emit(t[0], { route: route, event: event });
        }
        return res;
      } else {
        return t(route);
      }
    }).length > 0 ? true : false;
  }

  return instance;
};

},{"./lib/dom.js":13,"./lib/util.js":14,"delegate":16,"loop.js":17,"nanoajax":19,"navigo":20}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tarry = require('tarry.js');

var _util = require('./util');

/**
 * Init new native parser
 */
var parser = new DOMParser();

/**
 * Get the target of the ajax req
 * @param {string} html Stringified HTML
 * @return {object} DOM node, #page
 */
var parseResponse = function parseResponse(html) {
  return parser.parseFromString(html, "text/html");
};

/**
 * Finds all <script> tags in the new
 * markup and evaluates their contents
 *
 * @param {object} root DOM node containing new markup via AJAX
 * @param {...object} sources Other DOM nodes to scrape script tags from 
 */
var evalScripts = function evalScripts(source) {
  var root = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var errors = [];
  var scripts = Array.prototype.slice.call(source.getElementsByTagName('script'));
  var existing = root ? Array.prototype.slice.call(root.getElementsByTagName('script')) : [];

  var dupe = function dupe(s) {
    return existing.filter(function (e) {
      return s.innerHTML === e.innerHTML && s.src === e.src;
    }).length > 0 ? true : false;
  };

  scripts.length > 0 && scripts.forEach(function (t) {
    var s = t.cloneNode(true);

    if (dupe(s)) return;

    s.setAttribute('data-ajaxed', 'true');

    try {
      eval(s.innerHTML);
    } catch (e) {
      errors.push(e);
    }

    try {
      root ? root.insertBefore(s, root.children[0]) : source.replaceChild(s, t);
    } catch (e) {
      errors.push(e);
      document.head.insertBefore(s, document.head.children[0]);
    }
  });

  if (errors.length > 0) {
    console.groupCollapsed('operator.js');
    errors.forEach(function (e) {
      return console.log(e);
    });
    console.groupEnd();
  }
};

/**
 * Get width/height of element or window
 *
 * @param {object} el Element or window
 * @param {string} type 'Height' or 'Width
 */
var returnSize = function returnSize(el, type) {
  var isWindow = el !== null && el.window ? true : false;

  if (isWindow) {
    return Math.max(el['outer' + type], document.documentElement['client' + type]);
  }

  return Math.max(el['offset' + type], el['client' + type]);
};

/**
 * Helper to smoothly swap old 
 * markup with new markup
 * 
 * @param {object} markup New node to append to DOM
 */

exports.default = function (root, duration, events) {
  return function (markup, cb) {
    var dom = parseResponse(markup);
    var title = dom.head.getElementsByTagName('title')[0].innerHTML;
    var main = document.querySelector(root);

    var start = (0, _tarry.tarry)(function () {
      events.emit('before:transition');
      document.documentElement.classList.add('is-transitioning');
      main.style.height = returnSize(main, 'Height') + 'px';
    }, duration);

    var render = (0, _tarry.tarry)(function () {
      main.innerHTML = dom.querySelector(root).innerHTML;
      cb(title, main);
      evalScripts(main);
      evalScripts(dom.head, document.head);
      (0, _util.restoreScrollPos)();
    }, duration);

    var removeTransitionStyles = (0, _tarry.tarry)(function () {
      document.documentElement.classList.remove('is-transitioning');
      main.style.height = '';
    }, duration);

    var signalEnd = (0, _tarry.tarry)(function () {
      return events.emit('after:transition');
    }, duration);

    (0, _tarry.queue)(start, render, removeTransitionStyles, signalEnd)();
  };
};

},{"./util":14,"tarry.js":21}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getOrigin = function getOrigin(url) {
  return url.origin || url.protocol + '//' + url.host;
};

var origin = exports.origin = getOrigin(window.location);

var originRegEx = exports.originRegEx = new RegExp(origin);

/**
 * Replace site origin, if present,
 * remove leading slash, if present.
 *
 * @param {string} url Raw URL to parse
 * @return {string} URL sans origin and sans leading comma
 */
var sanitize = exports.sanitize = function sanitize(url) {
  var route = url.replace(originRegEx, '');
  var clean = route.match(/^\//) ? route.replace(/\/{1}/, '') : route; // remove /
  return clean === '' ? '/' : clean;
};

var parseURL = exports.parseURL = function parseURL(url) {
  var a = document.createElement('a');
  a.href = url;
  return a;
};

var link = exports.link = {
  isSameOrigin: function isSameOrigin(href) {
    return origin === getOrigin(parseURL(href));
  },
  isHash: function isHash(href) {
    return (/#/.test(href)
    );
  },
  isSameURL: function isSameURL(href) {
    return window.location.pathname === parseURL(href).pathname;
  }
};

var getScrollPosition = exports.getScrollPosition = function getScrollPosition() {
  return window.pageYOffset || window.scrollY;
};

var saveScrollPosition = exports.saveScrollPosition = function saveScrollPosition() {
  return window.history.replaceState({ scrollTop: getScrollPosition() }, '');
};

var restoreScrollPos = exports.restoreScrollPos = function restoreScrollPos() {
  var scrollTop = history.state ? history.state.scrollTop : undefined;
  if (history.state && scrollTop !== undefined) {
    window.scrollTo(0, scrollTop);
    return scrollTop;
  } else {
    window.scrollTo(0, 0);
  }
};

var activeLinks = [];
var setActiveLinks = exports.setActiveLinks = function setActiveLinks(route) {
  activeLinks.forEach(function (a) {
    return a.classList.remove('is-active');
  });
  activeLinks.splice(0, activeLinks.length);
  activeLinks.push.apply(activeLinks, _toConsumableArray(Array.prototype.slice.call(document.querySelectorAll('[href$="' + route + '"]'))));
  activeLinks.forEach(function (a) {
    return a.classList.add('is-active');
  });
};

},{}],15:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":18}],16:[function(require,module,exports){
var closest = require('closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector, true);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"closest":15}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var listeners = {};

  var on = function on(e) {
    var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    if (!cb) return;
    listeners[e] = listeners[e] || { queue: [] };
    listeners[e].queue.push(cb);
  };

  var emit = function emit(e) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var items = listeners[e] ? listeners[e].queue : false;
    items && items.forEach(function (i) {
      return i(data);
    });
  };

  return _extends({}, o, {
    emit: emit,
    on: on
  });
};

},{}],18:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],19:[function(require,module,exports){
(function (global){
// Best place to find information on XHR features is:
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

var reqfields = [
  'responseType', 'withCredentials', 'timeout', 'onprogress'
]

// Simple and small ajax function
// Takes a parameters object and a callback function
// Parameters:
//  - url: string, required
//  - headers: object of `{header_name: header_value, ...}`
//  - body:
//      + string (sets content type to 'application/x-www-form-urlencoded' if not set in headers)
//      + FormData (doesn't set content type so that browser will set as appropriate)
//  - method: 'GET', 'POST', etc. Defaults to 'GET' or 'POST' based on body
//  - cors: If your using cross-origin, you will need this true for IE8-9
//
// The following parameters are passed onto the xhr object.
// IMPORTANT NOTE: The caller is responsible for compatibility checking.
//  - responseType: string, various compatability, see xhr docs for enum options
//  - withCredentials: boolean, IE10+, CORS only
//  - timeout: long, ms timeout, IE8+
//  - onprogress: callback, IE10+
//
// Callback function prototype:
//  - statusCode from request
//  - response
//    + if responseType set and supported by browser, this is an object of some type (see docs)
//    + otherwise if request completed, this is the string text of the response
//    + if request is aborted, this is "Abort"
//    + if request times out, this is "Timeout"
//    + if request errors before completing (probably a CORS issue), this is "Error"
//  - request object
//
// Returns the request object. So you can call .abort() or other methods
//
// DEPRECATIONS:
//  - Passing a string instead of the params object has been removed!
//
exports.ajax = function (params, callback) {
  // Any variable used more than once is var'd here because
  // minification will munge the variables whereas it can't munge
  // the object access.
  var headers = params.headers || {}
    , body = params.body
    , method = params.method || (body ? 'POST' : 'GET')
    , called = false

  var req = getRequest(params.cors)

  function cb(statusCode, responseText) {
    return function () {
      if (!called) {
        callback(req.status === undefined ? statusCode : req.status,
                 req.status === 0 ? "Error" : (req.response || req.responseText || responseText),
                 req)
        called = true
      }
    }
  }

  req.open(method, params.url, true)

  var success = req.onload = cb(200)
  req.onreadystatechange = function () {
    if (req.readyState === 4) success()
  }
  req.onerror = cb(null, 'Error')
  req.ontimeout = cb(null, 'Timeout')
  req.onabort = cb(null, 'Abort')

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest')

    if (!global.FormData || !(body instanceof global.FormData)) {
      setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded')
    }
  }

  for (var i = 0, len = reqfields.length, field; i < len; i++) {
    field = reqfields[i]
    if (params[field] !== undefined)
      req[field] = params[field]
  }

  for (var field in headers)
    req.setRequestHeader(field, headers[field])

  req.send(body)

  return req
}

function getRequest(cors) {
  // XDomainRequest is only way to do CORS in IE 8 and 9
  // But XDomainRequest isn't standards-compatible
  // Notably, it doesn't allow cookies to be sent or set by servers
  // IE 10+ is standards-compatible in its XMLHttpRequest
  // but IE 10 can still have an XDomainRequest object, so we don't want to use it
  if (cors && global.XDomainRequest && !/MSIE 1/.test(navigator.userAgent))
    return new XDomainRequest
  if (global.XMLHttpRequest)
    return new XMLHttpRequest
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Navigo", [], factory);
	else if(typeof exports === 'object')
		exports["Navigo"] = factory();
	else
		root["Navigo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var PARAMETER_REGEXP = /([:*])(\w+)/g;
	var WILDCARD_REGEXP = /\*/g;
	var REPLACE_VARIABLE_REGEXP = '([^\/]+)';
	var REPLACE_WILDCARD = '(?:.*)';
	var FOLLOWED_BY_SLASH_REGEXP = '(?:\/|$)';
	
	function clean(s) {
	  if (s instanceof RegExp) return s;
	  return s.replace(/\/+$/, '').replace(/^\/+/, '/');
	}
	
	function regExpResultToParams(match, names) {
	  if (names.length === 0) return null;
	  if (!match) return null;
	  return match.slice(1, match.length).reduce(function (params, value, index) {
	    if (params === null) params = {};
	    params[names[index]] = value;
	    return params;
	  }, null);
	}
	
	function replaceDynamicURLParts(route) {
	  var paramNames = [],
	      regexp;
	
	  if (route instanceof RegExp) {
	    regexp = route;
	  } else {
	    regexp = new RegExp(clean(route).replace(PARAMETER_REGEXP, function (full, dots, name) {
	      paramNames.push(name);
	      return REPLACE_VARIABLE_REGEXP;
	    }).replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP);
	  }
	  return { regexp: regexp, paramNames: paramNames };
	}
	
	function findMatchedRoutes(url) {
	  var routes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	  return routes.map(function (route) {
	    var _replaceDynamicURLPar = replaceDynamicURLParts(route.route);
	
	    var regexp = _replaceDynamicURLPar.regexp;
	    var paramNames = _replaceDynamicURLPar.paramNames;
	
	    var match = url.match(regexp);
	    var params = regExpResultToParams(match, paramNames);
	
	    return match ? { match: match, route: route, params: params } : false;
	  }).filter(function (m) {
	    return m;
	  });
	}
	
	function match(url, routes) {
	  return findMatchedRoutes(url, routes)[0] || false;
	}
	
	function root(url, routes) {
	  var matched = findMatchedRoutes(url, routes.filter(function (route) {
	    var u = clean(route.route);
	
	    return u !== '' && u !== '*';
	  }));
	  var fallbackURL = clean(url);
	
	  if (matched.length > 0) {
	    return matched.map(function (m) {
	      return clean(url.substr(0, m.match.index));
	    }).reduce(function (root, current) {
	      return current.length < root.length ? current : root;
	    }, fallbackURL);
	  }
	  return fallbackURL;
	}
	
	function isPushStateAvailable() {
	  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
	}
	
	function Navigo(r, useHash) {
	  this._routes = [];
	  this.root = useHash && r ? r.replace(/\/$/, '/#') : r || null;
	  this._useHash = useHash;
	  this._paused = false;
	  this._destroyed = false;
	  this._lastRouteResolved = null;
	  this._notFoundHandler = null;
	  this._defaultHandler = null;
	  this._ok = !useHash && isPushStateAvailable();
	  this._listen();
	  this.updatePageLinks();
	}
	
	Navigo.prototype = {
	  helpers: {
	    match: match,
	    root: root,
	    clean: clean
	  },
	  navigate: function navigate(path, absolute) {
	    var to;
	
	    path = path || '';
	    if (this._ok) {
	      to = (!absolute ? this._getRoot() + '/' : '') + clean(path);
	      to = to.replace(/([^:])(\/{2,})/g, '$1/');
	      history[this._paused ? 'replaceState' : 'pushState']({}, '', to);
	      this.resolve();
	    } else if (typeof window !== 'undefined') {
	      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
	    }
	    return this;
	  },
	  on: function on() {
	    if (arguments.length >= 2) {
	      this._add(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
	    } else if (_typeof(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
	      for (var route in arguments.length <= 0 ? undefined : arguments[0]) {
	        this._add(route, (arguments.length <= 0 ? undefined : arguments[0])[route]);
	      }
	    } else if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
	      this._defaultHandler = arguments.length <= 0 ? undefined : arguments[0];
	    }
	    return this;
	  },
	  notFound: function notFound(handler) {
	    this._notFoundHandler = handler;
	  },
	  resolve: function resolve(current) {
	    var handler, m;
	    var url = (current || this._cLoc()).replace(this._getRoot(), '');
	
	    if (this._paused || url === this._lastRouteResolved) return false;
	    if (this._useHash) {
	      url = url.replace(/^\/#/, '/');
	    }
	    m = match(url, this._routes);
	
	    if (m) {
	      this._lastRouteResolved = url;
	      handler = m.route.handler;
	      m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params);
	      return m;
	    } else if (this._defaultHandler && (url === '' || url === '/')) {
	      this._defaultHandler();
	      return true;
	    } else if (this._notFoundHandler) {
	      this._notFoundHandler();
	    }
	    return false;
	  },
	  destroy: function destroy() {
	    this._routes = [];
	    this._destroyed = true;
	    clearTimeout(this._listenningInterval);
	    typeof window !== 'undefined' ? window.onpopstate = null : null;
	  },
	  updatePageLinks: function updatePageLinks() {
	    var self = this;
	
	    if (typeof document === 'undefined') return;
	
	    this._findLinks().forEach(function (link) {
	      if (!link.hasListenerAttached) {
	        link.addEventListener('click', function (e) {
	          var location = link.getAttribute('href');
	
	          if (!self._destroyed) {
	            e.preventDefault();
	            self.navigate(clean(location));
	          }
	        });
	        link.hasListenerAttached = true;
	      }
	    });
	  },
	  generate: function generate(name) {
	    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return this._routes.reduce(function (result, route) {
	      var key;
	
	      if (route.name === name) {
	        result = route.route;
	        for (key in data) {
	          result = result.replace(':' + key, data[key]);
	        }
	      }
	      return result;
	    }, '');
	  },
	  link: function link(path) {
	    return this._getRoot() + path;
	  },
	  pause: function pause(status) {
	    this._paused = status;
	  },
	  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
	    if (!isPushStateAvailable()) {
	      this.destroy();
	    }
	  },
	  _add: function _add(route) {
	    var handler = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
	      this._routes.push({ route: route, handler: handler.uses, name: handler.as });
	    } else {
	      this._routes.push({ route: route, handler: handler });
	    }
	    return this._add;
	  },
	  _getRoot: function _getRoot() {
	    if (this.root !== null) return this.root;
	    this.root = root(this._cLoc(), this._routes);
	    return this.root;
	  },
	  _listen: function _listen() {
	    var _this = this;
	
	    if (this._ok) {
	      window.onpopstate = function () {
	        _this.resolve();
	      };
	    } else {
	      (function () {
	        var cached = _this._cLoc(),
	            current = undefined,
	            _check = undefined;
	
	        _check = function check() {
	          current = _this._cLoc();
	          if (cached !== current) {
	            cached = current;
	            _this.resolve();
	          }
	          _this._listenningInterval = setTimeout(_check, 200);
	        };
	        _check();
	      })();
	    }
	  },
	  _cLoc: function _cLoc() {
	    if (typeof window !== 'undefined') {
	      return window.location.href;
	    }
	    return '';
	  },
	  _findLinks: function _findLinks() {
	    return [].slice.call(document.querySelectorAll('[data-navigo]'));
	  }
	};
	
	exports.default = Navigo;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var run = function run(cb, args) {
  cb();
  args.length > 0 && args.shift().apply(undefined, _toConsumableArray(args));
};

var tarry = exports.tarry = function tarry(cb) {
  var delay = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var override = 'number' === typeof args[0] ? args[0] : null;
    return 'number' === typeof override && override > -1 ? tarry(cb, override) : 'number' === typeof delay && delay > -1 ? setTimeout(function () {
      return run(cb, args);
    }, delay) : run(cb, args);
  };
};

var queue = exports.queue = function queue() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function () {
    return args.shift().apply(undefined, args);
  };
};

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _transformProps = require('./transform-props');

var _transformProps2 = _interopRequireDefault(_transformProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h = function h(tag) {
  return function () {
    return isProps(arguments.length <= 0 ? undefined : arguments[0]) ? applyProps(tag)(arguments.length <= 0 ? undefined : arguments[0]) : appendChildren(tag).apply(undefined, arguments);
  };
};

var isObj = function isObj(o) {
  return o !== null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
};

var isProps = function isProps(arg) {
  return isObj(arg) && !(arg instanceof Element);
};

var applyProps = function applyProps(tag) {
  return function (props) {
    return function () {
      if (isProps(arguments.length <= 0 ? undefined : arguments[0])) {
        return h(tag)(Object.assign({}, props, arguments.length <= 0 ? undefined : arguments[0]));
      }

      var el = h(tag).apply(undefined, arguments);
      var p = (0, _transformProps2.default)(props);
      Object.keys(p).forEach(function (k) {
        if (/^on/.test(k)) {
          el[k] = p[k];
        } else {
          el.setAttribute(k, p[k]);
        }
      });
      return el;
    };
  };
};

var appendChildren = function appendChildren(tag) {
  return function () {
    for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }

    var el = document.createElement(tag);
    children.map(function (c) {
      return c instanceof Element ? c : document.createTextNode(c);
    }).forEach(function (c) {
      return el.appendChild(c);
    });
    return el;
  };
};

exports.default = h;
},{"./transform-props":23}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var kebab = exports.kebab = function kebab(str) {
  return str.replace(/([A-Z])/g, function (g) {
    return '-' + g.toLowerCase();
  });
};

var parseValue = exports.parseValue = function parseValue(prop) {
  return function (val) {
    return typeof val === 'number' ? addPx(prop)(val) : val;
  };
};

var unitlessProperties = exports.unitlessProperties = ['lineHeight', 'fontWeight', 'opacity', 'zIndex'
// Probably need a few more...
];

var addPx = exports.addPx = function addPx(prop) {
  return function (val) {
    return unitlessProperties.includes(prop) ? val : val + 'px';
  };
};

var filterNull = exports.filterNull = function filterNull(obj) {
  return function (key) {
    return obj[key] !== null;
  };
};

var createDec = exports.createDec = function createDec(style) {
  return function (key) {
    return kebab(key) + ':' + parseValue(key)(style[key]);
  };
};

var styleToString = exports.styleToString = function styleToString(style) {
  return Object.keys(style).filter(filterNull(style)).map(createDec(style)).join(';');
};

var isStyleObject = exports.isStyleObject = function isStyleObject(props) {
  return function (key) {
    return key === 'style' && props[key] !== null && _typeof(props[key]) === 'object';
  };
};

var createStyle = exports.createStyle = function createStyle(props) {
  return function (key) {
    return isStyleObject(props)(key) ? styleToString(props[key]) : props[key];
  };
};

var reduceProps = exports.reduceProps = function reduceProps(props) {
  return function (a, key) {
    return Object.assign(a, _defineProperty({}, key, createStyle(props)(key)));
  };
};

var transformProps = exports.transformProps = function transformProps(props) {
  return Object.keys(props).reduce(reduceProps(props), {});
};

exports.default = transformProps;
},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbGF5enIuanMvZGlzdC9sYXl6ci5taW4uanMiLCJub2RlX21vZHVsZXMvcHV0ei9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90YXJyeS5qcy9pbmRleC5qcyIsInNyYy9qcy9hcHAvZGF0YS5qcyIsInNyYy9qcy9hcHAvZGF0YS9pbmRleC5qcyIsInNyYy9qcy9hcHAvZWxlbWVudHMuanMiLCJzcmMvanMvYXBwL2dpZmZlci5qcyIsInNyYy9qcy9hcHAvaW5kZXguanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbGliL2NvbG9ycy5qcyIsInNyYy9qcy9saWIvcm91dGVyLmpzIiwiLi4vb3BlcmF0b3IvaW5kZXguanMiLCIuLi9vcGVyYXRvci9saWIvZG9tLmpzIiwiLi4vb3BlcmF0b3IvbGliL3V0aWwuanMiLCIuLi9vcGVyYXRvci9ub2RlX21vZHVsZXMvY2xvc2VzdC9pbmRleC5qcyIsIi4uL29wZXJhdG9yL25vZGVfbW9kdWxlcy9kZWxlZ2F0ZS9zcmMvZGVsZWdhdGUuanMiLCIuLi9vcGVyYXRvci9ub2RlX21vZHVsZXMvbG9vcC5qcy9pbmRleC5qcyIsIi4uL29wZXJhdG9yL25vZGVfbW9kdWxlcy9tYXRjaGVzLXNlbGVjdG9yL2luZGV4LmpzIiwiLi4vb3BlcmF0b3Ivbm9kZV9tb2R1bGVzL25hbm9hamF4L2luZGV4LmpzIiwiLi4vb3BlcmF0b3Ivbm9kZV9tb2R1bGVzL25hdmlnby9saWIvbmF2aWdvLmpzIiwiLi4vb3BlcmF0b3Ivbm9kZV9tb2R1bGVzL3RhcnJ5LmpzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvaDAvZGlzdC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2gwL2Rpc3QvdHJhbnNmb3JtLXByb3BzLmpzIl0sIm5hbWVzIjpbXSwi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VSxDQUFWLEVBQWEsS0FBNUIsR0FBb0MsS0FBaEQ7QUFDQSxhQUFTLE1BQU0sT0FBTixDQUFjO0FBQUEsYUFBSyxFQUFFLElBQUYsQ0FBTDtBQUFBLEtBQWQsQ0FBVDtBQUNELEdBSEQ7O0FBS0Esc0JBQ0ssQ0FETDtBQUVFLGNBRkY7QUFHRTtBQUhGO0FBS0QsQzs7O0FDbkJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIExheXpyLmpzIDIuMi4xIC0gQSBzbWFsbCwgZmFzdCwgYW5kIG1vZGVybiBsaWJyYXJ5IGZvciBsYXp5IGxvYWRpbmcgaW1hZ2VzLlxuICogQ29weXJpZ2h0IChjKSAyMDE2IE1pY2hhZWwgQ2F2YWxlYSAtIGh0dHA6Ly9jYWxsbWVjYXZzLmdpdGh1Yi5pby9sYXl6ci5qcy9cbiAqIExpY2Vuc2U6IE1JVFxuICovXG4hZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKTp0LkxheXpyPWUoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0PXt9O3RbXCJleHRlbmRzXCJdPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHQpe2Zvcih2YXIgZT0xO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspe3ZhciBuPWFyZ3VtZW50c1tlXTtmb3IodmFyIHIgaW4gbilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobixyKSYmKHRbcl09bltyXSl9cmV0dXJuIHR9O3ZhciBlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LGUpe3JldHVybiBjW3RdPWNbdF18fFtdLGNbdF0ucHVzaChlKSx0aGlzfWZ1bmN0aW9uIG4odCxuKXtyZXR1cm4gbi5fb25jZT0hMCxlKHQsbiksdGhpc31mdW5jdGlvbiByKHQpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg8PTF8fHZvaWQgMD09PWFyZ3VtZW50c1sxXT8hMTphcmd1bWVudHNbMV07cmV0dXJuIGU/Y1t0XS5zcGxpY2UoY1t0XS5pbmRleE9mKGUpLDEpOmRlbGV0ZSBjW3RdLHRoaXN9ZnVuY3Rpb24gaSh0KXtmb3IodmFyIGU9dGhpcyxuPWFyZ3VtZW50cy5sZW5ndGgsaT1BcnJheShuPjE/bi0xOjApLG89MTtuPm87bysrKWlbby0xXT1hcmd1bWVudHNbb107dmFyIHM9Y1t0XSYmY1t0XS5zbGljZSgpO3JldHVybiBzJiZzLmZvckVhY2goZnVuY3Rpb24obil7bi5fb25jZSYmcih0LG4pLG4uYXBwbHkoZSxpKX0pLHRoaXN9dmFyIG89YXJndW1lbnRzLmxlbmd0aDw9MHx8dm9pZCAwPT09YXJndW1lbnRzWzBdP3t9OmFyZ3VtZW50c1swXSxjPXt9O3JldHVybiB0W1wiZXh0ZW5kc1wiXSh7fSxvLHtvbjplLG9uY2U6bixvZmY6cixlbWl0Oml9KX0sbj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtyZXR1cm4gd2luZG93LnNjcm9sbFl8fHdpbmRvdy5wYWdlWU9mZnNldH1mdW5jdGlvbiBuKCl7ZD10KCkscigpfWZ1bmN0aW9uIHIoKXtsfHwocmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7cmV0dXJuIHUoKX0pLGw9ITApfWZ1bmN0aW9uIGkodCl7cmV0dXJuIHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wK2R9ZnVuY3Rpb24gbyh0KXt2YXIgZT1kLG49ZSt2LHI9aSh0KSxvPXIrdC5vZmZzZXRIZWlnaHQsYz1tLnRocmVzaG9sZC8xMDAqdjtyZXR1cm4gbz49ZS1jJiZuK2M+PXJ9ZnVuY3Rpb24gYyh0KXtpZih3LmVtaXQoXCJzcmM6YmVmb3JlXCIsdCkscCYmdC5oYXNBdHRyaWJ1dGUobS5zcmNzZXQpKXQuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsdC5nZXRBdHRyaWJ1dGUobS5zcmNzZXQpKTtlbHNle3ZhciBlPWc+MSYmdC5nZXRBdHRyaWJ1dGUobS5yZXRpbmEpO3Quc2V0QXR0cmlidXRlKFwic3JjXCIsZXx8dC5nZXRBdHRyaWJ1dGUobS5ub3JtYWwpKX13LmVtaXQoXCJzcmM6YWZ0ZXJcIix0KSxbbS5ub3JtYWwsbS5yZXRpbmEsbS5zcmNzZXRdLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIHQucmVtb3ZlQXR0cmlidXRlKGUpfSksYSgpfWZ1bmN0aW9uIHModCl7dmFyIGU9dD9cImFkZEV2ZW50TGlzdGVuZXJcIjpcInJlbW92ZUV2ZW50TGlzdGVuZXJcIjtyZXR1cm5bXCJzY3JvbGxcIixcInJlc2l6ZVwiXS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiB3aW5kb3dbZV0odCxuKX0pLHRoaXN9ZnVuY3Rpb24gdSgpe3JldHVybiB2PXdpbmRvdy5pbm5lckhlaWdodCxoLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIG8odCkmJmModCl9KSxsPSExLHRoaXN9ZnVuY3Rpb24gYSgpe3JldHVybiBoPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbXCIrbS5ub3JtYWwrXCJdXCIpKSx0aGlzfXZhciBmPWFyZ3VtZW50cy5sZW5ndGg8PTB8fHZvaWQgMD09PWFyZ3VtZW50c1swXT97fTphcmd1bWVudHNbMF0sZD10KCksbD12b2lkIDAsaD12b2lkIDAsdj12b2lkIDAsbT17bm9ybWFsOmYubm9ybWFsfHxcImRhdGEtbm9ybWFsXCIscmV0aW5hOmYucmV0aW5hfHxcImRhdGEtcmV0aW5hXCIsc3Jjc2V0OmYuc3Jjc2V0fHxcImRhdGEtc3Jjc2V0XCIsdGhyZXNob2xkOmYudGhyZXNob2xkfHwwfSxwPWRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwic3Jjc2V0XCIpfHxcInNyY3NldFwiaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKSxnPXdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvfHx3aW5kb3cuc2NyZWVuLmRldmljZVhEUEkvd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSx3PWUoe2hhbmRsZXJzOnMsY2hlY2s6dSx1cGRhdGU6YX0pO3JldHVybiB3fTtyZXR1cm4gbn0pOyIsImNvbnN0IGNyZWF0ZUJhciA9IChyb290LCBjbGFzc25hbWUpID0+IHtcbiAgbGV0IG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBsZXQgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgby5jbGFzc05hbWUgPSBjbGFzc25hbWUgXG4gIGkuY2xhc3NOYW1lID0gYCR7Y2xhc3NuYW1lfV9faW5uZXJgXG4gIG8uYXBwZW5kQ2hpbGQoaSlcbiAgcm9vdC5pbnNlcnRCZWZvcmUobywgcm9vdC5jaGlsZHJlblswXSlcblxuICByZXR1cm4ge1xuICAgIG91dGVyOiBvLFxuICAgIGlubmVyOiBpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKHJvb3QgPSBkb2N1bWVudC5ib2R5LCBvcHRzID0ge30pID0+IHtcbiAgbGV0IHRpbWVyID0gbnVsbFxuICBjb25zdCBzcGVlZCA9IG9wdHMuc3BlZWQgfHwgMjAwXG4gIGNvbnN0IGNsYXNzbmFtZSA9IG9wdHMuY2xhc3NuYW1lIHx8ICdwdXR6J1xuICBjb25zdCB0cmlja2xlID0gb3B0cy50cmlja2xlIHx8IDUgXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgcHJvZ3Jlc3M6IDBcbiAgfVxuXG4gIGNvbnN0IGJhciA9IGNyZWF0ZUJhcihyb290LCBjbGFzc25hbWUpXG5cbiAgY29uc3QgcmVuZGVyID0gKHZhbCA9IDApID0+IHtcbiAgICBzdGF0ZS5wcm9ncmVzcyA9IHZhbFxuICAgIGJhci5pbm5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKCR7c3RhdGUuYWN0aXZlID8gJzAnIDogJy0xMDAlJ30pIHRyYW5zbGF0ZVgoJHstMTAwICsgc3RhdGUucHJvZ3Jlc3N9JSk7YFxuICB9XG5cbiAgY29uc3QgZ28gPSB2YWwgPT4ge1xuICAgIGlmICghc3RhdGUuYWN0aXZlKXsgcmV0dXJuIH1cbiAgICByZW5kZXIoTWF0aC5taW4odmFsLCA5NSkpXG4gIH1cblxuICBjb25zdCBpbmMgPSAodmFsID0gKE1hdGgucmFuZG9tKCkgKiB0cmlja2xlKSkgPT4gZ28oc3RhdGUucHJvZ3Jlc3MgKyB2YWwpXG5cbiAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgIHN0YXRlLmFjdGl2ZSA9IGZhbHNlXG4gICAgcmVuZGVyKDEwMClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHJlbmRlcigpLCBzcGVlZClcbiAgICBpZiAodGltZXIpeyBjbGVhclRpbWVvdXQodGltZXIpIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgIHN0YXRlLmFjdGl2ZSA9IHRydWVcbiAgICBpbmMoKVxuICB9XG5cbiAgY29uc3QgcHV0eiA9IChpbnRlcnZhbCA9IDUwMCkgPT4ge1xuICAgIGlmICghc3RhdGUuYWN0aXZlKXsgcmV0dXJuIH1cbiAgICB0aW1lciA9IHNldEludGVydmFsKCgpID0+IGluYygpLCBpbnRlcnZhbClcbiAgfVxuICBcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUoe1xuICAgIHB1dHosXG4gICAgc3RhcnQsXG4gICAgaW5jLFxuICAgIGdvLFxuICAgIGVuZCxcbiAgICBnZXRTdGF0ZTogKCkgPT4gc3RhdGVcbiAgfSx7XG4gICAgYmFyOiB7XG4gICAgICB2YWx1ZTogYmFyXG4gICAgfVxuICB9KVxufVxuIiwiY29uc3QgcnVuID0gKGNiLCBhcmdzKSA9PiB7XG4gIGNiKClcbiAgYXJncy5sZW5ndGggPiAwICYmIGFyZ3Muc2hpZnQoKSguLi5hcmdzKVxufVxuXG5leHBvcnQgY29uc3QgdGFycnkgPSAoY2IsIGRlbGF5ID0gbnVsbCkgPT4gKC4uLmFyZ3MpID0+IHtcbiAgbGV0IG92ZXJyaWRlID0gJ251bWJlcicgPT09IHR5cGVvZiBhcmdzWzBdID8gYXJnc1swXSA6IG51bGwgXG4gIHJldHVybiAnbnVtYmVyJyA9PT0gdHlwZW9mIG92ZXJyaWRlICYmIG92ZXJyaWRlID4gLTEgXG4gICAgPyB0YXJyeShjYiwgb3ZlcnJpZGUpIFxuICAgIDogJ251bWJlcicgPT09IHR5cGVvZiBkZWxheSAmJiBkZWxheSA+IC0xIFxuICAgICAgPyBzZXRUaW1lb3V0KCgpID0+IHJ1bihjYiwgYXJncyksIGRlbGF5KSBcbiAgICAgIDogcnVuKGNiLCBhcmdzKVxufVxuXG5leHBvcnQgY29uc3QgcXVldWUgPSAoLi4uYXJncykgPT4gKCkgPT4gYXJncy5zaGlmdCgpKC4uLmFyZ3MpXG4iLCJjb25zdCBmaW5kTGluayA9IChpZCwgZGF0YSkgPT4gZGF0YS5maWx0ZXIobCA9PiBsLmlkID09PSBpZClbMF1cblxuY29uc3QgY3JlYXRlTGluayA9ICh7IGFuc3dlcnMgfSwgZGF0YSkgPT4gYW5zd2Vycy5mb3JFYWNoKGEgPT4ge1xuICBsZXQgaXNQYXRoID0gL15cXC8vLnRlc3QoYS5uZXh0KSA/IHRydWUgOiBmYWxzZVxuICBsZXQgaXNHSUYgPSAvZ2lmLy50ZXN0KGEubmV4dCkgPyB0cnVlIDogZmFsc2VcbiAgYS5uZXh0ID0gaXNQYXRoIHx8IGlzR0lGID8gYS5uZXh0IDogZmluZExpbmsoYS5uZXh0LCBkYXRhKVxufSlcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gKHF1ZXN0aW9ucykgPT4ge1xuXHRxdWVzdGlvbnMubWFwKHEgPT4gY3JlYXRlTGluayhxLCBxdWVzdGlvbnMpKVxuXHRyZXR1cm4gcXVlc3Rpb25zXG59XG5cbmV4cG9ydCBkZWZhdWx0IHF1ZXN0aW9ucyA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RvcmU6IGNyZWF0ZVN0b3JlKHF1ZXN0aW9ucyksXG4gICAgZ2V0QWN0aXZlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZmlsdGVyKHEgPT4gcS5pZCA9PSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdCgvIy8pWzFdKVswXSB8fCB0aGlzLnN0b3JlWzBdXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBwcm9tcHQ6IGBoaSEgd2hhdCBicmluZ3MgeW91IHRvIHRoaXMgbmVjayBvZiB0aGUgaW50ZXJ3ZWJzP2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogJ3dobyByIHUnLFxuICAgICAgICBuZXh0OiAyIFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6ICdoaXJpbmcnLFxuICAgICAgICBuZXh0OiAzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogYGl0J3MgeW91ciBtb21gLFxuICAgICAgICBuZXh0OiA0XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogYGZ1bm55IGpva2VzYCxcbiAgICAgICAgbmV4dDogNVxuICAgICAgfVxuICAgIF1cbiAgfSxcblxuICB7XG4gICAgaWQ6IDIsXG4gICAgcHJvbXB0OiBgaSdtIG1lbGFuaWUg4oCTIGEgZ3JhcGhpYyBkZXNpZ25lciB3b3JraW5nIGluIGV4cGVyaWVudGlhbCBtYXJrZXRpbmcgJiBwcm91ZCBpb3dhbiB0cnlpbmcgdG8gZWF0IEFMTCB0aGUgQkxUc2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYHdoYXQncyBleHBlcmllbnRpYWw/YCxcbiAgICAgICAgbmV4dDogNiBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgd2hhdCdzIGEgQkxUP2AsXG4gICAgICAgIG5leHQ6IDdcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuXG4gIHtcbiAgICBpZDogMyxcbiAgICBwcm9tcHQ6IGByYWQhIGNhbiBpIHNob3cgeW91IHNvbWUgcHJvamVjdHMgaSd2ZSB3b3JrZWQgb24/YCxcbiAgICBhbnN3ZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgeWVzLCBwbGVhc2UhYCxcbiAgICAgICAgbmV4dDogJy93b3JrJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGBuYWgsIHRlbGwgbWUgYWJvdXQgeW91YCxcbiAgICAgICAgbmV4dDogJy9hYm91dCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgaSdsbCBlbWFpbCB5b3UgaW5zdGVhZGAsXG4gICAgICAgIG5leHQ6ICcvY29udGFjdCdcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuXG4gIHtcbiAgICBpZDogNCxcbiAgICBwcm9tcHQ6IGBoaSBtb20hIGkgbG92ZSB5b3UhYCxcbiAgICBhbnN3ZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgOikgaSBsb3ZlIHlvdSB0b28hYCxcbiAgICAgICAgbmV4dDogOFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGBqaywgbm90IHlvdXIgbW9tYCxcbiAgICAgICAgbmV4dDogOVxuICAgICAgfSxcbiAgICBdXG4gIH0sXG5cbiAge1xuICAgIGlkOiA1LFxuICAgIHByb21wdDogYHdoYXQncyBmdW5uaWVyIHRoYW4gYSByaGV0b3JpY2FsIHF1ZXN0aW9uP2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYHllc2AsXG4gICAgICAgIG5leHQ6IDEwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogYG5vYCxcbiAgICAgICAgbmV4dDogJ2h0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhL1AySHk4OHJBalFkc1EvZ2lwaHkuZ2lmJ1xuICAgICAgfSxcbiAgICBdXG4gIH0sXG5cbiAge1xuICAgIGlkOiA2LFxuICAgIHByb21wdDogYGV4cGVyaWVudGlhbCBpcyB0aGlzIGNvb2wgbmljaGUgdHlwZSBvZiBtYXJrZXRpbmcsIHlhIGtub3c/YCxcbiAgICBhbnN3ZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgc291bmRzIGNvb2wuIHdoYXQgaGF2ZSB5b3UgZG9uZT9gLFxuICAgICAgICBuZXh0OiAnL3dvcmsnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogYHdoeSBkbyB5b3UgbGlrZSBpdD9gLFxuICAgICAgICBuZXh0OiAxMVxuICAgICAgfSxcbiAgICBdXG4gIH0sXG5cbiAge1xuICAgIGlkOiA3LFxuICAgIHByb21wdDogYHRha2UgYSB3aWxkIGd1ZXNzLi4uYCxcbiAgICBhbnN3ZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgYmVlZiBsaXZlciB0b2FzdGAsXG4gICAgICAgIG5leHQ6ICdodHRwczovL21lZGlhLmdpcGh5LmNvbS9tZWRpYS9vRk9zMTBTSlNuem9zL2dpcGh5LmdpZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgYmx1ZWJlcnJ5IGxlbW9uIHRhcnRgLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvM283VEt3bW5EZ1FiNWplbWpLL2dpcGh5LmdpZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgYmFjb24gbGV0dHVjZSB0b21hdG9gLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvZnF6eGNtbFk3b3BPZy9naXBoeS5naWYnXG4gICAgICB9LFxuICAgIF1cbiAgfSxcblxuICB7XG4gICAgaWQ6IDgsXG4gICAgcHJvbXB0OiBgc28uLi4gY2FuIGkgc2hpcCBsYXVuZHJ5IGhvbWUgdG8gaW93YT9gLFxuICAgIGFuc3dlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGBvZiBjb3Vyc2UhYCxcbiAgICAgICAgbmV4dDogJ2h0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhLzExc0JMVnhOczd2NldBL2dpcGh5LmdpZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgeWVhaCwgc3RpbGwgbm90IHlvdXIgbW9tLi4uYCxcbiAgICAgICAgbmV4dDogMTJcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuXG4gIHtcbiAgICBpZDogOSxcbiAgICBwcm9tcHQ6IGBjbGlja2luZyBmb3IgZnVuLCBodWg/IGdvb2QgbHVjayB3aXRoIHRoaXMgb25lLmAsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYGJsdWUgcGlsbGAsXG4gICAgICAgIG5leHQ6ICdodHRwczovL21lZGlhLmdpcGh5LmNvbS9tZWRpYS9HN0dOb2FVU0g3c01VL2dpcGh5LmdpZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgcmVkIHBpbGxgLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvVWp1akdZM21BM0psZS9naXBoeS5naWYnXG4gICAgICB9LFxuICAgIF1cbiAgfSxcblxuICB7XG4gICAgaWQ6IDEwLFxuICAgIHByb21wdDogYHBhbmNha2VzIG9yIHdhZmZsZXM/YCxcbiAgICBhbnN3ZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgZnJlbmNoIHRvYXN0YCxcbiAgICAgICAgbmV4dDogJ2h0dHBzOi8vbWVkaWEuZ2lwaHkuY29tL21lZGlhLzE0bmI2VGxJUmxhTjF1L2dpcGh5LmdpZidcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuXG4gIHtcbiAgICBpZDogMTEsXG4gICAgcHJvbXB0OiBgaSBsaWtlIGV4cGVyaWVudGlhbCBiZWNhdXNlIGl0J3MganVzdCBzdXBlciBjb29sLCBva2F5P2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYHdoYXQgYXJlIHlvdXIgZmF2b3JpdGUgcHJvamVjdHM/YCxcbiAgICAgICAgbmV4dDogMTRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBgaSBoYXZlIHF1ZXN0aW9ucyEgY2FuIGkgZW1haWwgeW91P2AsXG4gICAgICAgIG5leHQ6ICcvY29udGFjdCdcbiAgICAgIH0sXG4gICAgXVxuICB9LCAgXG5cbiAge1xuICAgIGlkOiAxMixcbiAgICBwcm9tcHQ6IGB0YWtpbmcgdGhpcyBhIGxpdHRsZSBmYXIgZG9uJ3QgeW91IHRoaW5rP2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYHN1cmUgYW1gLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvcUlOc2ZER0kwejl5VS9naXBoeS5naWYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YWx1ZTogYG11c3QgY2xpY2sgQUxMIGJ1dHRvbnNgLFxuICAgICAgICBuZXh0OiAxM1xuICAgICAgfSxcbiAgICBdXG4gIH0sXG5cbiAge1xuICAgIGlkOiAxMyxcbiAgICBwcm9tcHQ6IGB5ZWFoP2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYGNsaWNraW5nIHRoaXMgbWF5IGhhcm0gYSBraXR0ZW5gLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly9tZWRpYS5naXBoeS5jb20vbWVkaWEvSWdnaGtYV2tkbkVFby9naXBoeS5naWYnXG4gICAgICB9LFxuICAgIF1cbiAgfSxcblxuICB7XG4gICAgaWQ6IDE0LFxuICAgIHByb21wdDogYG9mIGNvdXJzZSBJIGxvdmUgbXkgb3duIHdvcmssIGJ1dCB0aGVzZSBwcm9qZWN0cyBkZXNlcnZlIHNvbWUgc2VyaW91cyBwcm9wc2AsXG4gICAgYW5zd2VyczogW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYHByb2plY3QgMWAsXG4gICAgICAgIG5leHQ6ICdodHRwczovL3R3aXR0ZXIuY29tJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGBwcm9qZWN0IDJgLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly90d2l0dGVyLmNvbSdcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGBwcm9qZWN0IDNgLFxuICAgICAgICBuZXh0OiAnaHR0cHM6Ly90d2l0dGVyLmNvbSdcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuXVxuIiwiaW1wb3J0IGgwIGZyb20gJ2gwJ1xuaW1wb3J0IGNvbG9ycyBmcm9tICcuLi9saWIvY29sb3JzJ1xuXG5leHBvcnQgY29uc3QgZGl2ID0gaDAoJ2RpdicpXG5leHBvcnQgY29uc3QgYnV0dG9uID0gaDAoJ2J1dHRvbicpKHtjbGFzczogJ2gyIG12MCBpbmxpbmUtYmxvY2snfSlcbmV4cG9ydCBjb25zdCB0aXRsZSA9IGgwKCdwJykoe2NsYXNzOiAnaDEgbXQwIG1iMDUgY2InfSlcblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gKHtwcm9tcHQsIGFuc3dlcnN9LCBjYikgPT4ge1xuICByZXR1cm4gZGl2KHtjbGFzczogJ3F1ZXN0aW9uJ30pKFxuICAgIHRpdGxlKHByb21wdCksXG4gICAgZGl2KFxuICAgICAgLi4uYW5zd2Vycy5tYXAoKGEsIGkpID0+IGJ1dHRvbih7XG4gICAgICAgIG9uY2xpY2s6IChlKSA9PiBjYihhLm5leHQpLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGNvbG9yOiBjb2xvcnMuY29sb3JzW2ldXG4gICAgICAgIH1cbiAgICAgIH0pKGEudmFsdWUpKVxuICAgIClcbiAgKVxufVxuIiwiaW1wb3J0IHsgdGFycnksIHF1ZXVlIH0gZnJvbSAndGFycnkuanMnXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lmJylcbiAgY29uc3QgaW1nID0gbW9kYWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdXG5cbiAgY29uc3Qgc2hvdyA9IHRhcnJ5KCgpID0+IG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snKSBcbiAgY29uc3QgaGlkZSA9IHRhcnJ5KCgpID0+IG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpIFxuICBjb25zdCB0b2dnbGUgPSB0YXJyeShcbiAgICAoKSA9PiBtb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWFjdGl2ZScpIFxuICAgICAgPyBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxuICAgICAgOiBtb2RhbC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuICApXG5cbiAgY29uc3QgbGF6eSA9ICh1cmwsIGNiKSA9PiB7XG4gICAgbGV0IGJ1cm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cbiAgICBidXJuZXIub25sb2FkID0gKCkgPT4gY2IodXJsKVxuXG4gICAgYnVybmVyLnNyYyA9IHVybFxuICB9XG5cbiAgY29uc3Qgb3BlbiA9IHVybCA9PiB7XG4gICAgd2luZG93LmxvYWRlci5zdGFydCgpXG4gICAgd2luZG93LmxvYWRlci5wdXR6KDUwMClcblxuICAgIGxhenkodXJsLCB1cmwgPT4ge1xuICAgICAgaW1nLnNyYyA9IHVybFxuICAgICAgcXVldWUoc2hvdywgdG9nZ2xlKDIwMCkpKClcbiAgICAgIHdpbmRvdy5sb2FkZXIuZW5kKClcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgcXVldWUodG9nZ2xlLCBoaWRlKDIwMCkpKClcbiAgfVxuXG4gIG1vZGFsLm9uY2xpY2sgPSBjbG9zZVxuXG4gIHJldHVybiB7XG4gICAgb3BlbixcbiAgICBjbG9zZVxuICB9XG59XG4iLCJpbXBvcnQgcm91dGVyIGZyb20gJy4uL2xpYi9yb3V0ZXInXG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vZGF0YS9pbmRleC5qcydcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vZGF0YSdcbmltcG9ydCBnaWZmZXIgZnJvbSAnLi9naWZmZXInXG5pbXBvcnQgeyB0ZW1wbGF0ZSB9IGZyb20gJy4vZWxlbWVudHMnXG5cbmxldCBwcmV2XG5jb25zdCBkYXRhID0gc3RvcmFnZShxdWVzdGlvbnMpXG5cbi8qKlxuICogUmVuZGVyIHRlbXBsYXRlIGFuZCBhcHBlbmQgdG8gRE9NXG4gKi9cbmNvbnN0IHJlbmRlciA9IChuZXh0KSA9PiB7XG4gIGxldCBxdWVzdGlvblJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVlc3Rpb25Sb290JylcblxuICBsZXQgZWwgPSB0ZW1wbGF0ZShuZXh0LCB1cGRhdGUpXG4gIHF1ZXN0aW9uUm9vdCAmJiBxdWVzdGlvblJvb3QuYXBwZW5kQ2hpbGQoZWwpXG4gIHJldHVybiBlbCBcbn1cblxuLyoqXG4gKiBIYW5kbGUgRE9NIHVwZGF0ZXMsIG90aGVyIGxpbmsgY2xpY2tzXG4gKi9cbmNvbnN0IHVwZGF0ZSA9IChuZXh0KSA9PiB7XG4gIGxldCBxdWVzdGlvblJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXVlc3Rpb25Sb290JylcblxuICBsZXQgaXNHSUYgPSAvZ2lwaHkvLnRlc3QobmV4dClcbiAgaWYgKGlzR0lGKSByZXR1cm4gZ2lmZmVyKCkub3BlbihuZXh0KVxuXG4gIGxldCBpc1BhdGggPSAvXlxcLy8udGVzdChuZXh0KVxuICBpZiAoaXNQYXRoKSByZXR1cm4gcm91dGVyLmdvKG5leHQpXG5cbiAgaWYgKHByZXYgJiYgcXVlc3Rpb25Sb290ICYmIHF1ZXN0aW9uUm9vdC5jb250YWlucyhwcmV2KSkgcXVlc3Rpb25Sb290LnJlbW92ZUNoaWxkKHByZXYpXG5cbiAgcHJldiA9IHJlbmRlcihuZXh0KVxuXG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV4dC5pZFxufVxuXG4vKipcbiAqIFdhaXQgdW50aWwgbmV3IERPTSBpcyBwcmVzZW50IGJlZm9yZVxuICogdHJ5aW5nIHRvIHJlbmRlciB0byBpdFxuICovXG5yb3V0ZXIub24oJ2FmdGVyOnJvdXRlJywgKHtyb3V0ZX0pID0+IHtcbiAgaWYgKC8oXlxcL3xcXC8jWzAtOV18I1swLTldKS8udGVzdChyb3V0ZSkpe1xuICAgIHVwZGF0ZShkYXRhLmdldEFjdGl2ZSgpKVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIHByZXYgPSByZW5kZXIoZGF0YS5nZXRBY3RpdmUoKSlcbn1cbiIsImltcG9ydCBwdXR6IGZyb20gJ3B1dHonXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vbGliL3JvdXRlcidcbmltcG9ydCBhcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgY29sb3JzIGZyb20gJy4vbGliL2NvbG9ycydcblxuY29uc3QgbG9hZGVyID0gd2luZG93LmxvYWRlciA9IHB1dHooZG9jdW1lbnQuYm9keSwge1xuICBzcGVlZDogMTAwLFxuICB0cmlja2xlOiAxMFxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGFwcCgpXG5cbiAgcm91dGVyLm9uKCdhZnRlcjpyb3V0ZScsICh7IHJvdXRlIH0pID0+IHtcbiAgICBjb2xvcnMudXBkYXRlKClcbiAgfSlcblxuICBjb2xvcnMudXBkYXRlKClcbn0pXG4iLCJjb25zdCByb290U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHJvb3RTdHlsZSlcblxuY29uc3QgY29sb3JzID0gW1xuICAnIzM1RDNFOCcsXG4gICcjRkY0RTQyJyxcbiAgJyNGRkVBNTEnXG5dXG5cbmNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4gY29sb3JzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICgyIC0gMCkgKyAwKV1cblxuY29uc3Qgc2F2ZUNvbG9yID0gYyA9PiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWpzJywgSlNPTi5zdHJpbmdpZnkoe1xuICBjb2xvcjogY1xufSkpXG5cbmNvbnN0IHJlYWRDb2xvciA9ICgpID0+IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtanMnKSA/IChcbiAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWpzJykpLmNvbG9yXG4pIDogKFxuICBudWxsXG4pXG5cbmNvbnN0IGdldENvbG9yID0gKCkgPT4ge1xuICBsZXQgYyA9IHJhbmRvbUNvbG9yKClcbiAgbGV0IHByZXYgPSByZWFkQ29sb3IoKVxuXG4gIHdoaWxlIChjID09PSBwcmV2KXtcbiAgICBjID0gcmFuZG9tQ29sb3IoKVxuICB9XG5cbiAgc2F2ZUNvbG9yKGMpXG4gIHJldHVybiBjXG59XG5cbmNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcbiAgbGV0IGNvbG9yID0gZ2V0Q29sb3IoKVxuICBcbiAgcm9vdFN0eWxlLmlubmVySFRNTCA9IGBcbiAgICBib2R5IHsgY29sb3I6ICR7Y29sb3J9IH1cbiAgICA6Oi1tb3otc2VsZWN0aW9uIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3J9O1xuICAgIH1cbiAgICA6OnNlbGVjdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcbiAgICB9XG4gIGBcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB1cGRhdGU6IHVwZGF0ZSxcbiAgY29sb3JzXG59XG4iLCJpbXBvcnQgbGF5enIgZnJvbSAnbGF5enIuanMnXG4vLyBpbXBvcnQgb3BlcmF0b3IgZnJvbSAnb3BlcmF0b3IuanMnXG5pbXBvcnQgb3BlcmF0b3IgZnJvbSAnLi4vLi4vLi4vLi4vb3BlcmF0b3InXG5cbi8qKlxuICogU2VuZCBwYWdlIHZpZXdzIHRvIFxuICogR29vZ2xlIEFuYWx5dGljc1xuICovXG5jb25zdCBnYVRyYWNrUGFnZVZpZXcgPSAocGF0aCwgdGl0bGUpID0+IHtcbiAgbGV0IGdhID0gd2luZG93LmdhID8gd2luZG93LmdhIDogZmFsc2VcblxuICBpZiAoIWdhKSByZXR1cm5cblxuICBnYSgnc2V0Jywge3BhZ2U6IHBhdGgsIHRpdGxlOiB0aXRsZX0pO1xuICBnYSgnc2VuZCcsICdwYWdldmlldycpO1xufVxuXG5jb25zdCBpbWFnZXMgPSBsYXl6cih7fSlcbmltYWdlcy51cGRhdGUoKS5jaGVjaygpXG53aW5kb3cuaW1hZ2VzID0gaW1hZ2VzXG5cbmNvbnN0IGFwcCA9IG9wZXJhdG9yKHtcbiAgcm9vdDogJyNyb290J1xufSlcblxuYXBwLm9uKCdhZnRlcjpyb3V0ZScsICh7IHJvdXRlLCB0aXRsZSB9KSA9PiB7XG4gIGdhVHJhY2tQYWdlVmlldyhyb3V0ZSwgdGl0bGUpXG4gIGltYWdlcy51cGRhdGUoKS5jaGVjaygpXG59KVxuXG5hcHAub24oJ2FmdGVyOnRyYW5zaXRpb24nLCAoKSA9PiBsb2FkZXIgJiYgbG9hZGVyLmVuZCgpKVxuXG53aW5kb3cuYXBwID0gYXBwXG5cbmV4cG9ydCBkZWZhdWx0IGFwcFxuIiwiaW1wb3J0IGxvb3AgZnJvbSAnbG9vcC5qcydcbmltcG9ydCBkZWxlZ2F0ZSBmcm9tICdkZWxlZ2F0ZSdcbmltcG9ydCBuYW5vYWpheCBmcm9tICduYW5vYWpheCdcbmltcG9ydCBuYXZpZ28gZnJvbSAnbmF2aWdvJ1xuaW1wb3J0IGRvbSBmcm9tICcuL2xpYi9kb20uanMnXG5pbXBvcnQgeyBcbiAgb3JpZ2luLCBcbiAgc2FuaXRpemUsXG4gIHNhdmVTY3JvbGxQb3NpdGlvbixcbiAgc2Nyb2xsVG9Mb2NhdGlvbixcbiAgbGluayxcbiAgc2V0QWN0aXZlTGlua3Ncbn0gZnJvbSAnLi9saWIvdXRpbC5qcydcblxuY29uc3Qgcm91dGVyID0gbmV3IG5hdmlnbyhvcmlnaW4pXG5cbmNvbnN0IHN0YXRlID0ge1xuICBfc3RhdGU6IHtcbiAgICByb3V0ZTogJycsXG4gICAgdGl0bGU6ICcnLFxuICAgIHByZXY6IHtcbiAgICAgIHJvdXRlOiAnLycsXG4gICAgICB0aXRsZTogJycsXG4gICAgfVxuICB9LFxuICBnZXQgcm91dGUoKXtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUucm91dGVcbiAgfSxcbiAgc2V0IHJvdXRlKGxvYyl7XG4gICAgdGhpcy5fc3RhdGUucHJldi5yb3V0ZSA9IHRoaXMucm91dGVcbiAgICB0aGlzLl9zdGF0ZS5yb3V0ZSA9IGxvY1xuICAgIHNldEFjdGl2ZUxpbmtzKGxvYylcbiAgfSxcbiAgZ2V0IHRpdGxlKCl7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnRpdGxlXG4gIH0sXG4gIHNldCB0aXRsZSh2YWwpe1xuICAgIHRoaXMuX3N0YXRlLnByZXYudGl0bGUgPSB0aGlzLnRpdGxlXG4gICAgdGhpcy5fc3RhdGUudGl0bGUgPSB2YWxcbiAgICBkb2N1bWVudC50aXRsZSA9IHZhbFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3Qgcm9vdCA9IG9wdGlvbnMucm9vdCB8fCBkb2N1bWVudC5ib2R5XG4gIGNvbnN0IGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbiB8fCAwXG4gIGNvbnN0IGlnbm9yZSA9IG9wdGlvbnMuaWdub3JlIHx8IFtdXG5cbiAgY29uc3QgZXZlbnRzID0gbG9vcCgpXG4gIGNvbnN0IHJlbmRlciA9IGRvbShyb290LCBkdXJhdGlvbiwgZXZlbnRzKVxuXG4gIGNvbnN0IGluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh7XG4gICAgLi4uZXZlbnRzLFxuICAgIHN0b3AoKXsgc3RhdGUucGF1c2VkID0gdHJ1ZSB9LFxuICAgIHN0YXJ0KCl7IHN0YXRlLnBhdXNlZCA9IGZhbHNlIH0sXG4gICAgZ28sXG4gICAgcHVzaFxuICB9LCB7XG4gICAgZ2V0U3RhdGU6IHtcbiAgICAgIHZhbHVlOiAoKSA9PiBzdGF0ZS5fc3RhdGVcbiAgICB9XG4gIH0pXG5cbiAgc3RhdGUucm91dGUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgc3RhdGUudGl0bGUgPSBkb2N1bWVudC50aXRsZSBcblxuICBkZWxlZ2F0ZShkb2N1bWVudCwgJ2EnLCAnY2xpY2snLCAoZSkgPT4ge1xuICAgIGxldCBhID0gZS5kZWxlZ2F0ZVRhcmdldFxuICAgIGxldCBocmVmID0gYS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnLydcbiAgICBsZXQgcm91dGUgPSBzYW5pdGl6ZShocmVmKVxuXG4gICAgaWYgKFxuICAgICAgIWxpbmsuaXNTYW1lT3JpZ2luKGhyZWYpXG4gICAgICB8fCBhLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCdcbiAgICAgIHx8IG1hdGNoZXMoZSwgcm91dGUpXG4gICAgICB8fCBsaW5rLmlzSGFzaChocmVmKVxuICAgICl7IHJldHVybiB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGlmIChcbiAgICAgIGxpbmsuaXNTYW1lVVJMKGhyZWYpXG4gICAgKXsgcmV0dXJuIH1cblxuICAgIHNhdmVTY3JvbGxQb3NpdGlvbigpXG5cbiAgICBnbyhgJHtvcmlnaW59LyR7cm91dGV9YCwgdG8gPT4gcm91dGVyLm5hdmlnYXRlKHRvKSlcbiAgfSlcblxuICB3aW5kb3cub25wb3BzdGF0ZSA9IGUgPT4ge1xuICAgIGxldCB0byA9IGUudGFyZ2V0LmxvY2F0aW9uLmhyZWZcblxuICAgIGlmIChtYXRjaGVzKGUsIHRvKSl7IFxuICAgICAgaWYgKGxpbmsuaXNIYXNoKHRvKSl7IHJldHVybiB9XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIHJldHVybiBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3BzdGF0ZSBieXBhc3NlcyByb3V0ZXIsIHNvIHdlIFxuICAgICAqIG5lZWQgdG8gdGVsbCBpdCB3aGVyZSB3ZSB3ZW50IHRvXG4gICAgICogd2l0aG91dCBwdXNoaW5nIHN0YXRlXG4gICAgICovXG4gICAgZ28odG8sIGxvYyA9PiByb3V0ZXIucmVzb2x2ZShsb2MpKVxuICB9XG5cbiAgaWYgKCdzY3JvbGxSZXN0b3JhdGlvbicgaW4gaGlzdG9yeSl7XG4gICAgaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnXG5cbiAgICBpZiAoaGlzdG9yeS5zdGF0ZSAmJiBoaXN0b3J5LnN0YXRlLnNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBoaXN0b3J5LnN0YXRlLnNjcm9sbFRvcClcbiAgICB9XG5cbiAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBzYXZlU2Nyb2xsUG9zaXRpb24gXG4gIH1cblxuICBmdW5jdGlvbiBnbyhyb3V0ZSwgY2IgPSBudWxsKXtcbiAgICBsZXQgdG8gPSBzYW5pdGl6ZShyb3V0ZSlcblxuICAgIGV2ZW50cy5lbWl0KCdiZWZvcmU6cm91dGUnLCB7cm91dGU6IHRvfSlcblxuICAgIGlmIChzdGF0ZS5wYXVzZWQpeyByZXR1cm4gfVxuXG4gICAgbGV0IHJlcSA9IGdldChgJHtvcmlnaW59LyR7dG99YCwgdGl0bGUgPT4ge1xuICAgICAgY2IgPyBjYih0bywgdGl0bGUpIDogcm91dGVyLm5hdmlnYXRlKHRvKVxuICAgICAgXG4gICAgICAvLyBVcGRhdGUgc3RhdGVcbiAgICAgIHB1c2hSb3V0ZSh0bywgdGl0bGUpXG5cbiAgICAgIGV2ZW50cy5lbWl0KCdhZnRlcjpyb3V0ZScsIHtyb3V0ZTogdG8sIHRpdGxlfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChsb2MgPSBzdGF0ZS5yb3V0ZSwgdGl0bGUgPSBudWxsKXtcbiAgICByb3V0ZXIubmF2aWdhdGUobG9jKVxuICAgIHN0YXRlLnJvdXRlID0gbG9jXG4gICAgdGl0bGUgPyBzdGF0ZS50aXRsZSA9IHRpdGxlIDogbnVsbFxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KHJvdXRlLCBjYil7XG4gICAgcmV0dXJuIG5hbm9hamF4LmFqYXgoeyBcbiAgICAgIG1ldGhvZDogJ0dFVCcsIFxuICAgICAgdXJsOiByb3V0ZSBcbiAgICB9LCAoc3RhdHVzLCByZXMsIHJlcSkgPT4ge1xuICAgICAgaWYgKHJlcS5zdGF0dXMgPCAyMDAgfHwgcmVxLnN0YXR1cyA+IDMwMCAmJiByZXEuc3RhdHVzICE9PSAzMDQpe1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uID0gYCR7b3JpZ2lufS8ke3N0YXRlLl9zdGF0ZS5wcmV2LnJvdXRlfWBcbiAgICAgIH1cbiAgICAgIHJlbmRlcihyZXEucmVzcG9uc2UsIGNiKSBcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcHVzaFJvdXRlKGxvYywgdGl0bGUgPSBudWxsKXtcbiAgICBzdGF0ZS5yb3V0ZSA9IGxvY1xuICAgIHRpdGxlID8gc3RhdGUudGl0bGUgPSB0aXRsZSA6IG51bGxcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hdGNoZXMoZXZlbnQsIHJvdXRlKXtcbiAgICByZXR1cm4gaWdub3JlLmZpbHRlcih0ID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHQpKXtcbiAgICAgICAgbGV0IHJlcyA9IHRbMV0ocm91dGUpXG4gICAgICAgIGlmIChyZXMpeyBldmVudHMuZW1pdCh0WzBdLCB7cm91dGUsIGV2ZW50fSkgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdChyb3V0ZSkgXG4gICAgICB9XG4gICAgfSkubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIGluc3RhbmNlXG59XG4iLCJpbXBvcnQgeyB0YXJyeSwgcXVldWUgfSBmcm9tICd0YXJyeS5qcydcbmltcG9ydCB7IHJlc3RvcmVTY3JvbGxQb3MgfSBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogSW5pdCBuZXcgbmF0aXZlIHBhcnNlclxuICovXG5jb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcblxuLyoqXG4gKiBHZXQgdGhlIHRhcmdldCBvZiB0aGUgYWpheCByZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIFN0cmluZ2lmaWVkIEhUTUxcbiAqIEByZXR1cm4ge29iamVjdH0gRE9NIG5vZGUsICNwYWdlXG4gKi9cbmNvbnN0IHBhcnNlUmVzcG9uc2UgPSBodG1sID0+IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIilcblxuLyoqXG4gKiBGaW5kcyBhbGwgPHNjcmlwdD4gdGFncyBpbiB0aGUgbmV3XG4gKiBtYXJrdXAgYW5kIGV2YWx1YXRlcyB0aGVpciBjb250ZW50c1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSByb290IERPTSBub2RlIGNvbnRhaW5pbmcgbmV3IG1hcmt1cCB2aWEgQUpBWFxuICogQHBhcmFtIHsuLi5vYmplY3R9IHNvdXJjZXMgT3RoZXIgRE9NIG5vZGVzIHRvIHNjcmFwZSBzY3JpcHQgdGFncyBmcm9tIFxuICovXG5jb25zdCBldmFsU2NyaXB0cyA9IChzb3VyY2UsIHJvb3QgPSBudWxsKSA9PiB7XG4gIGxldCBlcnJvcnMgPSBbXVxuICBjb25zdCBzY3JpcHRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc291cmNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKSlcbiAgY29uc3QgZXhpc3RpbmcgPSByb290ID8gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JykpIDogW11cblxuICBjb25zdCBkdXBlID0gcyA9PiBleGlzdGluZy5maWx0ZXIoZSA9PiBzLmlubmVySFRNTCA9PT0gZS5pbm5lckhUTUwgJiYgcy5zcmMgPT09IGUuc3JjKS5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlIFxuXG4gIHNjcmlwdHMubGVuZ3RoID4gMCAmJiBzY3JpcHRzLmZvckVhY2godCA9PiB7XG4gICAgbGV0IHMgPSB0LmNsb25lTm9kZSh0cnVlKVxuXG4gICAgaWYgKGR1cGUocykpIHJldHVyblxuXG4gICAgcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWpheGVkJywgJ3RydWUnKVxuXG4gICAgdHJ5IHtcbiAgICAgIGV2YWwocy5pbm5lckhUTUwpXG4gICAgfSBjYXRjaChlKXtcbiAgICAgIGVycm9ycy5wdXNoKGUpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJvb3QgPyByb290Lmluc2VydEJlZm9yZShzLCByb290LmNoaWxkcmVuWzBdKSA6IHNvdXJjZS5yZXBsYWNlQ2hpbGQocywgdClcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgZXJyb3JzLnB1c2goZSlcbiAgICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKHMsIGRvY3VtZW50LmhlYWQuY2hpbGRyZW5bMF0pXG4gICAgfVxuICB9KSBcblxuICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApe1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoJ29wZXJhdG9yLmpzJylcbiAgICBlcnJvcnMuZm9yRWFjaChlID0+IGNvbnNvbGUubG9nKGUpKVxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICB9XG59XG5cbi8qKlxuICogR2V0IHdpZHRoL2hlaWdodCBvZiBlbGVtZW50IG9yIHdpbmRvd1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCBFbGVtZW50IG9yIHdpbmRvd1xuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ0hlaWdodCcgb3IgJ1dpZHRoXG4gKi9cbmNvbnN0IHJldHVyblNpemUgPSAoZWwsIHR5cGUpID0+IHtcbiAgY29uc3QgaXNXaW5kb3cgPSBlbCAhPT0gbnVsbCAmJiBlbC53aW5kb3cgPyB0cnVlIDogZmFsc2VcblxuICBpZiAoaXNXaW5kb3cpe1xuICAgIHJldHVybiBNYXRoLm1heChlbFtgb3V0ZXIke3R5cGV9YF0sIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtgY2xpZW50JHt0eXBlfWBdKVxuICB9XG5cbiAgcmV0dXJuIE1hdGgubWF4KGVsW2BvZmZzZXQke3R5cGV9YF0sIGVsW2BjbGllbnQke3R5cGV9YF0pXG59XG5cbi8qKlxuICogSGVscGVyIHRvIHNtb290aGx5IHN3YXAgb2xkIFxuICogbWFya3VwIHdpdGggbmV3IG1hcmt1cFxuICogXG4gKiBAcGFyYW0ge29iamVjdH0gbWFya3VwIE5ldyBub2RlIHRvIGFwcGVuZCB0byBET01cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKHJvb3QsIGR1cmF0aW9uLCBldmVudHMpID0+IChtYXJrdXAsIGNiKSA9PiB7XG4gIGNvbnN0IGRvbSA9IHBhcnNlUmVzcG9uc2UobWFya3VwKVxuICBjb25zdCB0aXRsZSA9IGRvbS5oZWFkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aXRsZScpWzBdLmlubmVySFRNTFxuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290KVxuXG4gIGNvbnN0IHN0YXJ0ID0gdGFycnkoXG4gICAgKCkgPT4ge1xuICAgICAgZXZlbnRzLmVtaXQoJ2JlZm9yZTp0cmFuc2l0aW9uJylcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy10cmFuc2l0aW9uaW5nJykgXG4gICAgICBtYWluLnN0eWxlLmhlaWdodCA9IHJldHVyblNpemUobWFpbiwgJ0hlaWdodCcpKydweCdcbiAgICB9XG4gICwgZHVyYXRpb24pXG5cbiAgY29uc3QgcmVuZGVyID0gdGFycnkoXG4gICAgKCkgPT4ge1xuICAgICAgbWFpbi5pbm5lckhUTUwgPSBkb20ucXVlcnlTZWxlY3Rvcihyb290KS5pbm5lckhUTUxcbiAgICAgIGNiKHRpdGxlLCBtYWluKVxuICAgICAgZXZhbFNjcmlwdHMobWFpbilcbiAgICAgIGV2YWxTY3JpcHRzKGRvbS5oZWFkLCBkb2N1bWVudC5oZWFkKVxuICAgICAgcmVzdG9yZVNjcm9sbFBvcygpXG4gICAgfVxuICAsIGR1cmF0aW9uKVxuXG4gIGNvbnN0IHJlbW92ZVRyYW5zaXRpb25TdHlsZXMgPSB0YXJyeShcbiAgICAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdHJhbnNpdGlvbmluZycpIFxuICAgICAgbWFpbi5zdHlsZS5oZWlnaHQgPSAnJ1xuICAgIH1cbiAgLCBkdXJhdGlvbilcblxuICBjb25zdCBzaWduYWxFbmQgPSB0YXJyeShcbiAgICAoKSA9PiBldmVudHMuZW1pdCgnYWZ0ZXI6dHJhbnNpdGlvbicpXG4gICwgZHVyYXRpb24pXG5cbiAgcXVldWUoc3RhcnQsIHJlbmRlciwgcmVtb3ZlVHJhbnNpdGlvblN0eWxlcywgc2lnbmFsRW5kKSgpXG59XG4iLCJjb25zdCBnZXRPcmlnaW4gPSB1cmwgPT4gdXJsLm9yaWdpbiB8fCB1cmwucHJvdG9jb2wrJy8vJyt1cmwuaG9zdFxuXG5leHBvcnQgY29uc3Qgb3JpZ2luID0gZ2V0T3JpZ2luKHdpbmRvdy5sb2NhdGlvbikgXG5cbmV4cG9ydCBjb25zdCBvcmlnaW5SZWdFeCA9IG5ldyBSZWdFeHAob3JpZ2luKVxuXG4vKipcbiAqIFJlcGxhY2Ugc2l0ZSBvcmlnaW4sIGlmIHByZXNlbnQsXG4gKiByZW1vdmUgbGVhZGluZyBzbGFzaCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFJhdyBVUkwgdG8gcGFyc2VcbiAqIEByZXR1cm4ge3N0cmluZ30gVVJMIHNhbnMgb3JpZ2luIGFuZCBzYW5zIGxlYWRpbmcgY29tbWFcbiAqL1xuZXhwb3J0IGNvbnN0IHNhbml0aXplID0gdXJsID0+IHtcbiAgbGV0IHJvdXRlID0gdXJsLnJlcGxhY2Uob3JpZ2luUmVnRXgsICcnKVxuICBsZXQgY2xlYW4gPSByb3V0ZS5tYXRjaCgvXlxcLy8pID8gcm91dGUucmVwbGFjZSgvXFwvezF9LywnJykgOiByb3V0ZSAvLyByZW1vdmUgL1xuICByZXR1cm4gY2xlYW4gPT09ICcnID8gJy8nIDogY2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlVVJMID0gdXJsID0+IHtcbiAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgYS5ocmVmID0gdXJsXG4gIHJldHVybiBhXG59XG5cbmV4cG9ydCBjb25zdCBsaW5rID0ge1xuICBpc1NhbWVPcmlnaW46IGhyZWYgPT4gb3JpZ2luID09PSBnZXRPcmlnaW4ocGFyc2VVUkwoaHJlZikpLFxuICBpc0hhc2g6IGhyZWYgPT4gLyMvLnRlc3QoaHJlZiksXG4gIGlzU2FtZVVSTDogaHJlZiA9PiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IHBhcnNlVVJMKGhyZWYpLnBhdGhuYW1lXG59XG5cbmV4cG9ydCBjb25zdCBnZXRTY3JvbGxQb3NpdGlvbiA9ICgpID0+IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWVxuXG5leHBvcnQgY29uc3Qgc2F2ZVNjcm9sbFBvc2l0aW9uID0gKCkgPT4gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHsgc2Nyb2xsVG9wOiBnZXRTY3JvbGxQb3NpdGlvbigpIH0sICcnKVxuXG5leHBvcnQgY29uc3QgcmVzdG9yZVNjcm9sbFBvcyA9ICgpID0+IHtcbiAgbGV0IHNjcm9sbFRvcCA9IGhpc3Rvcnkuc3RhdGUgPyBoaXN0b3J5LnN0YXRlLnNjcm9sbFRvcCA6IHVuZGVmaW5lZCBcbiAgaWYgKGhpc3Rvcnkuc3RhdGUgJiYgc2Nyb2xsVG9wICE9PSB1bmRlZmluZWQgKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFRvcClcbiAgICByZXR1cm4gc2Nyb2xsVG9wXG4gIH0gZWxzZSB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gIH1cbn1cblxuY29uc3QgYWN0aXZlTGlua3MgPSBbXVxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZUxpbmtzID0gcm91dGUgPT4ge1xuICBhY3RpdmVMaW5rcy5mb3JFYWNoKGEgPT4gYS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKSlcbiAgYWN0aXZlTGlua3Muc3BsaWNlKDAsIGFjdGl2ZUxpbmtzLmxlbmd0aClcbiAgYWN0aXZlTGlua3MucHVzaCguLi5BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbaHJlZiQ9XCIke3JvdXRlfVwiXWApKSlcbiAgYWN0aXZlTGlua3MuZm9yRWFjaChhID0+IGEuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJykpXG59XG4iLCJ2YXIgbWF0Y2hlcyA9IHJlcXVpcmUoJ21hdGNoZXMtc2VsZWN0b3InKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IsIGNoZWNrWW9TZWxmKSB7XHJcbiAgdmFyIHBhcmVudCA9IGNoZWNrWW9TZWxmID8gZWxlbWVudCA6IGVsZW1lbnQucGFyZW50Tm9kZVxyXG5cclxuICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQpIHtcclxuICAgIGlmIChtYXRjaGVzKHBhcmVudCwgc2VsZWN0b3IpKSByZXR1cm4gcGFyZW50O1xyXG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGVcclxuICB9XHJcbn1cclxuIiwidmFyIGNsb3Nlc3QgPSByZXF1aXJlKCdjbG9zZXN0Jyk7XG5cbi8qKlxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGRlbGVnYXRlKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xuICAgIHZhciBsaXN0ZW5lckZuID0gbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lckZuLCB1c2VDYXB0dXJlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEZpbmRzIGNsb3Nlc3QgbWF0Y2ggYW5kIGludm9rZXMgY2FsbGJhY2suXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBjbG9zZXN0KGUudGFyZ2V0LCBzZWxlY3RvciwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGUuZGVsZWdhdGVUYXJnZXQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVsZWdhdGU7XG4iLCJleHBvcnQgZGVmYXVsdCAobyA9IHt9KSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IHt9XG5cbiAgY29uc3Qgb24gPSAoZSwgY2IgPSBudWxsKSA9PiB7XG4gICAgaWYgKCFjYikgcmV0dXJuXG4gICAgbGlzdGVuZXJzW2VdID0gbGlzdGVuZXJzW2VdIHx8IHsgcXVldWU6IFtdIH1cbiAgICBsaXN0ZW5lcnNbZV0ucXVldWUucHVzaChjYilcbiAgfVxuXG4gIGNvbnN0IGVtaXQgPSAoZSwgZGF0YSA9IG51bGwpID0+IHtcbiAgICBsZXQgaXRlbXMgPSBsaXN0ZW5lcnNbZV0gPyBsaXN0ZW5lcnNbZV0ucXVldWUgOiBmYWxzZVxuICAgIGl0ZW1zICYmIGl0ZW1zLmZvckVhY2goaSA9PiBpKGRhdGEpKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5vLFxuICAgIGVtaXQsXG4gICAgb25cbiAgfVxufVxuIiwiXHJcbi8qKlxyXG4gKiBFbGVtZW50IHByb3RvdHlwZS5cclxuICovXHJcblxyXG52YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiBWZW5kb3IgZnVuY3Rpb24uXHJcbiAqL1xyXG5cclxudmFyIHZlbmRvciA9IHByb3RvLm1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm1vek1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yXHJcbiAgfHwgcHJvdG8ub01hdGNoZXNTZWxlY3RvcjtcclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgYG1hdGNoKClgLlxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWF0Y2g7XHJcblxyXG4vKipcclxuICogTWF0Y2ggYGVsYCB0byBgc2VsZWN0b3JgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1hdGNoKGVsLCBzZWxlY3Rvcikge1xyXG4gIGlmICh2ZW5kb3IpIHJldHVybiB2ZW5kb3IuY2FsbChlbCwgc2VsZWN0b3IpO1xyXG4gIHZhciBub2RlcyA9IGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKG5vZGVzW2ldID09IGVsKSByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59IiwiLy8gQmVzdCBwbGFjZSB0byBmaW5kIGluZm9ybWF0aW9uIG9uIFhIUiBmZWF0dXJlcyBpczpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdFxuXG52YXIgcmVxZmllbGRzID0gW1xuICAncmVzcG9uc2VUeXBlJywgJ3dpdGhDcmVkZW50aWFscycsICd0aW1lb3V0JywgJ29ucHJvZ3Jlc3MnXG5dXG5cbi8vIFNpbXBsZSBhbmQgc21hbGwgYWpheCBmdW5jdGlvblxuLy8gVGFrZXMgYSBwYXJhbWV0ZXJzIG9iamVjdCBhbmQgYSBjYWxsYmFjayBmdW5jdGlvblxuLy8gUGFyYW1ldGVyczpcbi8vICAtIHVybDogc3RyaW5nLCByZXF1aXJlZFxuLy8gIC0gaGVhZGVyczogb2JqZWN0IG9mIGB7aGVhZGVyX25hbWU6IGhlYWRlcl92YWx1ZSwgLi4ufWBcbi8vICAtIGJvZHk6XG4vLyAgICAgICsgc3RyaW5nIChzZXRzIGNvbnRlbnQgdHlwZSB0byAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyBpZiBub3Qgc2V0IGluIGhlYWRlcnMpXG4vLyAgICAgICsgRm9ybURhdGEgKGRvZXNuJ3Qgc2V0IGNvbnRlbnQgdHlwZSBzbyB0aGF0IGJyb3dzZXIgd2lsbCBzZXQgYXMgYXBwcm9wcmlhdGUpXG4vLyAgLSBtZXRob2Q6ICdHRVQnLCAnUE9TVCcsIGV0Yy4gRGVmYXVsdHMgdG8gJ0dFVCcgb3IgJ1BPU1QnIGJhc2VkIG9uIGJvZHlcbi8vICAtIGNvcnM6IElmIHlvdXIgdXNpbmcgY3Jvc3Mtb3JpZ2luLCB5b3Ugd2lsbCBuZWVkIHRoaXMgdHJ1ZSBmb3IgSUU4LTlcbi8vXG4vLyBUaGUgZm9sbG93aW5nIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCBvbnRvIHRoZSB4aHIgb2JqZWN0LlxuLy8gSU1QT1JUQU5UIE5PVEU6IFRoZSBjYWxsZXIgaXMgcmVzcG9uc2libGUgZm9yIGNvbXBhdGliaWxpdHkgY2hlY2tpbmcuXG4vLyAgLSByZXNwb25zZVR5cGU6IHN0cmluZywgdmFyaW91cyBjb21wYXRhYmlsaXR5LCBzZWUgeGhyIGRvY3MgZm9yIGVudW0gb3B0aW9uc1xuLy8gIC0gd2l0aENyZWRlbnRpYWxzOiBib29sZWFuLCBJRTEwKywgQ09SUyBvbmx5XG4vLyAgLSB0aW1lb3V0OiBsb25nLCBtcyB0aW1lb3V0LCBJRTgrXG4vLyAgLSBvbnByb2dyZXNzOiBjYWxsYmFjaywgSUUxMCtcbi8vXG4vLyBDYWxsYmFjayBmdW5jdGlvbiBwcm90b3R5cGU6XG4vLyAgLSBzdGF0dXNDb2RlIGZyb20gcmVxdWVzdFxuLy8gIC0gcmVzcG9uc2Vcbi8vICAgICsgaWYgcmVzcG9uc2VUeXBlIHNldCBhbmQgc3VwcG9ydGVkIGJ5IGJyb3dzZXIsIHRoaXMgaXMgYW4gb2JqZWN0IG9mIHNvbWUgdHlwZSAoc2VlIGRvY3MpXG4vLyAgICArIG90aGVyd2lzZSBpZiByZXF1ZXN0IGNvbXBsZXRlZCwgdGhpcyBpcyB0aGUgc3RyaW5nIHRleHQgb2YgdGhlIHJlc3BvbnNlXG4vLyAgICArIGlmIHJlcXVlc3QgaXMgYWJvcnRlZCwgdGhpcyBpcyBcIkFib3J0XCJcbi8vICAgICsgaWYgcmVxdWVzdCB0aW1lcyBvdXQsIHRoaXMgaXMgXCJUaW1lb3V0XCJcbi8vICAgICsgaWYgcmVxdWVzdCBlcnJvcnMgYmVmb3JlIGNvbXBsZXRpbmcgKHByb2JhYmx5IGEgQ09SUyBpc3N1ZSksIHRoaXMgaXMgXCJFcnJvclwiXG4vLyAgLSByZXF1ZXN0IG9iamVjdFxuLy9cbi8vIFJldHVybnMgdGhlIHJlcXVlc3Qgb2JqZWN0LiBTbyB5b3UgY2FuIGNhbGwgLmFib3J0KCkgb3Igb3RoZXIgbWV0aG9kc1xuLy9cbi8vIERFUFJFQ0FUSU9OUzpcbi8vICAtIFBhc3NpbmcgYSBzdHJpbmcgaW5zdGVhZCBvZiB0aGUgcGFyYW1zIG9iamVjdCBoYXMgYmVlbiByZW1vdmVkIVxuLy9cbmV4cG9ydHMuYWpheCA9IGZ1bmN0aW9uIChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIC8vIEFueSB2YXJpYWJsZSB1c2VkIG1vcmUgdGhhbiBvbmNlIGlzIHZhcidkIGhlcmUgYmVjYXVzZVxuICAvLyBtaW5pZmljYXRpb24gd2lsbCBtdW5nZSB0aGUgdmFyaWFibGVzIHdoZXJlYXMgaXQgY2FuJ3QgbXVuZ2VcbiAgLy8gdGhlIG9iamVjdCBhY2Nlc3MuXG4gIHZhciBoZWFkZXJzID0gcGFyYW1zLmhlYWRlcnMgfHwge31cbiAgICAsIGJvZHkgPSBwYXJhbXMuYm9keVxuICAgICwgbWV0aG9kID0gcGFyYW1zLm1ldGhvZCB8fCAoYm9keSA/ICdQT1NUJyA6ICdHRVQnKVxuICAgICwgY2FsbGVkID0gZmFsc2VcblxuICB2YXIgcmVxID0gZ2V0UmVxdWVzdChwYXJhbXMuY29ycylcblxuICBmdW5jdGlvbiBjYihzdGF0dXNDb2RlLCByZXNwb25zZVRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgY2FsbGJhY2socmVxLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gc3RhdHVzQ29kZSA6IHJlcS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgIHJlcS5zdGF0dXMgPT09IDAgPyBcIkVycm9yXCIgOiAocmVxLnJlc3BvbnNlIHx8IHJlcS5yZXNwb25zZVRleHQgfHwgcmVzcG9uc2VUZXh0KSxcbiAgICAgICAgICAgICAgICAgcmVxKVxuICAgICAgICBjYWxsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVxLm9wZW4obWV0aG9kLCBwYXJhbXMudXJsLCB0cnVlKVxuXG4gIHZhciBzdWNjZXNzID0gcmVxLm9ubG9hZCA9IGNiKDIwMClcbiAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQpIHN1Y2Nlc3MoKVxuICB9XG4gIHJlcS5vbmVycm9yID0gY2IobnVsbCwgJ0Vycm9yJylcbiAgcmVxLm9udGltZW91dCA9IGNiKG51bGwsICdUaW1lb3V0JylcbiAgcmVxLm9uYWJvcnQgPSBjYihudWxsLCAnQWJvcnQnKVxuXG4gIGlmIChib2R5KSB7XG4gICAgc2V0RGVmYXVsdChoZWFkZXJzLCAnWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXG5cbiAgICBpZiAoIWdsb2JhbC5Gb3JtRGF0YSB8fCAhKGJvZHkgaW5zdGFuY2VvZiBnbG9iYWwuRm9ybURhdGEpKSB7XG4gICAgICBzZXREZWZhdWx0KGhlYWRlcnMsICdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJylcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmVxZmllbGRzLmxlbmd0aCwgZmllbGQ7IGkgPCBsZW47IGkrKykge1xuICAgIGZpZWxkID0gcmVxZmllbGRzW2ldXG4gICAgaWYgKHBhcmFtc1tmaWVsZF0gIT09IHVuZGVmaW5lZClcbiAgICAgIHJlcVtmaWVsZF0gPSBwYXJhbXNbZmllbGRdXG4gIH1cblxuICBmb3IgKHZhciBmaWVsZCBpbiBoZWFkZXJzKVxuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCBoZWFkZXJzW2ZpZWxkXSlcblxuICByZXEuc2VuZChib2R5KVxuXG4gIHJldHVybiByZXFcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWVzdChjb3JzKSB7XG4gIC8vIFhEb21haW5SZXF1ZXN0IGlzIG9ubHkgd2F5IHRvIGRvIENPUlMgaW4gSUUgOCBhbmQgOVxuICAvLyBCdXQgWERvbWFpblJlcXVlc3QgaXNuJ3Qgc3RhbmRhcmRzLWNvbXBhdGlibGVcbiAgLy8gTm90YWJseSwgaXQgZG9lc24ndCBhbGxvdyBjb29raWVzIHRvIGJlIHNlbnQgb3Igc2V0IGJ5IHNlcnZlcnNcbiAgLy8gSUUgMTArIGlzIHN0YW5kYXJkcy1jb21wYXRpYmxlIGluIGl0cyBYTUxIdHRwUmVxdWVzdFxuICAvLyBidXQgSUUgMTAgY2FuIHN0aWxsIGhhdmUgYW4gWERvbWFpblJlcXVlc3Qgb2JqZWN0LCBzbyB3ZSBkb24ndCB3YW50IHRvIHVzZSBpdFxuICBpZiAoY29ycyAmJiBnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgIS9NU0lFIDEvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG4gICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdFxuICBpZiAoZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KVxuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Rcbn1cblxuZnVuY3Rpb24gc2V0RGVmYXVsdChvYmosIGtleSwgdmFsdWUpIHtcbiAgb2JqW2tleV0gPSBvYmpba2V5XSB8fCB2YWx1ZVxufVxuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJOYXZpZ29cIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiTmF2aWdvXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk5hdmlnb1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cdFxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0ICB2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0XG5cdGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXHRcblx0dmFyIFBBUkFNRVRFUl9SRUdFWFAgPSAvKFs6Kl0pKFxcdyspL2c7XG5cdHZhciBXSUxEQ0FSRF9SRUdFWFAgPSAvXFwqL2c7XG5cdHZhciBSRVBMQUNFX1ZBUklBQkxFX1JFR0VYUCA9ICcoW15cXC9dKyknO1xuXHR2YXIgUkVQTEFDRV9XSUxEQ0FSRCA9ICcoPzouKiknO1xuXHR2YXIgRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQID0gJyg/OlxcL3wkKSc7XG5cdFxuXHRmdW5jdGlvbiBjbGVhbihzKSB7XG5cdCAgaWYgKHMgaW5zdGFuY2VvZiBSZWdFeHApIHJldHVybiBzO1xuXHQgIHJldHVybiBzLnJlcGxhY2UoL1xcLyskLywgJycpLnJlcGxhY2UoL15cXC8rLywgJy8nKTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVnRXhwUmVzdWx0VG9QYXJhbXMobWF0Y2gsIG5hbWVzKSB7XG5cdCAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cdCAgaWYgKCFtYXRjaCkgcmV0dXJuIG51bGw7XG5cdCAgcmV0dXJuIG1hdGNoLnNsaWNlKDEsIG1hdGNoLmxlbmd0aCkucmVkdWNlKGZ1bmN0aW9uIChwYXJhbXMsIHZhbHVlLCBpbmRleCkge1xuXHQgICAgaWYgKHBhcmFtcyA9PT0gbnVsbCkgcGFyYW1zID0ge307XG5cdCAgICBwYXJhbXNbbmFtZXNbaW5kZXhdXSA9IHZhbHVlO1xuXHQgICAgcmV0dXJuIHBhcmFtcztcblx0ICB9LCBudWxsKTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gcmVwbGFjZUR5bmFtaWNVUkxQYXJ0cyhyb3V0ZSkge1xuXHQgIHZhciBwYXJhbU5hbWVzID0gW10sXG5cdCAgICAgIHJlZ2V4cDtcblx0XG5cdCAgaWYgKHJvdXRlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG5cdCAgICByZWdleHAgPSByb3V0ZTtcblx0ICB9IGVsc2Uge1xuXHQgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChjbGVhbihyb3V0ZSkucmVwbGFjZShQQVJBTUVURVJfUkVHRVhQLCBmdW5jdGlvbiAoZnVsbCwgZG90cywgbmFtZSkge1xuXHQgICAgICBwYXJhbU5hbWVzLnB1c2gobmFtZSk7XG5cdCAgICAgIHJldHVybiBSRVBMQUNFX1ZBUklBQkxFX1JFR0VYUDtcblx0ICAgIH0pLnJlcGxhY2UoV0lMRENBUkRfUkVHRVhQLCBSRVBMQUNFX1dJTERDQVJEKSArIEZPTExPV0VEX0JZX1NMQVNIX1JFR0VYUCk7XG5cdCAgfVxuXHQgIHJldHVybiB7IHJlZ2V4cDogcmVnZXhwLCBwYXJhbU5hbWVzOiBwYXJhbU5hbWVzIH07XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGZpbmRNYXRjaGVkUm91dGVzKHVybCkge1xuXHQgIHZhciByb3V0ZXMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1sxXTtcblx0XG5cdCAgcmV0dXJuIHJvdXRlcy5tYXAoZnVuY3Rpb24gKHJvdXRlKSB7XG5cdCAgICB2YXIgX3JlcGxhY2VEeW5hbWljVVJMUGFyID0gcmVwbGFjZUR5bmFtaWNVUkxQYXJ0cyhyb3V0ZS5yb3V0ZSk7XG5cdFxuXHQgICAgdmFyIHJlZ2V4cCA9IF9yZXBsYWNlRHluYW1pY1VSTFBhci5yZWdleHA7XG5cdCAgICB2YXIgcGFyYW1OYW1lcyA9IF9yZXBsYWNlRHluYW1pY1VSTFBhci5wYXJhbU5hbWVzO1xuXHRcblx0ICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaChyZWdleHApO1xuXHQgICAgdmFyIHBhcmFtcyA9IHJlZ0V4cFJlc3VsdFRvUGFyYW1zKG1hdGNoLCBwYXJhbU5hbWVzKTtcblx0XG5cdCAgICByZXR1cm4gbWF0Y2ggPyB7IG1hdGNoOiBtYXRjaCwgcm91dGU6IHJvdXRlLCBwYXJhbXM6IHBhcmFtcyB9IDogZmFsc2U7XG5cdCAgfSkuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG5cdCAgICByZXR1cm4gbTtcblx0ICB9KTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gbWF0Y2godXJsLCByb3V0ZXMpIHtcblx0ICByZXR1cm4gZmluZE1hdGNoZWRSb3V0ZXModXJsLCByb3V0ZXMpWzBdIHx8IGZhbHNlO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiByb290KHVybCwgcm91dGVzKSB7XG5cdCAgdmFyIG1hdGNoZWQgPSBmaW5kTWF0Y2hlZFJvdXRlcyh1cmwsIHJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XG5cdCAgICB2YXIgdSA9IGNsZWFuKHJvdXRlLnJvdXRlKTtcblx0XG5cdCAgICByZXR1cm4gdSAhPT0gJycgJiYgdSAhPT0gJyonO1xuXHQgIH0pKTtcblx0ICB2YXIgZmFsbGJhY2tVUkwgPSBjbGVhbih1cmwpO1xuXHRcblx0ICBpZiAobWF0Y2hlZC5sZW5ndGggPiAwKSB7XG5cdCAgICByZXR1cm4gbWF0Y2hlZC5tYXAoZnVuY3Rpb24gKG0pIHtcblx0ICAgICAgcmV0dXJuIGNsZWFuKHVybC5zdWJzdHIoMCwgbS5tYXRjaC5pbmRleCkpO1xuXHQgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChyb290LCBjdXJyZW50KSB7XG5cdCAgICAgIHJldHVybiBjdXJyZW50Lmxlbmd0aCA8IHJvb3QubGVuZ3RoID8gY3VycmVudCA6IHJvb3Q7XG5cdCAgICB9LCBmYWxsYmFja1VSTCk7XG5cdCAgfVxuXHQgIHJldHVybiBmYWxsYmFja1VSTDtcblx0fVxuXHRcblx0ZnVuY3Rpb24gaXNQdXNoU3RhdGVBdmFpbGFibGUoKSB7XG5cdCAgcmV0dXJuICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSk7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIE5hdmlnbyhyLCB1c2VIYXNoKSB7XG5cdCAgdGhpcy5fcm91dGVzID0gW107XG5cdCAgdGhpcy5yb290ID0gdXNlSGFzaCAmJiByID8gci5yZXBsYWNlKC9cXC8kLywgJy8jJykgOiByIHx8IG51bGw7XG5cdCAgdGhpcy5fdXNlSGFzaCA9IHVzZUhhc2g7XG5cdCAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG5cdCAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG5cdCAgdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQgPSBudWxsO1xuXHQgIHRoaXMuX25vdEZvdW5kSGFuZGxlciA9IG51bGw7XG5cdCAgdGhpcy5fZGVmYXVsdEhhbmRsZXIgPSBudWxsO1xuXHQgIHRoaXMuX29rID0gIXVzZUhhc2ggJiYgaXNQdXNoU3RhdGVBdmFpbGFibGUoKTtcblx0ICB0aGlzLl9saXN0ZW4oKTtcblx0ICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuXHR9XG5cdFxuXHROYXZpZ28ucHJvdG90eXBlID0ge1xuXHQgIGhlbHBlcnM6IHtcblx0ICAgIG1hdGNoOiBtYXRjaCxcblx0ICAgIHJvb3Q6IHJvb3QsXG5cdCAgICBjbGVhbjogY2xlYW5cblx0ICB9LFxuXHQgIG5hdmlnYXRlOiBmdW5jdGlvbiBuYXZpZ2F0ZShwYXRoLCBhYnNvbHV0ZSkge1xuXHQgICAgdmFyIHRvO1xuXHRcblx0ICAgIHBhdGggPSBwYXRoIHx8ICcnO1xuXHQgICAgaWYgKHRoaXMuX29rKSB7XG5cdCAgICAgIHRvID0gKCFhYnNvbHV0ZSA/IHRoaXMuX2dldFJvb3QoKSArICcvJyA6ICcnKSArIGNsZWFuKHBhdGgpO1xuXHQgICAgICB0byA9IHRvLnJlcGxhY2UoLyhbXjpdKShcXC97Mix9KS9nLCAnJDEvJyk7XG5cdCAgICAgIGhpc3RvcnlbdGhpcy5fcGF1c2VkID8gJ3JlcGxhY2VTdGF0ZScgOiAncHVzaFN0YXRlJ10oe30sICcnLCB0byk7XG5cdCAgICAgIHRoaXMucmVzb2x2ZSgpO1xuXHQgICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHQgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMoLiopJC8sICcnKSArICcjJyArIHBhdGg7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXHQgIG9uOiBmdW5jdGlvbiBvbigpIHtcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcblx0ICAgICAgdGhpcy5fYWRkKGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXSwgYXJndW1lbnRzLmxlbmd0aCA8PSAxID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdKTtcblx0ICAgIH0gZWxzZSBpZiAoX3R5cGVvZihhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pID09PSAnb2JqZWN0Jykge1xuXHQgICAgICBmb3IgKHZhciByb3V0ZSBpbiBhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pIHtcblx0ICAgICAgICB0aGlzLl9hZGQocm91dGUsIChhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pW3JvdXRlXSk7XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSBpZiAodHlwZW9mIChhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIHRoaXMuX2RlZmF1bHRIYW5kbGVyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblx0ICBub3RGb3VuZDogZnVuY3Rpb24gbm90Rm91bmQoaGFuZGxlcikge1xuXHQgICAgdGhpcy5fbm90Rm91bmRIYW5kbGVyID0gaGFuZGxlcjtcblx0ICB9LFxuXHQgIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoY3VycmVudCkge1xuXHQgICAgdmFyIGhhbmRsZXIsIG07XG5cdCAgICB2YXIgdXJsID0gKGN1cnJlbnQgfHwgdGhpcy5fY0xvYygpKS5yZXBsYWNlKHRoaXMuX2dldFJvb3QoKSwgJycpO1xuXHRcblx0ICAgIGlmICh0aGlzLl9wYXVzZWQgfHwgdXJsID09PSB0aGlzLl9sYXN0Um91dGVSZXNvbHZlZCkgcmV0dXJuIGZhbHNlO1xuXHQgICAgaWYgKHRoaXMuX3VzZUhhc2gpIHtcblx0ICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL15cXC8jLywgJy8nKTtcblx0ICAgIH1cblx0ICAgIG0gPSBtYXRjaCh1cmwsIHRoaXMuX3JvdXRlcyk7XG5cdFxuXHQgICAgaWYgKG0pIHtcblx0ICAgICAgdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQgPSB1cmw7XG5cdCAgICAgIGhhbmRsZXIgPSBtLnJvdXRlLmhhbmRsZXI7XG5cdCAgICAgIG0ucm91dGUucm91dGUgaW5zdGFuY2VvZiBSZWdFeHAgPyBoYW5kbGVyLmFwcGx5KHVuZGVmaW5lZCwgX3RvQ29uc3VtYWJsZUFycmF5KG0ubWF0Y2guc2xpY2UoMSwgbS5tYXRjaC5sZW5ndGgpKSkgOiBoYW5kbGVyKG0ucGFyYW1zKTtcblx0ICAgICAgcmV0dXJuIG07XG5cdCAgICB9IGVsc2UgaWYgKHRoaXMuX2RlZmF1bHRIYW5kbGVyICYmICh1cmwgPT09ICcnIHx8IHVybCA9PT0gJy8nKSkge1xuXHQgICAgICB0aGlzLl9kZWZhdWx0SGFuZGxlcigpO1xuXHQgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgIH0gZWxzZSBpZiAodGhpcy5fbm90Rm91bmRIYW5kbGVyKSB7XG5cdCAgICAgIHRoaXMuX25vdEZvdW5kSGFuZGxlcigpO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0sXG5cdCAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0ICAgIHRoaXMuX3JvdXRlcyA9IFtdO1xuXHQgICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcblx0ICAgIGNsZWFyVGltZW91dCh0aGlzLl9saXN0ZW5uaW5nSW50ZXJ2YWwpO1xuXHQgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cub25wb3BzdGF0ZSA9IG51bGwgOiBudWxsO1xuXHQgIH0sXG5cdCAgdXBkYXRlUGFnZUxpbmtzOiBmdW5jdGlvbiB1cGRhdGVQYWdlTGlua3MoKSB7XG5cdCAgICB2YXIgc2VsZiA9IHRoaXM7XG5cdFxuXHQgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblx0XG5cdCAgICB0aGlzLl9maW5kTGlua3MoKS5mb3JFYWNoKGZ1bmN0aW9uIChsaW5rKSB7XG5cdCAgICAgIGlmICghbGluay5oYXNMaXN0ZW5lckF0dGFjaGVkKSB7XG5cdCAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICB2YXIgbG9jYXRpb24gPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuXHRcblx0ICAgICAgICAgIGlmICghc2VsZi5fZGVzdHJveWVkKSB7XG5cdCAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgICAgICAgICAgc2VsZi5uYXZpZ2F0ZShjbGVhbihsb2NhdGlvbikpO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXHQgICAgICAgIGxpbmsuaGFzTGlzdGVuZXJBdHRhY2hlZCA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXHQgIH0sXG5cdCAgZ2VuZXJhdGU6IGZ1bmN0aW9uIGdlbmVyYXRlKG5hbWUpIHtcblx0ICAgIHZhciBkYXRhID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cdFxuXHQgICAgcmV0dXJuIHRoaXMuX3JvdXRlcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgcm91dGUpIHtcblx0ICAgICAgdmFyIGtleTtcblx0XG5cdCAgICAgIGlmIChyb3V0ZS5uYW1lID09PSBuYW1lKSB7XG5cdCAgICAgICAgcmVzdWx0ID0gcm91dGUucm91dGU7XG5cdCAgICAgICAgZm9yIChrZXkgaW4gZGF0YSkge1xuXHQgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJzonICsga2V5LCBkYXRhW2tleV0pO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgfSwgJycpO1xuXHQgIH0sXG5cdCAgbGluazogZnVuY3Rpb24gbGluayhwYXRoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fZ2V0Um9vdCgpICsgcGF0aDtcblx0ICB9LFxuXHQgIHBhdXNlOiBmdW5jdGlvbiBwYXVzZShzdGF0dXMpIHtcblx0ICAgIHRoaXMuX3BhdXNlZCA9IHN0YXR1cztcblx0ICB9LFxuXHQgIGRpc2FibGVJZkFQSU5vdEF2YWlsYWJsZTogZnVuY3Rpb24gZGlzYWJsZUlmQVBJTm90QXZhaWxhYmxlKCkge1xuXHQgICAgaWYgKCFpc1B1c2hTdGF0ZUF2YWlsYWJsZSgpKSB7XG5cdCAgICAgIHRoaXMuZGVzdHJveSgpO1xuXHQgICAgfVxuXHQgIH0sXG5cdCAgX2FkZDogZnVuY3Rpb24gX2FkZChyb3V0ZSkge1xuXHQgICAgdmFyIGhhbmRsZXIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXHRcblx0ICAgIGlmICgodHlwZW9mIGhhbmRsZXIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGhhbmRsZXIpKSA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgdGhpcy5fcm91dGVzLnB1c2goeyByb3V0ZTogcm91dGUsIGhhbmRsZXI6IGhhbmRsZXIudXNlcywgbmFtZTogaGFuZGxlci5hcyB9KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX3JvdXRlcy5wdXNoKHsgcm91dGU6IHJvdXRlLCBoYW5kbGVyOiBoYW5kbGVyIH0pO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXMuX2FkZDtcblx0ICB9LFxuXHQgIF9nZXRSb290OiBmdW5jdGlvbiBfZ2V0Um9vdCgpIHtcblx0ICAgIGlmICh0aGlzLnJvb3QgIT09IG51bGwpIHJldHVybiB0aGlzLnJvb3Q7XG5cdCAgICB0aGlzLnJvb3QgPSByb290KHRoaXMuX2NMb2MoKSwgdGhpcy5fcm91dGVzKTtcblx0ICAgIHJldHVybiB0aGlzLnJvb3Q7XG5cdCAgfSxcblx0ICBfbGlzdGVuOiBmdW5jdGlvbiBfbGlzdGVuKCkge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblx0XG5cdCAgICBpZiAodGhpcy5fb2spIHtcblx0ICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgX3RoaXMucmVzb2x2ZSgpO1xuXHQgICAgICB9O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgY2FjaGVkID0gX3RoaXMuX2NMb2MoKSxcblx0ICAgICAgICAgICAgY3VycmVudCA9IHVuZGVmaW5lZCxcblx0ICAgICAgICAgICAgX2NoZWNrID0gdW5kZWZpbmVkO1xuXHRcblx0ICAgICAgICBfY2hlY2sgPSBmdW5jdGlvbiBjaGVjaygpIHtcblx0ICAgICAgICAgIGN1cnJlbnQgPSBfdGhpcy5fY0xvYygpO1xuXHQgICAgICAgICAgaWYgKGNhY2hlZCAhPT0gY3VycmVudCkge1xuXHQgICAgICAgICAgICBjYWNoZWQgPSBjdXJyZW50O1xuXHQgICAgICAgICAgICBfdGhpcy5yZXNvbHZlKCk7XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgICBfdGhpcy5fbGlzdGVubmluZ0ludGVydmFsID0gc2V0VGltZW91dChfY2hlY2ssIDIwMCk7XG5cdCAgICAgICAgfTtcblx0ICAgICAgICBfY2hlY2soKTtcblx0ICAgICAgfSkoKTtcblx0ICAgIH1cblx0ICB9LFxuXHQgIF9jTG9jOiBmdW5jdGlvbiBfY0xvYygpIHtcblx0ICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHQgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gJyc7XG5cdCAgfSxcblx0ICBfZmluZExpbmtzOiBmdW5jdGlvbiBfZmluZExpbmtzKCkge1xuXHQgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmF2aWdvXScpKTtcblx0ICB9XG5cdH07XG5cdFxuXHRleHBvcnRzLmRlZmF1bHQgPSBOYXZpZ287XG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXZpZ28uanMubWFwIiwiY29uc3QgcnVuID0gKGNiLCBhcmdzKSA9PiB7XG4gIGNiKClcbiAgYXJncy5sZW5ndGggPiAwICYmIGFyZ3Muc2hpZnQoKSguLi5hcmdzKVxufVxuXG5leHBvcnQgY29uc3QgdGFycnkgPSAoY2IsIGRlbGF5ID0gbnVsbCkgPT4gKC4uLmFyZ3MpID0+IHtcbiAgbGV0IG92ZXJyaWRlID0gJ251bWJlcicgPT09IHR5cGVvZiBhcmdzWzBdID8gYXJnc1swXSA6IG51bGwgXG4gIHJldHVybiAnbnVtYmVyJyA9PT0gdHlwZW9mIG92ZXJyaWRlICYmIG92ZXJyaWRlID4gLTEgXG4gICAgPyB0YXJyeShjYiwgb3ZlcnJpZGUpIFxuICAgIDogJ251bWJlcicgPT09IHR5cGVvZiBkZWxheSAmJiBkZWxheSA+IC0xIFxuICAgICAgPyBzZXRUaW1lb3V0KCgpID0+IHJ1bihjYiwgYXJncyksIGRlbGF5KSBcbiAgICAgIDogcnVuKGNiLCBhcmdzKVxufVxuXG5leHBvcnQgY29uc3QgcXVldWUgPSAoLi4uYXJncykgPT4gKCkgPT4gYXJncy5zaGlmdCgpKC4uLmFyZ3MpXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX3RyYW5zZm9ybVByb3BzID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0tcHJvcHMnKTtcblxudmFyIF90cmFuc2Zvcm1Qcm9wczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90cmFuc2Zvcm1Qcm9wcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBoID0gZnVuY3Rpb24gaCh0YWcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaXNQcm9wcyhhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pID8gYXBwbHlQcm9wcyh0YWcpKGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXSkgOiBhcHBlbmRDaGlsZHJlbih0YWcpLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbnZhciBpc09iaiA9IGZ1bmN0aW9uIGlzT2JqKG8pIHtcbiAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvKSkgPT09ICdvYmplY3QnO1xufTtcblxudmFyIGlzUHJvcHMgPSBmdW5jdGlvbiBpc1Byb3BzKGFyZykge1xuICByZXR1cm4gaXNPYmooYXJnKSAmJiAhKGFyZyBpbnN0YW5jZW9mIEVsZW1lbnQpO1xufTtcblxudmFyIGFwcGx5UHJvcHMgPSBmdW5jdGlvbiBhcHBseVByb3BzKHRhZykge1xuICByZXR1cm4gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc1Byb3BzKGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgcmV0dXJuIGgodGFnKShPYmplY3QuYXNzaWduKHt9LCBwcm9wcywgYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBlbCA9IGgodGFnKS5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgcCA9ICgwLCBfdHJhbnNmb3JtUHJvcHMyLmRlZmF1bHQpKHByb3BzKTtcbiAgICAgIE9iamVjdC5rZXlzKHApLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgaWYgKC9eb24vLnRlc3QoaykpIHtcbiAgICAgICAgICBlbFtrXSA9IHBba107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGssIHBba10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuICB9O1xufTtcblxudmFyIGFwcGVuZENoaWxkcmVuID0gZnVuY3Rpb24gYXBwZW5kQ2hpbGRyZW4odGFnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYyBpbnN0YW5jZW9mIEVsZW1lbnQgPyBjIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYyk7XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuIGVsLmFwcGVuZENoaWxkKGMpO1xuICAgIH0pO1xuICAgIHJldHVybiBlbDtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGg7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGtlYmFiID0gZXhwb3J0cy5rZWJhYiA9IGZ1bmN0aW9uIGtlYmFiKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbQS1aXSkvZywgZnVuY3Rpb24gKGcpIHtcbiAgICByZXR1cm4gJy0nICsgZy50b0xvd2VyQ2FzZSgpO1xuICB9KTtcbn07XG5cbnZhciBwYXJzZVZhbHVlID0gZXhwb3J0cy5wYXJzZVZhbHVlID0gZnVuY3Rpb24gcGFyc2VWYWx1ZShwcm9wKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInID8gYWRkUHgocHJvcCkodmFsKSA6IHZhbDtcbiAgfTtcbn07XG5cbnZhciB1bml0bGVzc1Byb3BlcnRpZXMgPSBleHBvcnRzLnVuaXRsZXNzUHJvcGVydGllcyA9IFsnbGluZUhlaWdodCcsICdmb250V2VpZ2h0JywgJ29wYWNpdHknLCAnekluZGV4J1xuLy8gUHJvYmFibHkgbmVlZCBhIGZldyBtb3JlLi4uXG5dO1xuXG52YXIgYWRkUHggPSBleHBvcnRzLmFkZFB4ID0gZnVuY3Rpb24gYWRkUHgocHJvcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiB1bml0bGVzc1Byb3BlcnRpZXMuaW5jbHVkZXMocHJvcCkgPyB2YWwgOiB2YWwgKyAncHgnO1xuICB9O1xufTtcblxudmFyIGZpbHRlck51bGwgPSBleHBvcnRzLmZpbHRlck51bGwgPSBmdW5jdGlvbiBmaWx0ZXJOdWxsKG9iaikge1xuICByZXR1cm4gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBvYmpba2V5XSAhPT0gbnVsbDtcbiAgfTtcbn07XG5cbnZhciBjcmVhdGVEZWMgPSBleHBvcnRzLmNyZWF0ZURlYyA9IGZ1bmN0aW9uIGNyZWF0ZURlYyhzdHlsZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZWJhYihrZXkpICsgJzonICsgcGFyc2VWYWx1ZShrZXkpKHN0eWxlW2tleV0pO1xuICB9O1xufTtcblxudmFyIHN0eWxlVG9TdHJpbmcgPSBleHBvcnRzLnN0eWxlVG9TdHJpbmcgPSBmdW5jdGlvbiBzdHlsZVRvU3RyaW5nKHN0eWxlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZSkuZmlsdGVyKGZpbHRlck51bGwoc3R5bGUpKS5tYXAoY3JlYXRlRGVjKHN0eWxlKSkuam9pbignOycpO1xufTtcblxudmFyIGlzU3R5bGVPYmplY3QgPSBleHBvcnRzLmlzU3R5bGVPYmplY3QgPSBmdW5jdGlvbiBpc1N0eWxlT2JqZWN0KHByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleSA9PT0gJ3N0eWxlJyAmJiBwcm9wc1trZXldICE9PSBudWxsICYmIF90eXBlb2YocHJvcHNba2V5XSkgPT09ICdvYmplY3QnO1xuICB9O1xufTtcblxudmFyIGNyZWF0ZVN0eWxlID0gZXhwb3J0cy5jcmVhdGVTdHlsZSA9IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlKHByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGlzU3R5bGVPYmplY3QocHJvcHMpKGtleSkgPyBzdHlsZVRvU3RyaW5nKHByb3BzW2tleV0pIDogcHJvcHNba2V5XTtcbiAgfTtcbn07XG5cbnZhciByZWR1Y2VQcm9wcyA9IGV4cG9ydHMucmVkdWNlUHJvcHMgPSBmdW5jdGlvbiByZWR1Y2VQcm9wcyhwcm9wcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGEsIGtleSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGEsIF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCBjcmVhdGVTdHlsZShwcm9wcykoa2V5KSkpO1xuICB9O1xufTtcblxudmFyIHRyYW5zZm9ybVByb3BzID0gZXhwb3J0cy50cmFuc2Zvcm1Qcm9wcyA9IGZ1bmN0aW9uIHRyYW5zZm9ybVByb3BzKHByb3BzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcykucmVkdWNlKHJlZHVjZVByb3BzKHByb3BzKSwge30pO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gdHJhbnNmb3JtUHJvcHM7Il19
