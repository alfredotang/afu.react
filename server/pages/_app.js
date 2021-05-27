(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6071:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


var _interopRequireWildcard = __webpack_require__(9448);

__webpack_unused_export__ = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(9297));

var _router = __webpack_require__(1689);

var _router2 = __webpack_require__(2441);

var _useIntersection = __webpack_require__(5749);

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router.isLocalURL)(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (false) {}
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
  event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null) {
    scroll = as.indexOf('#') < 0;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  });
}

function Link(props) {
  if (false) {}

  const p = props.prefetch !== false;
  const router = (0, _router2.useRouter)();
  const pathname = router && router.pathname || '/';

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref
    };
  }, [pathname, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  const child = _react.Children.only(children);

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  (0, _react.useEffect)(() => {
    const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);
  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router.isLocalURL)(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ 6528:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;
/**
* Removes the trailing slash of a path if there is one. Preserves the root path `/`.
*/

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}
/**
* Normalizes the trailing slash of a path according to the `trailingSlash` option
* in `next.config.js`.
*/


const normalizePathTrailingSlash =  false ? 0 : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ 8391:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ 7599:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2426);

exports.__esModule = true;
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.default = void 0;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(2238));

var _requestIdleCallback = __webpack_require__(8391); // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? // eslint-disable-next-line no-sequences
  generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (_unused) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR'); // TODO: unexport

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // Resolve a promise that times out after given amount of milliseconds.


function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject);
    (0, _requestIdleCallback.requestIdleCallback)(() => setTimeout(() => {
      if (!cancelled) {
        reject(err);
      }
    }, ms));
  });
} // TODO: stop exporting or cache the failure
// It'd be best to stop exporting this. It's an implementation detail. We're
// only exporting it for backwards compatibilty with the `page-loader`.
// Only cache this response as a last resort if we cannot eliminate all other
// code branches that use the Build Manifest Callback and push them through
// the Route Loader interface.


function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (false) {}

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route, prefetch) {
      return withFuture(route, routes, () => {
        return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({
          scripts,
          css
        }) => {
          return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
        }).then(res => {
          return this.whenEntrypoint(route).then(entrypoint => ({
            entrypoint,
            styles: res[1]
          }));
        }), MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({
          entrypoint,
          styles
        }) => {
          const res = Object.assign({
            styles: styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        }).catch(err => {
          if (prefetch) {
            // we don't want to cache errors during prefetch
            throw err;
          }

          return {
            error: err
          };
        });
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback.requestIdleCallback)(() => this.loadRoute(route, true).catch(() => {}));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

var _default = createRouteLoader;
exports.default = _default;

/***/ }),

/***/ 2441:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(9448);

var _interopRequireDefault = __webpack_require__(2426);

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(9297));

var _router2 = _interopRequireWildcard(__webpack_require__(1689));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(8417);

var _withRouter = _interopRequireDefault(__webpack_require__(3168));

exports.withRouter = _withRouter.default;
/* global window */

const singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


const createRouter = (...args) => {
  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  const _router = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ 5749:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(9297);

var _requestIdleCallback = __webpack_require__(8391);

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ 3168:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(2426);

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(9297));

var _router = __webpack_require__(2441);

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) {}

  return WithRouterWrapper;
}

/***/ }),

/***/ 1253:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.normalizeLocalePath = normalizeLocalePath;

function normalizeLocalePath(pathname, locales) {
  let detectedLocale; // first item will be empty string from splitting at first char

  const pathnameParts = pathname.split('/');
  (locales || []).some(locale => {
    if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
      detectedLocale = locale;
      pathnameParts.splice(1, 1);
      pathname = pathnameParts.join('/') || '/';
      return true;
    }

    return false;
  });
  return {
    pathname,
    detectedLocale
  };
}

/***/ }),

/***/ 7332:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.default = mitt;
/*
MIT License
Copyright (c) Jason Miller (https://jasonformat.com/)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// This file is based on https://github.com/developit/mitt/blob/v1.1.3/src/index.js
// It's been edited for the needs of this script
// See the LICENSE at the top of the file

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

/***/ }),

/***/ 1689:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__(6528);

var _routeLoader = __webpack_require__(7599);

var _denormalizePagePath = __webpack_require__(9320);

var _normalizeLocalePath = __webpack_require__(1253);

var _mitt = _interopRequireDefault(__webpack_require__(7332));

var _utils = __webpack_require__(3937);

var _isDynamic = __webpack_require__(3288);

var _parseRelativeUrl = __webpack_require__(4436);

var _querystring = __webpack_require__(4915);

var _resolveRewrites = _interopRequireDefault(__webpack_require__(4453));

var _routeMatcher = __webpack_require__(7451);

var _routeRegex = __webpack_require__(8193);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // tslint:disable:no-console


let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {}

  return false;
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}
/**
* Detects whether a given url is routable by the Next.js router (browser only).
*/


function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils.getLocationOrigin)();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && ( // Interpolate group into data URL if present
    interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = ''; // did not satisfy all requirements
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}
/**
* Resolves a given hyperlink with a certain router state (basePath not included).
* Preserves absolute urls.
*/


function resolveHref(currentPath, href, resolveAs) {
  // we use a dummy base url for relative urls
  const base = new URL(currentPath, 'http://n');
  const urlAsString = typeof href === 'string' ? href : (0, _utils.formatWithValidation)(href); // Return because it cannot be routed by the Next.js router

  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils.formatWithValidation)({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils.getLocationOrigin)();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router.pathname, url, true);
  const origin = (0, _utils.getLocationOrigin)();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router.pathname, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }

  return (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
}

const manualScrollRestoration = (/* unused pure expression or super */ null && ( false && 0));
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader.markAssetError)(err);
    }

    throw err;
  });
}

