/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:01:35
 * @LastEditors: theajack
 * @LastEditTime: 2021-05-19 21:55:47
 * @FilePath: \util\src\index.ts
 * @Description: Coding something
 */

import * as __ from './lib/tool';
import * as _lib from './lib/lib';
import * as _polyfill from './lib/polyfill';
import * as _is from './lib/is';
import * as _datetime from './lib/datetime';
import * as _math from './lib/math';
import * as _const from './lib/constant';
import * as _dom from './lib/dom';
import * as _extend from './lib/extend';
import * as _byte from './lib/byte';
import _event from 'tc-event';
import _version from './version';
import {encodeGBK, decodeGBK} from './lib/gbk';
import _storage from './lib/storage';
import {getCookie, setCookie, removeCookie} from './lib/cookie';

export const _ = __;
export const lib = _lib;
export const polyfill = _polyfill;
export const is = _is;
export const datetime = _datetime;
export const math = _math;
export const CONST = _const;
export const dom = _dom;
export const extend = _extend;
export const byte = _byte;
export const event = _event;
export const gbk = {encode: encodeGBK, decode: decodeGBK};
export const storage = _storage;
export const cookie = {get: getCookie, set: setCookie, remove: removeCookie};

console.log(byte);

export default {
    _,
    lib,
    polyfill,
    is,
    datetime,
    math,
    CONST,
    dom,
    extend,
    event,
    storage,
    cookie,
    byte,
    gbk,
    _version
};
