!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tcStorage=t():e.tcStorage=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=32)}({32:function(e,t,r){"use strict";r.r(t);var n=r(4);r.d(t,"getStorage",(function(){return n.getStorage})),r.d(t,"setStorage",(function(){return n.setStorage})),r.d(t,"removeStorage",(function(){return n.removeStorage})),t.default=n},4:function(e,t,r){"use strict";r.r(t),r.d(t,"getStorage",(function(){return o})),r.d(t,"setStorage",(function(){return u})),r.d(t,"removeStorage",(function(){return f}));var n=window.localStorage;function o(e){e+="_tc_u";var t=n.getItem(e);if(null===t)return null;var r=t.substr(0,t.indexOf(":"));return t=t.substr(t.indexOf(":")+1),"number"===r?parseFloat(t):"boolean"===r?"true"===t:"object"===r?JSON.parse(t):t}function u(e,t){e+="_tc_u";var r=typeof t;"object"===r?t=JSON.stringify(t):"string"!==r&&(t=t.toString()),t=r+":"+t,n.setItem(e,t)}function f(e){e+="_tc_u",n.removeItem(e)}}}).default}));