class Router {
  /**
  * Map of all components loaded in `Router`
  */
  // Static Data Cache
  // In-flight Server Data Requests, for deduping
  constructor(_pathname, _query, _as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    this.route = void 0;
    this.pathname = void 0;
    this.query = void 0;
    this.asPath = void 0;
    this.basePath = void 0;
    this.components = void 0;
    this.sdc = {};
    this.sdr = {};
    this.sub = void 0;
    this.clc = void 0;
    this.pageLoader = void 0;
    this._bps = void 0;
    this.events = void 0;
    this._wrapApp = void 0;
    this.isSsr = void 0;
    this.isFallback = void 0;
    this._inFlightRoute = void 0;
    this._shallow = void 0;
    this.locale = void 0;
    this.locales = void 0;
    this.defaultLocale = void 0;
    this.domainLocales = void 0;
    this.isReady = void 0;
    this.isPreview = void 0;
    this.isLocaleDomain = void 0;
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', (0, _utils.formatWithValidation)({
          pathname: addBasePath(pathname),
          query
        }), (0, _utils.getURL)());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname
      } = (0, _parseRelativeUrl.parseRelativeUrl)(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as === this.asPath && pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (_pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        initial: true,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: [
        /* /_app does not need its stylesheets managed */
      ]
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = _pathname;
    this.query = _query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? _pathname : _as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search && !false);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ;
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    var _options$scroll;

    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    } // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated


    if (options._h) {
      this.isReady = true;
    } // Default to scroll reset behavior unless explicitly specified to be
    // `false`! This makes the behavior between using `Router#push` and a
    // `<Link />` consistent.


    options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
    let localeChange = options.locale !== this.locale;

    if (false) { var _this$locales; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs)) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname,
      query
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader.getClientBuildManifest)());
    } catch (err) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    } // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url


    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    } // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly


    let resolvedAs = as; // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1

    pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname;

    if (pathname !== '/_error') {
      if (false) {} else {
        parsed.pathname = resolveDynamicRoute(pathname, pages);

        if (parsed.pathname !== pathname) {
          pathname = parsed.pathname;
          url = (0, _utils.formatWithValidation)(parsed);
        }
      }
    }

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);

    if (!isLocalURL(as)) {
      if (false) {}

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic.isDynamicRoute)(route)) {
      const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex.getRouteRegex)(route);
      const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

        if (missingParams.length > 0) {
          if (false) {}

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var _self$__NEXT_DATA__$p, _self$__NEXT_DATA__$p2;

      let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);

            if (pages.includes(parsedHref.pathname)) {
              const {
                url: newUrl,
                as: newAs
              } = prepareUrlAs(this, destination, destination);
              return this.change(method, newUrl, newAs, options);
            }
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (false) {} // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      if (options._h && pathname === '/_error' && ((_self$__NEXT_DATA__$p = self.__NEXT_DATA__.props) == null ? void 0 : (_self$__NEXT_DATA__$p2 = _self$__NEXT_DATA__$p.pageProps) == null ? void 0 : _self$__NEXT_DATA__$p2.statusCode) === 500 && props != null && props.pageProps) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      }

      await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {
        x: 0,
        y: 0
      })).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err) {
      if (err.cancelled) {
        return false;
      }

      throw err;
    }
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component;
      let styleSheets;
      let props;

      if (typeof Component === 'undefined' || typeof styleSheets === 'undefined') {
        ;
        ({
          page: Component,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (false) {}

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err) {
      return this.handleRouteInfoError(err, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
    let {
      pathname
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;

    if (false) {} else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);

      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
    }

    const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname); // Prefetch is not supported in development mode because it would trigger on-demand-entries

    if (false) {}

    await Promise.all([this.pageLoader._isSsg(route).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if ( true && !this.isPreview && this.sdc[cacheKey]) {
      return Promise.resolve(this.sdc[cacheKey]);
    }

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err => {
      delete this.sdr[resourceKey];
      throw err;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return (0, _utils.loadGetInitialProps)(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

exports.default = Router;
Router.events = (0, _mitt.default)();

/***/ }),

/***/ 7687:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatUrl = formatUrl;

var querystring = _interopRequireWildcard(__webpack_require__(4915));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
} // Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


const slashedProtocols = /https?|ftp|gopher|file/;

function formatUrl(urlObj) {
  let {
    auth,
    hostname
  } = urlObj;
  let protocol = urlObj.protocol || '';
  let pathname = urlObj.pathname || '';
  let hash = urlObj.hash || '';
  let query = urlObj.query || '';
  let host = false;
  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';

  if (urlObj.host) {
    host = auth + urlObj.host;
  } else if (hostname) {
    host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);

    if (urlObj.port) {
      host += ':' + urlObj.port;
    }
  }

  if (query && typeof query === 'object') {
    query = String(querystring.urlQueryToSearchParams(query));
  }

  let search = urlObj.search || query && `?${query}` || '';
  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash[0] !== '#') hash = '#' + hash;
  if (search && search[0] !== '?') search = '?' + search;
  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
  search = search.replace('#', '%23');
  return `${protocol}${host}${pathname}${search}${hash}`;
}

/***/ }),

/***/ 3288:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.isDynamicRoute = isDynamicRoute; // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

/***/ }),

/***/ 4436:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parseRelativeUrl = parseRelativeUrl;

var _utils = __webpack_require__(3937);

var _querystring = __webpack_require__(4915);
/**
* Parses path-relative urls (e.g. `/hello/world?foo=bar`). If url isn't path-relative
* (e.g. `./hello`) then at least base must be.
* Absolute urls are rejected with one exception, in the browser, absolute urls that are on
* the current origin will be parsed as relative
*/


function parseRelativeUrl(url, base) {
  const globalBase = new URL( true ? 'http://n' : 0);
  const resolvedBase = base ? new URL(base, globalBase) : globalBase;
  const {
    pathname,
    searchParams,
    search,
    hash,
    href,
    origin
  } = new URL(url, resolvedBase);

  if (origin !== globalBase.origin) {
    throw new Error(`invariant: invalid relative URL, router received ${url}`);
  }

  return {
    pathname,
    query: (0, _querystring.searchParamsToUrlQuery)(searchParams),
    search,
    hash,
    href: href.slice(globalBase.origin.length)
  };
}

/***/ }),

/***/ 4915:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;

function searchParamsToUrlQuery(searchParams) {
  const query = {};
  searchParams.forEach((value, key) => {
    if (typeof query[key] === 'undefined') {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      ;
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

function stringifyUrlQueryParam(param) {
  if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
    return String(param);
  } else {
    return '';
  }
}

function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams();
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => result.append(key, stringifyUrlQueryParam(item)));
    } else {
      result.set(key, stringifyUrlQueryParam(value));
    }
  });
  return result;
}

function assign(target, ...searchParamsList) {
  searchParamsList.forEach(searchParams => {
    Array.from(searchParams.keys()).forEach(key => target.delete(key));
    searchParams.forEach((value, key) => target.append(key, value));
  });
  return target;
}

/***/ }),

/***/ 7451:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.getRouteMatcher = getRouteMatcher;

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

/***/ }),

/***/ 8193:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.getRouteRegex = getRouteRegex; // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function parseParameter(param) {
  const optional = param.startsWith('[') && param.endsWith(']');

  if (optional) {
    param = param.slice(1, -1);
  }

  const repeat = param.startsWith('...');

  if (repeat) {
    param = param.slice(3);
  }

  return {
    key: param,
    repeat,
    optional
  };
}

function getRouteRegex(normalizedRoute) {
  const segments = (normalizedRoute.replace(/\/$/, '') || '/').slice(1).split('/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = segments.map(segment => {
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const {
        key,
        optional,
        repeat
      } = parseParameter(segment.slice(1, -1));
      groups[key] = {
        pos: groupIndex++,
        repeat,
        optional
      };
      return repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
    } else {
      return `/${escapeRegex(segment)}`;
    }
  }).join(''); // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1; // builds a minimal routeKey using only a-z and minimal number of characters

    const getSafeRouteKey = () => {
      let routeKey = '';

      for (let i = 0; i < routeKeyCharLength; i++) {
        routeKey += String.fromCharCode(routeKeyCharCode);
        routeKeyCharCode++;

        if (routeKeyCharCode > 122) {
          routeKeyCharLength++;
          routeKeyCharCode = 97;
        }
      }

      return routeKey;
    };

    const routeKeys = {};
    let namedParameterizedRoute = segments.map(segment => {
      if (segment.startsWith('[') && segment.endsWith(']')) {
        const {
          key,
          optional,
          repeat
        } = parseParameter(segment.slice(1, -1)); // replace any non-word characters since they can break
        // the named regex

        let cleanedKey = key.replace(/\W/g, '');
        let invalidKey = false; // check if the key is still invalid and fallback to using a known
        // safe key

        if (cleanedKey.length === 0 || cleanedKey.length > 30) {
          invalidKey = true;
        }

        if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
          invalidKey = true;
        }

        if (invalidKey) {
          cleanedKey = getSafeRouteKey();
        }

        routeKeys[cleanedKey] = key;
        return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join('');
    return {
      re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
      groups,
      routeKeys,
      namedRegex: `^${namedParameterizedRoute}(?:/)?$`
    };
  }

  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups
  };
}

/***/ }),

/***/ 3937:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.execOnce = execOnce;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;
exports.getDisplayName = getDisplayName;
exports.isResSent = isResSent;
exports.loadGetInitialProps = loadGetInitialProps;
exports.formatWithValidation = formatWithValidation;
exports.ST = exports.SP = exports.urlObjectKeys = void 0;

var _formatUrl = __webpack_require__(7687);
/**
* Utils
*/


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

function isResSent(res) {
  return res.finished || res.headersSent;
}

async function loadGetInitialProps(App, ctx) {
  if (false) { var _App$prototype; } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

const urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];
exports.urlObjectKeys = urlObjectKeys;

function formatWithValidation(url) {
  if (false) {}

  return (0, _formatUrl.formatUrl)(url);
}

const SP = typeof performance !== 'undefined';
exports.SP = SP;
const ST = SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';
exports.ST = ST;

/***/ }),

