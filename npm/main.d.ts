import __ from './tool';
import _lib from './lib';
import _polyfill from './polyfill';
import _is from './is';
import _datetime from './datetime';
import _math from './math';
import _const from './constant';
import _dom from './dom';
import _extend from './extend';
import _byte from './byte';
import _event from 'tc-event';
import _gbk from './gbk';
import {getStorage, setStorage, removeStorage} from './storage';
import {getCookie, setCookie, removeCookie} from './cookie';

export const _: typeof __;
export const lib: typeof _lib;
export const polyfill: typeof _polyfill;
export const is: typeof _is;
export const datetime: typeof _datetime;
export const math: typeof _math;
export const CONST: typeof _const;
export const dom: typeof _dom;
export const extend: typeof _extend;
export const byte: typeof _byte;
export const event: typeof _event;
export const gbk: typeof _gbk;
export const storage: {
    get: typeof getStorage;
    set: typeof setStorage;
    remove: typeof removeStorage;
};
export const cookie: {
    get: typeof getCookie;
    set: typeof setCookie;
    remove: typeof removeCookie;
};

declare const tcUtil: {
    _: typeof __;
    lib: typeof _lib;
    polyfill: typeof _polyfill;
    is: typeof _is;
    datetime: typeof _datetime;
    math: typeof _math;
    CONST: typeof _const;
    dom: typeof _dom;
    extend: typeof _extend;
    event: typeof _event;
    storage: typeof storage;
    cookie: typeof cookie;
    byte: typeof _byte;
    gbk: typeof _gbk;
    _version: string
};

export default tcUtil;