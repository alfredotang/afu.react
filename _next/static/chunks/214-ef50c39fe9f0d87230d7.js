(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[214],{97099:function(e,t,n){"use strict";var r=n(22122),o=n(67294),a=(n(45697),n(25448)),u=n(80425),i=n(85893);const c={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box",WebkitTextSizeAdjust:"100%"},s=e=>(0,r.Z)({color:e.palette.text.primary},e.typography.body1,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}});var f=(0,i.jsx)(u.Z,{styles:e=>{var t,n;let o={html:c,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:(0,r.Z)({margin:0},s(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})};const a=null===(t=e.components)||void 0===t||null===(n=t.MuiCssBaseline)||void 0===n?void 0:n.styleOverrides;return a&&(o=[o,a]),o}});t.ZP=function(e){const t=(0,a.Z)({props:e,name:"MuiCssBaseline"}),{children:n}=t;return(0,i.jsxs)(o.Fragment,{children:[f,n]})}},56056:function(e,t,n){"use strict";var r=n(67294),o=(n(45697),n(62977)),a=n(85893);t.Z=function(e){const{children:t,defer:n=!1,fallback:u=null}=e,[i,c]=r.useState(!1);return(0,o.Z)((()=>{n||c(!0)}),[n]),r.useEffect((()=>{n&&c(!0)}),[n]),(0,a.jsx)(r.Fragment,{children:i?t:u})}},34910:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(67294),o=(n(45697),n(22122)),a=n(70002),u=n(5950),i=n(4347),c=n(85893);var s=function(e){const{children:t,theme:n}=e,s=(0,u.Z)(),f=r.useMemo((()=>{const e=null===s?n:function(e,t){if("function"===typeof t)return t(e);return(0,o.Z)({},e,t)}(s,n);return null!=e&&(e[i.Z]=null!==s),e}),[n,s]);return(0,c.jsx)(a.Z.Provider,{value:f,children:t})},f=n(95387),l=n(4662);function d(e){const t=(0,l.Z)();return(0,c.jsx)(f.T.Provider,{value:"object"===typeof t?t:{},children:e.children})}var p=function(e){const{children:t,theme:n}=e;return(0,c.jsx)(s,{theme:n,children:(0,c.jsx)(d,{children:t})})}},93367:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var o=((r=n(67294))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},7845:function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=u,t.useAmp=function(){return u(o.default.useContext(a.AmpStateContext))};var r,o=(r=n(67294))&&r.__esModule?r:{default:r},a=n(93367);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,a=e.hasQuery,u=void 0!==a&&a;return n||o&&u}},74287:function(e,t,n){"use strict";var r;t.__esModule=!0,t.HeadManagerContext=void 0;var o=((r=n(67294))&&r.__esModule?r:{default:r}).default.createContext({});t.HeadManagerContext=o},57947:function(e,t,n){"use strict";var r=n(61682);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}t.__esModule=!0,t.defaultHead=d,t.default=void 0;var a,u=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=r?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(n,o,a):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(67294)),i=(a=n(60617))&&a.__esModule?a:{default:a},c=n(93367),s=n(74287),f=n(7845);function l(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[u.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(u.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===u.default.Fragment?e.concat(u.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var h=["name","httpEquiv","charSet","itemProp"];function y(e,t){return e.reduce((function(e,t){var n=u.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(p,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var a=!0,u=!1;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){u=!0;var i=o.key.slice(o.key.indexOf("$")+1);e.has(i)?a=!1:e.add(i)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var c=0,s=h.length;c<s;c++){var f=h[c];if(o.props.hasOwnProperty(f))if("charSet"===f)n.has(f)?a=!1:n.add(f);else{var l=o.props[f],d=r[f]||new Set;"name"===f&&u||!d.has(l)?(d.add(l),r[f]=d):a=!1}}}return a}}()).reverse().map((function(e,n){var a=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css"].some((function(t){return e.props.href.startsWith(t)}))){var i=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return i["data-href"]=i.href,i.href=void 0,u.default.cloneElement(e,i)}return u.default.cloneElement(e,{key:a})}))}function v(e){var t=e.children,n=(0,u.useContext)(c.AmpStateContext),r=(0,u.useContext)(s.HeadManagerContext);return u.default.createElement(i.default,{reduceComponentsToState:y,headManager:r,inAmpMode:(0,f.isInAmpMode)(n)},t)}v.rewind=function(){};var m=v;t.default=m},60617:function(e,t,n){"use strict";var r=n(83115),o=n(2553),a=n(62012),u=(n(50450),n(9807)),i=n(27690),c=n(99828);function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=c(e);if(t){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return i(this,n)}}t.__esModule=!0,t.default=void 0;var f=n(67294),l=function(e){u(n,e);var t=s(n);function n(e){var a;return o(this,n),(a=t.call(this,e))._hasHeadManager=void 0,a.emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(r(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(f.Component);t.default=l},9008:function(e,t,n){e.exports=n(57947)},38164:function(e,t,n){var r=n(54360);e.exports=function(e){if(Array.isArray(e))return r(e)}},50450:function(e){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},61682:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},99828:function(e){function t(n){return e.exports=t=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},t(n)}e.exports=t},9807:function(e,t,n){var r=n(21914);e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},27381:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},95725:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},27690:function(e,t,n){var r=n(87917),o=n(50450);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?o(e):t}},83115:function(e,t,n){var r=n(38164),o=n(27381),a=n(73585),u=n(95725);e.exports=function(e){return r(e)||o(e)||a(e)||u()}}}]);