/***/ 1590:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "fc": function() { return /* reexport */ chipInput; },
  "xZ": function() { return /* reexport */ dateTimePicker; },
  "ot": function() { return /* reexport */ dateTimeRangePickerForForm; },
  "h4": function() { return /* reexport */ header; },
  "II": function() { return /* reexport */ input; },
  "Ph": function() { return /* reexport */ components_select; },
  "YE": function() { return /* reexport */ sidebar; },
  "bI": function() { return /* reexport */ wordCounter; }
});

// UNUSED EXPORTS: DateTimeRangePicker

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(4554);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "@material-ui/core/AppBar"
var AppBar_ = __webpack_require__(2905);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_);
// EXTERNAL MODULE: external "@material-ui/core/Toolbar"
var Toolbar_ = __webpack_require__(4925);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_);
;// CONCATENATED MODULE: external "@material-ui/core/Typography"
var Typography_namespaceObject = require("@material-ui/core/Typography");;
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_namespaceObject);
;// CONCATENATED MODULE: ./src/components/header/index.tsx








const Header = () => {
  return (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [jsx_runtime_.jsx((AppBar_default()), {
      position: "fixed",
      color: "default",
      sx: {
        zIndex: theme => theme.zIndex.drawer + 1
      },
      children: jsx_runtime_.jsx((Toolbar_default()), {
        children: jsx_runtime_.jsx(next_link.default, {
          href: "/",
          children: jsx_runtime_.jsx((Typography_default()), {
            variant: "overline",
            children: "AFU React Practice"
          })
        })
      })
    }), jsx_runtime_.jsx((Toolbar_default()), {})]
  });
};

/* harmony default export */ var header = (Header);
// EXTERNAL MODULE: external "@material-ui/core"
var core_ = __webpack_require__(1731);
;// CONCATENATED MODULE: ./src/components/sidebar/index.tsx




const Sidebar = () => {
  return jsx_runtime_.jsx(core_.Box, {
    sx: {
      position: 'fixed',
      width: '25%',
      height: '100%',
      p: 1,
      borderRight: theme => `1px solid ${theme.palette.divider}`
    },
    children: (0,jsx_runtime_.jsxs)(core_.List, {
      children: [jsx_runtime_.jsx(core_.ListItem, {
        button: true,
        href: "/",
        component: "a",
        children: "home"
      }), jsx_runtime_.jsx(core_.ListItem, {
        button: true,
        href: "/form-practice",
        component: "a",
        children: "FormPractice"
      }), jsx_runtime_.jsx(core_.ListItem, {
        button: true,
        href: "/lab",
        component: "a",
        children: "lab"
      })]
    })
  });
};

/* harmony default export */ var sidebar = (Sidebar);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: ./src/components/wordCounter/index.tsx






function returnColor(theme, isDisabled, isError) {
  if (isDisabled) {
    return theme.palette.text.disabled;
  }

  if (isError) {
    return theme.palette.error.main;
  }

  return theme.palette.text.primary;
}

/**
 * @name WordCounter
 * @description 字數計算 wrapper
 * @param {WordCounterProps} props
 * @note 使用方式
 * <WordCounter>
 *  <Input maxLength={20} value={inputValue} type="text"/>
 * </WordCounter>
 */
const WordCounter = ({
  children
}) => {
  var _ChildElement$props, _ChildElement$props2, _ChildElement$props3, _ChildElement$props4, _ChildElement$props5;

  const ChildElement = /*#__PURE__*/(0,external_react_.cloneElement)(children);
  const value = (ChildElement === null || ChildElement === void 0 ? void 0 : (_ChildElement$props = ChildElement.props) === null || _ChildElement$props === void 0 ? void 0 : _ChildElement$props.value) || '';
  const maxLength = (ChildElement === null || ChildElement === void 0 ? void 0 : (_ChildElement$props2 = ChildElement.props) === null || _ChildElement$props2 === void 0 ? void 0 : _ChildElement$props2.maxLength) || null;
  const error = (ChildElement === null || ChildElement === void 0 ? void 0 : (_ChildElement$props3 = ChildElement.props) === null || _ChildElement$props3 === void 0 ? void 0 : _ChildElement$props3.error) || false;
  const isError = value.length > maxLength || error;
  const hasHelperText = (ChildElement === null || ChildElement === void 0 ? void 0 : (_ChildElement$props4 = ChildElement.props) === null || _ChildElement$props4 === void 0 ? void 0 : _ChildElement$props4.helperText) || '';
  const isDisabled = (ChildElement === null || ChildElement === void 0 ? void 0 : (_ChildElement$props5 = ChildElement.props) === null || _ChildElement$props5 === void 0 ? void 0 : _ChildElement$props5.disabled) || false;
  return (0,jsx_runtime_.jsxs)(core_.Grid, {
    container: true,
    children: [jsx_runtime_.jsx(core_.Grid, {
      item: true,
      xs: 12,
      children: ChildElement
    }), (0,jsx_runtime_.jsxs)(core_.Grid, {
      item: true,
      xs: 12,
      alignItems: "flex-end",
      justifyContent: "flex-end",
      display: "flex",
      sx: {
        color: theme => returnColor(theme, isDisabled, isError),
        position: error && hasHelperText ? 'relative' : 'static',
        top: '-20px'
      },
      children: ["(", value.length, "/", maxLength, ")"]
    })]
  });
};

/* harmony default export */ var wordCounter = (/*#__PURE__*/(0,external_react_.memo)(WordCounter));
;// CONCATENATED MODULE: external "@material-ui/core/Input"
var Input_namespaceObject = require("@material-ui/core/Input");;
var Input_default = /*#__PURE__*/__webpack_require__.n(Input_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/Chip"
var Chip_namespaceObject = require("@material-ui/core/Chip");;
var Chip_default = /*#__PURE__*/__webpack_require__.n(Chip_namespaceObject);
// EXTERNAL MODULE: external "@material-ui/core/Box"
var Box_ = __webpack_require__(1658);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);
;// CONCATENATED MODULE: external "uuid"
var external_uuid_namespaceObject = require("uuid");;
;// CONCATENATED MODULE: external "lodash/cloneDeep"
var cloneDeep_namespaceObject = require("lodash/cloneDeep");;
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep_namespaceObject);
;// CONCATENATED MODULE: external "lodash/uniq"
var uniq_namespaceObject = require("lodash/uniq");;
var uniq_default = /*#__PURE__*/__webpack_require__.n(uniq_namespaceObject);
;// CONCATENATED MODULE: ./src/components/chipInput/index.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









/**
 * 多個以標籤顯示的輸入元件
 * ╭―――――――――――――――――――――――――――╮
 * │ ┏━━━┓                     │
 * │ ┃ A ┃ 輸入按 enter         │
 * │ ┗━━━┛ ——————————————————  │
 * ╰―――――――――――――――――――――――――――╯
 * @param props ChipInputProps
 */
