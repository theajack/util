!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.tcPolyfill=n():t.tcPolyfill=n()}(this,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=31)}({0:function(t,n,e){"use strict";e.r(n),e.d(n,"TYPE",(function(){return r})),e.d(n,"UINT_TYPE",(function(){return i})),e.d(n,"VERSION",(function(){return o})),e.d(n,"COMPARE_RESULT",(function(){return u}));var r={FUNCTION:"function",OBJECT:"object",ARRAY:"array",NUMBER:"number",BOOLEAN:"boolean",STRING:"string",NULL:"null",UNDEFINED:"undefined"},i={U8:"u8",U16:"u16",U32:"u32"},o={LATEST:"latest",DEFAULT:"default"},u={LESS:0,EVEN:1,MORE:2}},1:function(t,n,e){"use strict";e.r(n),e.d(n,"isUndf",(function(){return i})),e.d(n,"isFunc",(function(){return o})),e.d(n,"isObject",(function(){return u})),e.d(n,"isJson",(function(){return c})),e.d(n,"isJsonOrArray",(function(){return f})),e.d(n,"isNumber",(function(){return a})),e.d(n,"isNull",(function(){return d})),e.d(n,"isBool",(function(){return s})),e.d(n,"isString",(function(){return l})),e.d(n,"isType",(function(){return p})),e.d(n,"isArray",(function(){return b})),e.d(n,"isPC",(function(){return v})),e.d(n,"isMobile",(function(){return m})),e.d(n,"isIOS",(function(){return y})),e.d(n,"isAndroid",(function(){return O})),e.d(n,"isWX",(function(){return E})),e.d(n,"isQQ",(function(){return h})),e.d(n,"isTenVideo",(function(){return j})),e.d(n,"isWxMiniProgram",(function(){return g})),e.d(n,"isIOSWx",(function(){return T})),e.d(n,"isIPAddress",(function(){return S})),e.d(n,"isInited",(function(){return R}));var r=e(0);function i(t){return p(t,r.TYPE.UNDEFINED)}function o(t){return p(t,r.TYPE.FUNCTION)}function u(t){return p(t,r.TYPE.OBJECT)}function c(t){if(d(t))return!1;if(u(t)&&o(t.constructor)){var n=t.constructor.name;if(l(n)&&""!==n)return"Object"===n}return u(t)}function f(t){return b(t)||c(t)}function a(t){return p(t,r.TYPE.NUMBER)}function d(t){return p(t,r.TYPE.NULL)}function s(t){return p(t,r.TYPE.BOOLEAN)}function l(t){return p(t,r.TYPE.STRING)}function p(t,n){return n===r.TYPE.ARRAY?b(t):n===r.TYPE.NULL?null===t:typeof t===n}function b(t){return t instanceof Array}function v(){return!/(iphone|ipad|ipod|ios|android)/i.test(A())}function m(){return!v()}function y(){return/(iphone|ipad|ipod|ios)/.test(A())}function O(){return/android/i.test(A())}function E(){var t=A();return/micromessenger/.test(t)&&!/wxwork/.test(t)}function h(){return/qq\/[0-9]/.test(A())}function j(){return/qqlivebrowser/.test(A())}function g(){var t=A();return t.match(/micromessenger/i)&&t.match(/miniprogram/i)||"miniprogram"===window.__wxjs_environment}function T(){return y()&&E()}function A(){return window.navigator.userAgent.toLowerCase()}function S(t){return/^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/.test(t)}var U,R=(U={},function(t,n,e){void 0===n&&(n=!0),void 0===e&&(e="and"),o(n)&&(n=n());var r=U[t];if("and"===e){if(n&&r)return!0}else if(n||r)return!0;return U[t]=!0,!1})},2:function(t,n,e){"use strict";e.r(n),e.d(n,"getUrlParam",(function(){return u})),e.d(n,"parseUrlParam",(function(){return c})),e.d(n,"copy",(function(){return f})),e.d(n,"type",(function(){return a})),e.d(n,"random",(function(){return d})),e.d(n,"download",(function(){return l})),e.d(n,"execute",(function(){return p})),e.d(n,"importScript",(function(){return b})),e.d(n,"readFile",(function(){return m})),e.d(n,"mapArray",(function(){return y})),e.d(n,"mapJson",(function(){return O})),e.d(n,"parseJSON",(function(){return E})),e.d(n,"pick",(function(){return h})),e.d(n,"pickAttr",(function(){return T})),e.d(n,"pickTo",(function(){return A})),e.d(n,"removeRedundantAttrInObject",(function(){return S})),e.d(n,"getCanvasFingerPrint",(function(){return U})),e.d(n,"boolPipe",(function(){return R})),e.d(n,"throttle",(function(){return N})),e.d(n,"countImgSize",(function(){return x})),e.d(n,"compareVersion",(function(){return P})),e.d(n,"versionToArray",(function(){return L}));var r=e(0),i=e(1),o=e(3);function u(t,n){return c(window.location.search,t,n)}function c(t,n,e){if(!Object(i.isUndf)(n)){if(""!==t){var r=new RegExp("(^|&)"+n+"=([^&]*)(&|$)","i"),o=t.substr(1).match(r);if(null!=o)return unescape(o[2])}return Object(i.isUndf)(e)?null:e}if(""===t)return{};var u=t.substr(1).split("&"),c={};return u.forEach((function(t){var n=t.split("=");c[n[0]]=n[1]})),c}function f(t){var n=document.getElementById("_copy_input_");n||((n=document.createElement("input")).setAttribute("type","text"),n.setAttribute("style","height:10px;position:fixed;top:-100px;opacity:0;"),n.setAttribute("id","_copy_input_"),document.body.appendChild(n)),n.value=t,n.select();try{return!!document.execCommand("Copy")}catch(t){return!1}}function a(t){var n=typeof t;if("object"==n){if(null===t)return"null";switch(t.constructor){case Object:n="json";break;case Array:n="array";break;case HTMLCollection:n="htmlcollection";break;case NodeList:n="nodelist";break;case FormData:n="formdata";break;case Error:n="error";break;case Date:n="date";break;default:n=1===t.nodeType&&Object(i.isString)(t.nodeName)?"htmlelement":"object"}}return n}function d(t,n){return t+Math.round(Math.random()*(n-t))}var s,l=(s=null,function(t,n,e){void 0===n&&(n="tc-util-file"),void 0===e&&(e="text/plain"),s||((s=document.createElement("a")).setAttribute("style","position: fixed;top: -100px"),document.body.appendChild(s)),s.setAttribute("download",n);var r=new Blob([t],{type:e}),i=URL.createObjectURL(r);s.href=i,s.click()});function p(t){var n=t.code,e=void 0===n?"":n,r=t.onload,i=t.onerror,o=t.ontimeout,u=t.timeout,c=void 0===u?6e3:u;if(""!==e.trim()){var f=new Blob([e],{type:"application/text"}),a=window.URL.createObjectURL(f),d=document.createElement("script"),s=null;o&&(s=setTimeout((function(){o(),document.body.removeChild(d)}),c)),d.onload=function(){r&&r(),clearTimeout(s),document.body.removeChild(d)},d.onerror=function(t){i&&i(t),clearTimeout(s),document.body.removeChild(d)},document.body.appendChild(d),d.src=a}else console.warn("execute code 参数不可为空")}function b(t,n){var e=document.createElement("script");e.src=t,n&&(e.onload=function(){n()}),document.body.appendChild(e)}var v,m=(v=null,function(t,n){v||((v=document.createElement("input")).setAttribute("type","file"),v.setAttribute("style","position: fixed;top: -100px"),document.body.appendChild(v)),n&&v.setAttribute("accept",n),v.onchange=function(){var n=this.files;if(n){var e=n[0];if(Object(i.isUndf)(FileReader))alert("你的浏览器暂不支持该功能");else{var r=new FileReader;r.readAsText(e),r.onload=function(){t(this.result)}}}},v.click()});function y(t,n){t instanceof Array?t.forEach((function(t){n(t)})):n(t)}function O(t,n,e){if("object"==typeof t)for(var r in t)e(r,t[r]);else e(t,n)}function E(t){if(Object(i.isObject)(t))return t;try{return JSON.parse(t)}catch(t){return null}}function h(t){var n=t.target,e=t.data,r=t.attr,u=t.deep,c=void 0!==u&&u,f=t.ignoreUndf,a=void 0!==f&&f,d=t.forceSync,s=void 0!==d&&d;return Object(i.isObject)(n)&&!Object(i.isNull)(n)||(n=Object(i.isArray)(e)?[]:{}),Object(i.isUndf)(r)&&(r=Object(o.keys)(e)),r.forEach((function(t){var r,o=t;if(-1!==t.indexOf(":")){var u=t.split(":");o=u[0],r=u[1];var f=j(e,r);r=Object(i.isUndf)(f)?-1!==r.indexOf("number.")?parseFloat(r.substr(7)):r:f}else r=j(e,t);var d=j(n,o);Object(i.isJsonOrArray)(r)&&!Object(i.isNull)(r)&&!0===c?!Object(i.isNull)(d)&&Object(i.isJsonOrArray)(d)?(s&&S(d,r,a),g(n,o,h({target:d,data:r,deep:!0,ignoreUndf:a,forceSync:s}))):g(n,o,h({data:r,deep:!0,ignoreUndf:a,forceSync:s})):a&&Object(i.isUndf)(r)||g(n,o,r)})),n}function j(t,n){return Object(i.isArray)(t)?t[parseInt(n)]:t[n]}function g(t,n,e){Object(i.isArray)(t)?t[parseInt(n)]=e:t[n]=e}function T(t,n,e){return h({data:t,attr:n,deep:e})}function A(t,n,e,r){return h({target:t,data:n,attr:e,deep:r})}function S(t,n,e){if(void 0===e&&(e=!1),Object(i.isArray)(t)){var r=t,o=n;r.length>o.length&&r.splice(o.length,r.length-o.length)}else if(Object(i.isObject)(t))for(var u in t){(e?Object(i.isUndf)(n[u]):!n.hasOwnProperty(u))&&delete t[u]}}function U(t){void 0===t&&(t="tc-util");var n=document.createElement("canvas"),e=n.getContext("2d");if(!e)return"";var r=t;e.textBaseline="top",e.font="14px 'Arial'",e.textBaseline="bottom",e.fillStyle="#f60",e.fillRect(125,1,62,20),e.fillStyle="#069",e.fillText(r,2,15),e.fillStyle="rgba(102, 204, 0, 0.7)",e.fillText(r,4,17);var i=n.toDataURL().replace("data:image/png;base64,","");return function(t){for(var n,e="",r=0,i=(t+="").length;r<i;r++)e+=(n=t.charCodeAt(r).toString(16)).length<2?"0"+n:n;return e}(atob(i).slice(-16,-12))}function R(t){for(var n=0;n<t.length;n++){var e=typeof t[n];if("function"===e&&!1===t[n]())return!1;if("boolean"===e&&!1===t[n])return!1}return!0}function N(t,n){void 0===n&&(n=100);var e=0;return function(){var r=this,i=Date.now();i-e>=n&&(e=i,t.apply(r,arguments))}}function x(t){return new Promise((function(n){var e=document.createElement("img");e.style.opacity="0",document.body.appendChild(e),e.onload=function(){n({width:e.offsetWidth,height:e.offsetHeight}),document.body.removeChild(e)},e.src=t}))}function P(t,n){if(void 0===t&&(t="default"),void 0===n&&(n="default"),t===n)return r.COMPARE_RESULT.EVEN;if(t===r.VERSION.LATEST||n===r.VERSION.DEFAULT)return r.COMPARE_RESULT.MORE;if(n===r.VERSION.LATEST||t===r.VERSION.DEFAULT)return r.COMPARE_RESULT.LESS;for(var e=L(t),i=L(n),o=0;o<e.length;o++){if(e[o]>i[o])return r.COMPARE_RESULT.MORE;if(e[o]<i[o])return r.COMPARE_RESULT.LESS}return r.COMPARE_RESULT.EVEN}function L(t){for(var n=t.split(".").map((function(t){return parseInt(t)})),e=[0,0,0],r=0;r<e.length;r++){var i=n[r];"number"!=typeof i||Number.isNaN(i)||(e[r]=i)}return e}},3:function(t,n,e){"use strict";e.r(n),e.d(n,"keys",(function(){return u})),e.d(n,"values",(function(){return c})),e.d(n,"assign",(function(){return f}));var r=e(1),i=e(2),o=function(t,n){for(var e=0,r=n.length,i=t.length;e<r;e++,i++)t[i]=n[e];return t};function u(t){if(Object(r.isFunc)(Object.keys))return Object.keys(t);var n=[];for(var e in t)n.push(e);return n}function c(t){if(Object(r.isFunc)(Object.values))return Object.values(t);var n=[];for(var e in t)n.push(t[e]);return n}function f(t){for(var n=[],e=1;e<arguments.length;e++)n[e-1]=arguments[e];return Object(r.isFunc)(Object.assign)?Object.assign.apply(Object,o([t],n)):(n.forEach((function(n){Object(i.pickTo)(t,n)})),t)}},31:function(t,n,e){"use strict";e.r(n);var r=e(3);e.d(n,"keys",(function(){return r.keys})),e.d(n,"values",(function(){return r.values})),e.d(n,"assign",(function(){return r.assign})),n.default=r}}).default}));