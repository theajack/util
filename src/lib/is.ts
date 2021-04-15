/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:25:07
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 12:20:14
 * @FilePath: \util\src\lib\is.ts
 * @Description: Coding something
 */
import {TYPE} from './constant';
import {IJson, TIsType} from '../type/type';

export function isUndf (v: any) {
    return isType(v, TYPE.UNDEFINED);
}
export function isFunc (v: any) {
    return isType(v, TYPE.FUNCTION);
}
export function isObject (v: any) {
    return isType(v, TYPE.OBJECT);
}
export function isJson (v: any) {
    if (isObject(v) && !isNull(v) && isFunc(v.constructor)) {
        const name = v.constructor.name;
        if (isString(name) && name !== '') {
            return (name === 'Object');
        }
    }
    return isObject(v);
}
export function isJsonOrArray (v: any) {
    return isArray(v) || isJson(v);
}
export function isNumber (v: any) {
    return isType(v, TYPE.NUMBER);
}
export function isNull (v: any) {
    return isType(v, TYPE.NULL);
}
export function isBool (v: any) {
    return isType(v, TYPE.BOOLEAN);
}
export function isString (v: any) {
    return isType(v, TYPE.STRING);
}
export function isType (v: any, t: TIsType) {
    if (t === TYPE.ARRAY) {
        return isArray(v);
    }
    if (t === TYPE.NULL) {
        return v === null;
    }
    return typeof v === t;
}
export function isArray (v: any) {
    return v instanceof Array;
}

export function isPC () {
    return !/(iphone|ipad|ipod|ios|android)/i.test(_ua());
}

// 语义更清晰
export function isMobile () {
    return !isPC();
}

export function isIOS () {
    return /(iphone|ipad|ipod|ios)/.test(_ua());
}

export const _isIOS = isIOS();

export function isAndroid () {
    return /android/i.test(_ua());
}

export function isWX () {
    const ua = _ua();
    return /micromessenger/.test(ua) && !(/wxwork/.test(ua));
}

export function isQQ () {
    return /qq\/[0-9]/.test(_ua());
}

export function isTenVideo () {
    return /qqlivebrowser/.test(_ua());
}

export function isWxMiniProgram () {
    const ua = _ua();
    return (ua.match(/micromessenger/i) && ua.match(/miniprogram/i)) || window.__wxjs_environment === 'miniprogram';
}

export function isIOSWx () {
    return isIOS() && isWX();
}

function _ua () {
    return window.navigator.userAgent.toLowerCase();
}

export function isIPAddress (str: string) {
    return /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/.test(str);
}

export const isInited = (() => {
    const map: IJson<boolean> = {};
    return (
        id: string,
        bool: boolean | Function = true,
        type: 'and' | 'or' = 'and'
    ) => {
        if (isFunc(bool)) {bool = (bool as Function)();}
        const value = map[id];
        if (type === 'and') {
            if (bool && value) {return true;}
        } else {
            if (bool || value) {return true;}
        }
        map[id] = true;
        return false;
    };
})();