const ChipInput = ({
  disabled = false,
  placeholder = '',
  value = [],
  sx = {},
  onAdd,
  onDelete
}) => {
  var _chipData$value;

  const {
    0: chipData,
    1: setChipData
  } = (0,external_react_.useState)({
    currentInputValue: '',
    value: []
  });
  const inputRef = (0,external_react_.useRef)(null);

  const handleInputChange = event => {
    setChipData(preState => {
      const stateCopy = cloneDeep_default()(preState);
      return _objectSpread(_objectSpread({}, stateCopy), {}, {
        currentInputValue: event.target.value
      });
    });
  };
  /**
   * @name handleBlurInput
   * @description on blur 輸入匡時，要 clean input 上的輸入文字
   * @param {FocusEvent} event
   */


  const handleBlurInput = event => {
    setChipData(preState => {
      const stateCopy = cloneDeep_default()(preState);
      return _objectSpread(_objectSpread({}, stateCopy), {}, {
        currentInputValue: ''
      });
    });
  };
  /**
   * @name handlePressEnter
   * @description 按下 "Enter" 時，要把 input 上的 文字 轉成 chip
   */


  const handlePressEnter = () => {
    // 檢查 input value 是否為空值
    // // 若為空值 則 不 set state
    if (!chipData.currentInputValue) {
      return;
    } // 檢查是否有重複的值已存在
    // 若有則 不 set state


    if (chipData.value.some(item => item.value === chipData.currentInputValue)) {
      return;
    } // 檢查有沒有用 ,


    const currentValueSplitByComma = uniq_default()(chipData.currentInputValue.split(',')); // 若輸入 s,m,l
    // 可以一次新增 s m l

    if (currentValueSplitByComma.length > 1) {
      // 檢查是否有重複的值已存在
      // 若有則 不 set state
      if (currentValueSplitByComma.some(item => item === chipData.currentInputValue)) {
        return;
      }

      const result = currentValueSplitByComma.map(item => {
        return {
          key: (0,external_uuid_namespaceObject.v4)(),
          value: item.trim()
        };
      }).filter(item => item.value);
      setChipData(preState => {
        const stateCopy = cloneDeep_default()(preState);

        const newState = _objectSpread(_objectSpread({}, stateCopy), {}, {
          currentInputValue: ''
        });

        newState.value.concat(result);
        return newState;
      });
      const resultForCB = result.map(item => item.value);
      onAdd(resultForCB);
    } else {
      setChipData(preState => {
        const stateCopy = cloneDeep_default()(preState);

        const newState = _objectSpread(_objectSpread({}, stateCopy), {}, {
          currentInputValue: ''
        });

        newState.value.push({
          key: (0,external_uuid_namespaceObject.v4)(),
          value: stateCopy.currentInputValue
        });
        return newState;
      });
      onAdd([chipData.currentInputValue]);
    }
  };
  /**
   * @name handlePressBackSpace
   * @description 使用者 按下 "<--"  backspace
   */


  const handlePressBackSpace = () => {
    const deleteItem = chipData.value.length - 1;
    onDelete(chipData.value[deleteItem].value, deleteItem);
    setChipData(preState => {
      const stateCopy = cloneDeep_default()(preState);

      const newState = _objectSpread(_objectSpread({}, stateCopy), {}, {
        currentInputValue: ''
      });

      newState.value.pop();
      return newState;
    });
  };

  const handleKeyDown = event => {
    var _event$key, _event$key2;

    // press backspace
    if (((_event$key = event.key) === null || _event$key === void 0 ? void 0 : _event$key.toLowerCase()) === 'backspace' && !chipData.currentInputValue && chipData.value.length > 0) {
      handlePressBackSpace();
    } // Press Enter


    if (((_event$key2 = event.key) === null || _event$key2 === void 0 ? void 0 : _event$key2.toLowerCase()) === 'enter') {
      handlePressEnter();
    }
  };
  /**
   * @name handleDeleteChip
   * @description 使用者刪除 指定 chip
   * @param {string} key uuid
   */


  const handleDeleteChip = key => {
    const deleteItemIndex = chipData.value.findIndex(item => item.key === key);
    onDelete(chipData.value[deleteItemIndex].value, deleteItemIndex);
    setChipData(preState => {
      const stateCopy = cloneDeep_default()(preState);
      const newValue = stateCopy.value.filter(item => item.key !== key);

      const newState = _objectSpread(_objectSpread({}, stateCopy), {}, {
        value: newValue
      });

      return newState;
    });
  };
  /**
   * @name handleClickBody
   * @description 使用者點擊 component 任意位置，會 auto focus 在 輸入匡上
   */


  const handleClickBody = () => {
    var _inputRef$current;

    inputRef === null || inputRef === void 0 ? void 0 : (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
  };
  /**
   * 處理 default value
   */


  (0,external_react_.useEffect)(() => {
    if (value && value.length > 0) {
      setChipData(preState => {
        const stateCopy = cloneDeep_default()(preState);
        const newValue = value.map(item => {
          return {
            key: (0,external_uuid_namespaceObject.v4)(),
            value: item
          };
        });

        const newState = _objectSpread(_objectSpread({}, stateCopy), {}, {
          value: newValue
        });

        return newState;
      });
    } else {
      setChipData({
        currentInputValue: '',
        value: []
      });
    }
  }, [value.toString()]);
  return (0,jsx_runtime_.jsxs)((Box_default()), {
    sx: _objectSpread({
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      backgroundColor: disabled ? '#F8F8F8' : '#FFFFFF',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme => `rgba(0, 0, 0, 0.23)`,
      boxSizing: 'border-box',
      borderRadius: '4px',
      padding: '8px 8px',
      width: '600px',
      marginRight: '16px',
      minHeight: '70px',
      cursor: disabled ? 'not-allowed' : 'text',
      '&:hover': {
        borderColor: theme => `${theme.palette.text.primary}`
      }
    }, sx),
    onClick: handleClickBody,
    children: [((_chipData$value = chipData.value) === null || _chipData$value === void 0 ? void 0 : _chipData$value.length) > 0 && chipData.value.map(item => jsx_runtime_.jsx((Chip_default()), {
      label: item.value,
      disabled: disabled,
      onDelete: () => {
        handleDeleteChip(item.key);
      },
      sx: {
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: theme => theme.palette.primary.main,
        color: '#fff'
      }
    }, item.key)), jsx_runtime_.jsx((Input_default()), {
      onKeyDown: handleKeyDown,
      value: chipData.currentInputValue,
      onChange: handleInputChange,
      onBlur: handleBlurInput,
      disabled: disabled,
      placeholder: chipData.value.length === 0 ? placeholder : '',
      sx: {
        width: chipData.value.length === 0 ? '100%' : 'unset',
        fontSize: '14px'
      },
      disableUnderline: true,
      inputRef: inputRef
    })]
  });
};
/* harmony default export */ var chipInput = (ChipInput);
;// CONCATENATED MODULE: external "@material-ui/core/Select"
var Select_namespaceObject = require("@material-ui/core/Select");;
var Select_default = /*#__PURE__*/__webpack_require__.n(Select_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/FormHelperText"
var FormHelperText_namespaceObject = require("@material-ui/core/FormHelperText");;
var FormHelperText_default = /*#__PURE__*/__webpack_require__.n(FormHelperText_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/FormControl"
var FormControl_namespaceObject = require("@material-ui/core/FormControl");;
var FormControl_default = /*#__PURE__*/__webpack_require__.n(FormControl_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/MenuItem"
var MenuItem_namespaceObject = require("@material-ui/core/MenuItem");;
var MenuItem_default = /*#__PURE__*/__webpack_require__.n(MenuItem_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/ExpandMore"
var ExpandMore_namespaceObject = require("@material-ui/icons/ExpandMore");;
var ExpandMore_default = /*#__PURE__*/__webpack_require__.n(ExpandMore_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/Checkbox"
var Checkbox_namespaceObject = require("@material-ui/core/Checkbox");;
var Checkbox_default = /*#__PURE__*/__webpack_require__.n(Checkbox_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/ListItemText"
var ListItemText_namespaceObject = require("@material-ui/core/ListItemText");;
var ListItemText_default = /*#__PURE__*/__webpack_require__.n(ListItemText_namespaceObject);
;// CONCATENATED MODULE: ./src/components/select/index.tsx




function select_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function select_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { select_ownKeys(Object(source), true).forEach(function (key) { select_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { select_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function select_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const menuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left'
  },
  PaperProps: {
    style: {
      maxHeight: '300px'
    }
  }
};
/**
 * @name Select
 * @description 下拉選單元件
 * @param {SelectProps} props
 */

const Select = /*#__PURE__*/(0,external_react_.forwardRef)((props, ref) => {
  const {
    source,
    sx,
    helperText,
    error,
    placeholder,
    multiple,
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    usingSourceValueForSelectValue = false
  } = props;
  return (0,jsx_runtime_.jsxs)((FormControl_default()), {
    error: error,
    children: [(0,jsx_runtime_.jsxs)((Select_default()), {
      sx: select_objectSpread({
        width: '200px',
        height: '50px',
        backgroundColor: theme => theme.palette.background.paper
      }, sx),
      displayEmpty: true,
      multiple: multiple,
      MenuProps: menuProps,
      placeholder: placeholder,
      onChange: onChange,
      ref: ref,
      name: name,
      onBlur: onBlur,
      value: value,
      IconComponent: (ExpandMore_default()),
      onFocus: onFocus,
      renderValue: multiple ? selected => {
        const displayValueList = selected === null || selected === void 0 ? void 0 : selected.map(item => {
          const resultSourceIndex = source.findIndex(val => {
            if (usingSourceValueForSelectValue) {
              return val.value === item;
            }

            return val.key === item;
          });
          return source[resultSourceIndex].value;
        });
        return displayValueList.join(', ');
      } : null,
      children: [jsx_runtime_.jsx((MenuItem_default()), {
        disabled: true,
        value: "",
        children: placeholder
      }), source === null || source === void 0 ? void 0 : source.map(({
        key: sourceKey,
        value: sourceValue
      }) => jsx_runtime_.jsx((MenuItem_default()), {
        value: usingSourceValueForSelectValue ? sourceValue : sourceKey,
        children: multiple ? (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [jsx_runtime_.jsx((Checkbox_default()), {
            checked: (value === null || value === void 0 ? void 0 : value.indexOf(sourceKey)) > -1
          }), jsx_runtime_.jsx((ListItemText_default()), {
            primary: sourceValue
          })]
        }) : sourceValue
      }, sourceKey))]
    }), error && helperText && jsx_runtime_.jsx((FormHelperText_default()), {
      sx: {
        marginLeft: 0
      },
      children: helperText
    })]
  });
});
/* harmony default export */ var components_select = (Select);
;// CONCATENATED MODULE: external "@emotion/styled/base"
var base_namespaceObject = require("@emotion/styled/base");;
var base_default = /*#__PURE__*/__webpack_require__.n(base_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/CalendarToday"
var CalendarToday_namespaceObject = require("@material-ui/icons/CalendarToday");;
var CalendarToday_default = /*#__PURE__*/__webpack_require__.n(CalendarToday_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/Schedule"
var Schedule_namespaceObject = require("@material-ui/icons/Schedule");;
var Schedule_default = /*#__PURE__*/__webpack_require__.n(Schedule_namespaceObject);
;// CONCATENATED MODULE: external "react-datepicker"
var external_react_datepicker_namespaceObject = require("react-datepicker");;
var external_react_datepicker_default = /*#__PURE__*/__webpack_require__.n(external_react_datepicker_namespaceObject);
// EXTERNAL MODULE: ./node_modules/react-datepicker/dist/react-datepicker.min.css
var react_datepicker_min = __webpack_require__(919);
;// CONCATENATED MODULE: external "@material-ui/core/TextField"
var TextField_namespaceObject = require("@material-ui/core/TextField");;
var TextField_default = /*#__PURE__*/__webpack_require__.n(TextField_namespaceObject);
;// CONCATENATED MODULE: external "lodash/range"
var range_namespaceObject = require("lodash/range");;
var range_default = /*#__PURE__*/__webpack_require__.n(range_namespaceObject);
;// CONCATENATED MODULE: external "lodash/find"
var find_namespaceObject = require("lodash/find");;
var find_default = /*#__PURE__*/__webpack_require__.n(find_namespaceObject);
// EXTERNAL MODULE: ./src/providers/day/index.ts + 4 modules
var day = __webpack_require__(9316);
;// CONCATENATED MODULE: external "@material-ui/core/IconButton"
var IconButton_namespaceObject = require("@material-ui/core/IconButton");;
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/ArrowBackIosNew"
var ArrowBackIosNew_namespaceObject = require("@material-ui/icons/ArrowBackIosNew");;
var ArrowBackIosNew_default = /*#__PURE__*/__webpack_require__.n(ArrowBackIosNew_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/icons/ArrowForwardIos"
var ArrowForwardIos_namespaceObject = require("@material-ui/icons/ArrowForwardIos");;
var ArrowForwardIos_default = /*#__PURE__*/__webpack_require__.n(ArrowForwardIos_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/List"
var List_namespaceObject = require("@material-ui/core/List");;
var List_default = /*#__PURE__*/__webpack_require__.n(List_namespaceObject);
;// CONCATENATED MODULE: external "@material-ui/core/ListItem"
var ListItem_namespaceObject = require("@material-ui/core/ListItem");;
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem_namespaceObject);
;// CONCATENATED MODULE: ./src/components/dateTimePickerBase/datePickerHeader.tsx














// 1990 years ~ (today + 100 ) years
// ex. today is 2021/5/31
// range: 1990 ~ 2120
const yearsList = range_default()(1990, (0,day/* default */.Z)().get('year') + 100, 1); // mapping [1990, 1991, ....., 2xxx]
// To key value pairs object

const yearsSource = yearsList.map(item => {
  return {
    key: `${item}`,
    value: item
  };
});
const monthsSources = [{
  key: 0,
  value: 'January'
}, {
  key: 1,
  value: 'February'
}, {
  key: 2,
  value: 'March'
}, {
  key: 3,
  value: 'April'
}, {
  key: 4,
  value: 'May'
}, {
  key: 5,
  value: 'June'
}, {
  key: 6,
  value: 'July'
}, {
  key: 7,
  value: 'August'
}, {
  key: 8,
  value: 'September'
}, {
  key: 9,
  value: 'October'
}, {
  key: 10,
  value: 'November'
}, {
  key: 11,
  value: 'December'
}];
/**
 * @name DatePickerHeader
 * @description custom dateTimePicker header
 * @param {DatePickerHeaderProps} props
 */

const DatePickerHeader = ({
  date,
  changeYear,
  changeMonth,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  decreaseYear,
  increaseYear,
  prevYearButtonDisabled,
  nextYearButtonDisabled
}) => {
  const currentYearValue = (0,day/* default */.Z)(date).get('year');
  const currentMonthKey = (0,day/* default */.Z)(date).get('month');
  const currentMonthValue = find_default()(monthsSources, ['key', currentMonthKey]).value;
  const {
    0: openYears,
    1: setOpenYears
  } = (0,external_react_.useState)(false);
  const {
    0: openMonths,
    1: setOpenMonths
  } = (0,external_react_.useState)(false);

  const handleCloseAllList = event => {
    setOpenYears(false);
    setOpenMonths(false);
  };
  /**
   * @name handleClickYears
   * @param event DOM event
   * @description 點擊 years
   */


  const handleClickYears = event => {
    event.stopPropagation();
    setOpenMonths(false);
    setOpenYears(true);
  };
  /**
   * @name handleClickMonths
   * @param event DOM event
   * @description 點擊 months
   */


  const handleClickMonths = event => {
    event.stopPropagation();
    setOpenYears(false);
    setOpenMonths(true);
  };

  (0,external_react_.useEffect)(() => {
    // close years & months list
    // when click calendar other place
    addEventListener('click', handleCloseAllList);
    return () => {
      removeEventListener('click', handleCloseAllList);
    };
  }, []);
  return (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [(0,jsx_runtime_.jsxs)((Box_default()), {
      sx: {
        margin: theme => theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      children: [jsx_runtime_.jsx((TextField_default()), {
        value: currentYearValue,
        onClick: handleClickYears,
        sx: {
          marginRight: theme => theme.spacing(2),
          width: '100px'
        }
      }), jsx_runtime_.jsx((TextField_default()), {
        value: currentMonthValue,
        onClick: handleClickMonths,
        sx: {
          marginRight: theme => theme.spacing(2),
          width: '150px'
        }
      }), jsx_runtime_.jsx((IconButton_default()), {
        onClick: decreaseMonth,
        disableRipple: false,
        disableTouchRipple: false,
        disabled: prevMonthButtonDisabled,
        children: jsx_runtime_.jsx((ArrowBackIosNew_default()), {
          sx: {
            fontSize: '1.275rem'
          }
        })
      }), jsx_runtime_.jsx((IconButton_default()), {
        disableRipple: false,
        disableTouchRipple: false,
        onClick: increaseMonth,
        disabled: nextMonthButtonDisabled,
        children: jsx_runtime_.jsx((ArrowForwardIos_default()), {
          sx: {
            fontSize: '1.275rem'
          }
        })
      })]
    }), openYears && jsx_runtime_.jsx((List_default()), {
      sx: {
        maxHeight: '300px',
        overflow: 'auto',
        position: 'absolute',
        backgroundColor: theme => theme.palette.background.paper,
        boxShadow: theme => theme.shadows[2],
        left: '20px',
        top: '70px',
        zIndex: 2
      },
      children: yearsSource.map(item => jsx_runtime_.jsx((ListItem_default()), {
        button: true,
        onClick: () => {
          changeYear(item.value);
          setOpenYears(false);
        },
        selected: currentYearValue === item.value,
        autoFocus: currentYearValue === item.value,
        children: item.value
      }, item.key))
    }), openMonths && jsx_runtime_.jsx((List_default()), {
      sx: {
        maxHeight: '300px',
        overflow: 'auto',
        position: 'absolute',
        backgroundColor: theme => theme.palette.background.paper,
        boxShadow: theme => theme.shadows[2],
        left: '133px',
        top: '70px',
        zIndex: 2
      },
      children: monthsSources.map(item => jsx_runtime_.jsx((ListItem_default()), {
        button: true,
        onClick: () => {
          changeMonth(item.key);
          setOpenMonths(false);
        },
        selected: currentMonthKey === item.key,
        autoFocus: currentMonthKey === item.key,
        children: item.value
      }, item.key))
    })]
  });
};

/* harmony default export */ var datePickerHeader = (DatePickerHeader);
;// CONCATENATED MODULE: ./src/components/dateTimePickerBase/index.tsx



function dateTimePickerBase_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function dateTimePickerBase_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { dateTimePickerBase_ownKeys(Object(source), true).forEach(function (key) { dateTimePickerBase_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { dateTimePickerBase_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dateTimePickerBase_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function returnFormat(variant) {
  switch (variant) {
    case 'date':
      return 'yyyy/MM/dd';

    case 'time':
      {
        return 'HH:mm';
      }

    default:
      return 'yyyy/MM/dd HH:mm';
  }
}

const StyleWrapper = /*#__PURE__*/base_default()((Box_default()),  true ? {
  target: "e1hbv0gw0"
} : 0)(".react-datepicker{box-shadow:", props => props.theme.shadows[10], ";border:none;font-family:'Roboto','Helvetica','Arial',sans-serif;line-height:1.5;letter-spacing:0.00938em;display:flex;&__time-list-item{line-height:30px;&--selected{background-color:", props => props.theme.palette.primary.main, "!important;color:#fff!important;font-weight:400!important;}&:hover{background-color:", props => props.theme.palette.primary.main, "!important;color:#fff!important;font-weight:400!important;}}&__triangle{display:none;}&__header{background-color:", props => props.theme.palette.background.paper, ";&__dropdown{&--select{margin:", props => props.theme.spacing(2), ";}}}&__day-name{width:36px;height:36px;color:rgba(0, 0, 0, 0.87);margin-top:8px;}&__day{width:36px;height:36px;border-radius:100%;font-weight:400;padding:0;line-height:36px;color:rgba(0, 0, 0, 0.77);&:hover{color:#fff!important;font-weight:400!important;background-color:", props => props.theme.palette.primary.light, "!important;}&--today{position:relative;color:", props => props.theme.palette.primary.main, "!important;}&--disabled{color:rgba(0, 0, 0, 0.47);pointer-events:none;cursor:default;}&--keyboard-selected{color:rgba(0, 0, 0, 0.77);background-color:rgba(0, 0, 0, 0);}&--selected{background-color:", props => props.theme.palette.primary.main, "!important;color:#fff!important;font-weight:400;}&--in-range{background-color:", props => props.theme.palette.primary.main, ";color:#fff;font-weight:400;}&--in-selecting-range{background-color:", props => props.theme.palette.primary.light, ";color:#fff;font-weight:400;}}}" + ( true ? "" : 0));
/**
 * @name DatePickerBase
 * @description 時間日期模組 核心工能
 * @param {DateTimePickerBaseProps} props
 */


const DatePickerBase = /*#__PURE__*/(0,external_react_.forwardRef)((props, ref) => {
  const {
    variant,
    onChange,
    onBlur,
    value,
    max,
    min,
    timeIntervals = 60,
    placeholder,
    selectsRange = false,
    disabled,
    name,
    error,
    inputVariant = 'outlined',
    selectsStart,
    selectsEnd,
    startDate,
    endDate,
    className,
    withPortal
  } = props;
  return jsx_runtime_.jsx(StyleWrapper, {
    children: jsx_runtime_.jsx((external_react_datepicker_default()), {
      className: className,
      selected: value,
      selectsStart: selectsStart,
      selectsEnd: selectsEnd,
      minDate: min,
      maxDate: max,
      onChange: onChange,
      dateFormat: returnFormat(variant),
      timeFormat: "HH:mm",
      showTimeSelect: variant !== 'date',
      showTimeSelectOnly: variant === 'time',
      timeIntervals: timeIntervals,
      placeholderText: placeholder,
      onBlur: onBlur,
      selectsRange: selectsRange,
      disabled: disabled,
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      name: name,
      startDate: startDate,
      endDate: endDate,
      withPortal: withPortal,
      customInput: jsx_runtime_.jsx((TextField_default()), {
        error: error,
        variant: inputVariant
      }),
      renderCustomHeader: props => jsx_runtime_.jsx(datePickerHeader, dateTimePickerBase_objectSpread({}, props)),
      ref: ref
    })
  });
});
/* harmony default export */ var dateTimePickerBase = (DatePickerBase);
;// CONCATENATED MODULE: ./src/components/dateTimePicker/index.tsx




function dateTimePicker_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function dateTimePicker_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { dateTimePicker_ownKeys(Object(source), true).forEach(function (key) { dateTimePicker_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { dateTimePicker_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dateTimePicker_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







const dateTimePicker_StyleWrapper = base_default()("div",  true ? {
  target: "ec3bwpf0"
} : 0)( true ? {
  name: "qsobh3",
  styles: "display:inline-flex;flex-direction:column;position:relative;min-width:0;padding:0;margin:0;border:0;vertical-align:top;width:100%;.react-datepicker-wrapper{display:block;}"
} : 0);

/**
 * @name DateTimePicker
 * @description 時間日期模組
 * @param {DateTimePickerProps} props
 */
const DateTimePicker = /*#__PURE__*/(0,external_react_.forwardRef)((props, ref) => {
  const {
    sx = {},
    variant = 'default',
    onChange,
    onBlur,
    value,
    max,
    min,
    error,
    helperText,
    timeIntervals,
    placeholder,
    disabled,
    name,
    withPortal
  } = props;
  return (0,jsx_runtime_.jsxs)((Box_default()), {
    display: "flex",
    flexDirection: "column",
    width: "200px",
    sx: dateTimePicker_objectSpread({}, sx),
    children: [(0,jsx_runtime_.jsxs)(dateTimePicker_StyleWrapper, {
      children: [jsx_runtime_.jsx(dateTimePickerBase, {
        value: value,
        min: min,
        max: max,
        onChange: onChange,
        timeIntervals: timeIntervals,
        placeholder: placeholder,
        onBlur: onBlur,
        disabled: disabled,
        variant: variant,
        name: name,
        error: error,
        withPortal: withPortal,
        ref: ref
      }), (0,jsx_runtime_.jsxs)((Box_default()), {
        sx: {
          position: 'absolute',
          top: '9px',
          right: '15px',
          backgroundColor: '#fff',
          display: 'flex',
          color: theme => disabled ? theme.palette.text.disabled : theme.palette.text.primary,
          alignItems: 'center',
          pointerEvents: 'none'
        },
        children: [variant !== 'time' && jsx_runtime_.jsx((CalendarToday_default()), {
          sx: {
            fontSize: '1.25rem'
          }
        }), variant === 'time' && jsx_runtime_.jsx((Schedule_default()), {
          sx: {
            fontSize: '1.25rem'
          }
        })]
      })]
    }), error && helperText && jsx_runtime_.jsx((Box_default()), {
      sx: {
        color: theme => theme.palette.error.main,
        fontWeight: '400',
        fontSize: '0.75rem',
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        marginRight: '14px',
        marginBottom: '0'
      },
      children: helperText
    })]
  });
});
/* harmony default export */ var dateTimePicker = (DateTimePicker);
;// CONCATENATED MODULE: ./src/components/input/index.tsx


function input_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function input_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { input_ownKeys(Object(source), true).forEach(function (key) { input_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { input_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function input_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * @name Input
 * @description Input 、 textarea
 * @param {InputProps} props
 *
 * @note 若要使用 textarea 模式
 * 用 minRows 控制高度
 * multiline must be true
 *
 * @note 若要使用 自動長高功能
 * multiline must be true
 * 切記！ input type 為 "number" 盡量不要使用
 */
const Input = /*#__PURE__*/(0,external_react_.forwardRef)((props, ref) => {
  const {
    maxLength,
    sx,
    onChange,
    onBlur,
    type,
    inputProps,
    error,
    helperText,
    multiline,
    placeholder,
    maxRows,
    minRows,
    name,
    disabled,
    onFocus
  } = props;
  return jsx_runtime_.jsx((TextField_default()), {
    inputProps: input_objectSpread({
      maxLength
    }, inputProps),
    sx: input_objectSpread({}, sx),
    onChange: onChange,
    ref: ref,
    onBlur: onBlur,
    type: type,
    error: error,
    helperText: helperText,
    multiline: multiline,
    placeholder: placeholder,
    maxRows: maxRows,
    minRows: minRows,
    name: name,
    disabled: disabled,
    onFocus: onFocus
  });
});
/* harmony default export */ var input = (Input);
;// CONCATENATED MODULE: ./src/components/dateTimeRangePicker/index.tsx




function dateTimeRangePicker_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function dateTimeRangePicker_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { dateTimeRangePicker_ownKeys(Object(source), true).forEach(function (key) { dateTimeRangePicker_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { dateTimeRangePicker_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dateTimeRangePicker_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const dateTimeRangePicker_StyleWrapper = base_default()("div",  true ? {
  target: "exofl770"
} : 0)("position:relative;display:inline-flex;min-width:0;padding:0;margin:0;vertical-align:top;width:100%;box-sizing:border-box;.MuiInput-root{border-color:", props => props.error ? props.theme.palette.error.main : 'rgba(0, 0, 0, 0.23)', ";border-width:1px;border-style:solid;border-radius:4px;&.Mui-error{&::after{border-width:0px;}}&::before{border-bottom:0;}&:hover{&:not(.Mui-disabled){&::before{border-bottom-width:1px;}}}}.start-date-wrapper{.MuiInput-root{border-right-width:0;border-top-right-radius:0px;border-bottom-right-radius:0px;}}.end-date-wrapper{.MuiInput-root{border-left-width:0;border-top-left-radius:0px;border-bottom-left-radius:0px;}}" + ( true ? "" : 0));

/**
 * @name returnWidth
 * @description 根據 '日期 + 時間' | '時間' | '日期'，return 對應寬度
 * @param {DateTimePickerVariant} variant 時間日期模組 模式
 */
function returnWidth(variant) {
  switch (variant) {
    case 'date':
      return '260px';

    case 'time':
      return '198px';

    default:
      return '350px';
  }
}
/**
 * @name DateTimeRangePicker
 * @description 時間日期模組 with 區間
 * @param {DateTimePickerRangeProps} props
 */


const DateTimeRangePicker = /*#__PURE__*/(0,external_react_.forwardRef)((props, ref) => {
  const {
    sx = {},
    variant = 'default',
    onBlur,
    startDateMin,
    startDateMax = props.endDate || null,
    endDateMin = props.startDate || null,
    endDateMax,
    error,
    helperText,
    timeIntervals,
    placeholder,
    disabled = [false, false],
    endDate,
    startDate,
    withPortal,
    onChangeEndDate,
    onChangeStartDate
  } = props;
  const [startDateDisabled, endDateDisabled] = disabled;
  const inputVariant = 'standard';

  const handleChangeStartDate = startDateValue => {
    // startDate 超過 endDate 時
    // startDate  要變成 null
    if ((0,day/* default */.Z)(startDateValue).isAfter(endDate)) {
      onChangeStartDate(null);
    } else {
      onChangeStartDate(startDateValue);
    }
  };

  const handleChangeEndDate = endDateValue => {
    // endDate 小於 startDate 時
    // endDate  要變成 null
    if ((0,day/* default */.Z)(endDateValue).isBefore(startDate)) {
      onChangeEndDate(null);
    } else {
      onChangeEndDate(endDateValue);
    }
  };

  return (0,jsx_runtime_.jsxs)((Box_default()), {
    display: "flex",
    flexDirection: "column",
    sx: dateTimeRangePicker_objectSpread({
      width: returnWidth(variant)
    }, sx),
    ref: ref,
    children: [(0,jsx_runtime_.jsxs)(dateTimeRangePicker_StyleWrapper, {
      error: error,
      children: [jsx_runtime_.jsx(dateTimePickerBase, {
        className: "start-date-wrapper",
        variant: variant,
        value: startDate,
        min: startDateMin,
        max: startDateMax,
        onChange: date => {
          handleChangeStartDate(date);
        },
        timeIntervals: timeIntervals,
        placeholder: !startDate && !endDate ? placeholder : '',
        onBlur: onBlur,
        disabled: startDateDisabled,
        inputVariant: inputVariant,
        error: error,
        withPortal: withPortal
      }), jsx_runtime_.jsx((Box_default()), {
        sx: {
          fontSize: '1.25rem',
          display: startDate || endDate ? 'flex' : 'none',
          position: 'absolute',
          top: '5px',
          right: '50%',
          transform: 'translateX(-50%)',
          color: theme => startDateDisabled && endDateDisabled ? theme.palette.text.disabled : theme.palette.text.primary
        },
        children: "-"
      }), jsx_runtime_.jsx(dateTimePickerBase, {
        className: "end-date-wrapper",
        variant: variant,
        value: endDate,
        min: endDateMin,
        max: endDateMax,
        onChange: date => {
          handleChangeEndDate(date);
        },
        timeIntervals: timeIntervals,
        onBlur: onBlur,
        disabled: endDateDisabled,
        inputVariant: inputVariant,
        error: error,
        withPortal: withPortal
      }), jsx_runtime_.jsx((Box_default()), {
        sx: {
          position: 'absolute',
          top: '10px',
          right: '8px',
          backgroundColor: '#fff',
          display: 'flex',
          color: 'rgba(0, 0, 0, 0.57)',
          alignItems: 'center',
          pointerEvents: 'none'
        },
        children: jsx_runtime_.jsx((ExpandMore_default()), {
          sx: {
            fontSize: '1.25rem'
          }
        })
      })]
    }), error && helperText && jsx_runtime_.jsx((Box_default()), {
      sx: {
        color: theme => theme.palette.error.main,
        fontWeight: '400',
        fontSize: '0.75rem',
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        marginRight: '14px',
        marginBottom: '0'
      },
      children: helperText
    })]
  });
});
/* harmony default export */ var dateTimeRangePicker = (DateTimeRangePicker);
// EXTERNAL MODULE: external "react-hook-form"
var external_react_hook_form_ = __webpack_require__(2662);
;// CONCATENATED MODULE: ./src/components/dateTimeRangePickerForForm/index.tsx






function mappingErrorMsg(startDateError, endDateError) {
  if (Boolean(startDateError)) {
    return (startDateError === null || startDateError === void 0 ? void 0 : startDateError.message) || '';
  }

  if (Boolean(endDateError)) {
    return endDateError === null || endDateError === void 0 ? void 0 : endDateError.message;
  }

  return '';
}

const DateTimeRangePickerForForm = /*#__PURE__*/(0,external_react_.forwardRef)((props, ref) => {
  const {
    control
  } = (0,external_react_hook_form_.useFormContext)();
  const {
    name = ['', ''],
    sx,
    startDateMin,
    startDateMax,
    endDateMax,
    endDateMin,
    disabled,
    withPortal
  } = props;
  const {
    field: startDateField,
    fieldState: {
      error: startDateError
    }
  } = (0,external_react_hook_form_.useController)({
    name: name[0],
    control
  });
  const {
    field: endDateField,
    fieldState: {
      error: endDateError
    }
  } = (0,external_react_hook_form_.useController)({
    name: name[1],
    control
  });
  return jsx_runtime_.jsx((Box_default()), {
    sx: sx,
    ref: startDateField.ref,
    children: jsx_runtime_.jsx(dateTimeRangePicker, {
      startDateMin: startDateMin,
      startDateMax: startDateMax,
      endDateMax: endDateMax,
      endDateMin: endDateMin,
      disabled: disabled,
      withPortal: withPortal,
      ref: endDateField.ref,
      onChangeStartDate: startDateField.onChange,
      onChangeEndDate: endDateField.onChange,
      startDateName: startDateField.name,
      endDateName: endDateField.name,
      error: Boolean(startDateError) || Boolean(endDateError),
      helperText: mappingErrorMsg(startDateError, endDateError),
      startDate: startDateField.value,
      endDate: endDateField.value
    })
  });
});
/* harmony default export */ var dateTimeRangePickerForForm = (DateTimeRangePickerForForm);
;// CONCATENATED MODULE: ./src/components/index.ts











/***/ }),

/***/ 5959:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _app; }
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(4554);
;// CONCATENATED MODULE: external "next/head"
var head_namespaceObject = require("next/head");;
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: external "@emotion/react"
var react_namespaceObject = require("@emotion/react");;
;// CONCATENATED MODULE: external "@material-ui/core/styles"
var styles_namespaceObject = require("@material-ui/core/styles");;
// EXTERNAL MODULE: external "@material-ui/core"
var core_ = __webpack_require__(1731);
;// CONCATENATED MODULE: external "@material-ui/core/CssBaseline"
var CssBaseline_namespaceObject = require("@material-ui/core/CssBaseline");;
var CssBaseline_default = /*#__PURE__*/__webpack_require__.n(CssBaseline_namespaceObject);
;// CONCATENATED MODULE: ./src/providers/theme/palette.ts
const light = {
  mode: 'light',
  primary: {
    light: '#7ccaff',
    main: '#1a9ffa',
    dark: '#004a82',
    contrastText: '#fff'
  },
  secondary: {
    light: '#9f80ff',
    main: '#531aff',
    dark: '#1f0082',
    contrastText: '#fff'
  },
  background: {
    paper: '#fff',
    default: '#f6f6f6'
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)'
  }
};
;// CONCATENATED MODULE: ./src/providers/theme/index.tsx







const theme = (0,styles_namespaceObject.createMuiTheme)({
  palette: light,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiAppBar: {
      defaultProps: {}
    },
    MuiRadio: {
      defaultProps: {
        color: 'primary'
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          border: '1px solid #DDDDDD',
          padding: '10px 16px',
          fontSize: '13px',
          boxSizing: 'border-box',
          borderBottom: '3px solid #C6D0DB'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '1px solid #DDDDDD',
          padding: '18px 15px',
          fontSize: '13px',
          boxSizing: 'border-box',
          color: '#545F6A'
        },
        head: {
          backgroundColor: '#E3ECF6'
        },
        body: {
          backgroundColor: '#fff'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          backgroundColor: '#fff',
          '& .Mui-focused': {// '& fieldset': {
            //   borderWidth: '1px !important',
            //   borderColor: 'unset !important',
            // },
          },
          '& input': {
            padding: '8px 14px'
          },
          '& textarea': {},
          '& p': {
            marginLeft: '0'
          },
          '& ::placeholder': {
            color: '#666',
            fontSize: '14px'
          }
        }
      }
    }
  }
});

const ThemeProvider = ({
  children
}) => {
  return jsx_runtime_.jsx(react_namespaceObject.ThemeProvider, {
    theme: theme,
    children: (0,jsx_runtime_.jsxs)(styles_namespaceObject.ThemeProvider, {
      theme: theme,
      children: [jsx_runtime_.jsx((CssBaseline_default()), {}), jsx_runtime_.jsx(core_.NoSsr, {
        children: children
      })]
    })
  });
};

/* harmony default export */ var providers_theme = (ThemeProvider);
// EXTERNAL MODULE: ./src/providers/day/index.ts + 4 modules
var day = __webpack_require__(9316);
;// CONCATENATED MODULE: ./src/providers/index.ts



// EXTERNAL MODULE: ./src/components/index.ts + 36 modules
var components = __webpack_require__(1590);
// EXTERNAL MODULE: external "@material-ui/core/Box"
var Box_ = __webpack_require__(1658);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);
;// CONCATENATED MODULE: ./src/pages/_app.tsx




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const App = ({
  Component,
  pageProps
}) => {
  return (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [(0,jsx_runtime_.jsxs)((head_default()), {
      children: [jsx_runtime_.jsx("title", {
        children: "Afu React"
      }), jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      })]
    }), (0,jsx_runtime_.jsxs)(providers_theme, {
      children: [jsx_runtime_.jsx(components/* Header */.h4, {}), (0,jsx_runtime_.jsxs)((Box_default()), {
        display: "flex",
        minHeight: "200vh",
        children: [jsx_runtime_.jsx((Box_default()), {
          component: "aside",
          flexBasis: "25%",
          children: jsx_runtime_.jsx(components/* Sidebar */.YE, {})
        }), jsx_runtime_.jsx((Box_default()), {
          component: "main",
          flexBasis: "75%",
          p: "1em",
          children: jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
        })]
      })]
    })]
  });
};

/* harmony default export */ var _app = (App);

/***/ }),

/***/ 9316:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ day; }
});

;// CONCATENATED MODULE: external "dayjs"
var external_dayjs_namespaceObject = require("dayjs");;
var external_dayjs_default = /*#__PURE__*/__webpack_require__.n(external_dayjs_namespaceObject);
;// CONCATENATED MODULE: external "dayjs/plugin/timezone"
var timezone_namespaceObject = require("dayjs/plugin/timezone");;
var timezone_default = /*#__PURE__*/__webpack_require__.n(timezone_namespaceObject);
;// CONCATENATED MODULE: external "dayjs/plugin/utc"
var utc_namespaceObject = require("dayjs/plugin/utc");;
var utc_default = /*#__PURE__*/__webpack_require__.n(utc_namespaceObject);
;// CONCATENATED MODULE: external "dayjs/plugin/calendar"
var calendar_namespaceObject = require("dayjs/plugin/calendar");;
var calendar_default = /*#__PURE__*/__webpack_require__.n(calendar_namespaceObject);
;// CONCATENATED MODULE: ./src/providers/day/index.ts




external_dayjs_default().extend((utc_default()));
external_dayjs_default().extend((timezone_default()));
external_dayjs_default().extend((calendar_default()));
const dayjs = (external_dayjs_default());
/* harmony default export */ var day = (dayjs);

/***/ }),

/***/ 919:
/***/ (function() {



/***/ }),

/***/ 9320:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
exports.__esModule=true;exports.normalizePathSep=normalizePathSep;exports.denormalizePagePath=denormalizePagePath;function normalizePathSep(path){return path.replace(/\\/g,'/');}function denormalizePagePath(page){page=normalizePathSep(page);if(page.startsWith('/index/')){page=page.slice(6);}else if(page==='/index'){page='/';}return page;}
//# sourceMappingURL=denormalize-page-path.js.map

/***/ }),

/***/ 1664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(6071)


/***/ }),

/***/ 2426:
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 9448:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = __webpack_require__(7917);

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ 7917:
/***/ (function(module) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ 4554:
/***/ (function(module) {

"use strict";
module.exports = require("@emotion/react/jsx-runtime");;

/***/ }),

/***/ 1731:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/core");;

/***/ }),

/***/ 2905:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/core/AppBar");;

/***/ }),

/***/ 1658:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/core/Box");;

/***/ }),

/***/ 4925:
/***/ (function(module) {

"use strict";
module.exports = require("@material-ui/core/Toolbar");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 2662:
/***/ (function(module) {

"use strict";
module.exports = require("react-hook-form");;

/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(5959));
module.exports = __webpack_exports__;

})();