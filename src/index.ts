/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:01:35
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-16 18:01:01
 * @FilePath: \util\src\index.ts
 * @Description: Coding something
 */

import * as _storage from './lib/storage';
import * as __ from './lib/util';
import {getCookie, setCookie} from './lib/cookie';
import _event from 'tc-event';
import {creatEventReady, createDotAnimation, createState} from './lib/lib';
import {createStatus} from './lib/state';
import * as _polyfill from './lib/polyfill';
import * as _is from './lib/is';
import * as _datetime from './lib/datetime';
import * as _math from './lib/math';


export const storage = _storage;
export const _ = __;
export const cookie = {get: getCookie, set: setCookie};
export const event = _event;
export const lib = {creatEventReady, createDotAnimation, createState, createStatus};
export const polyfill = _polyfill;
export const is = _is;
export const datetime = _datetime;
export const math = _math;
