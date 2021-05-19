/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:24:08
 * @LastEditors: theajack
 * @LastEditTime: 2021-05-19 20:43:08
 * @FilePath: \util\src\lib\polyfill.ts
 * @Description: Coding something
 */
import {IJson} from '../type/type';

function createFakeStorage () {
    return { // 简易临时的localStorage polyfill
        _data: {} as IJson,
        getItem (k: string) {
            if (typeof this._data[k] === 'undefined') {
                return null;
            }
            return this._data[k];
        },
        setItem (k: string, v: any) {
            this._data[k] = v;
        },
        removeItem (k: string) {
            delete this._data[k];
        }
    };
}

declare global {
    interface Window {
        localStorage: any;
        sessionStorage: any;
    }
}

export function assign (target: IJson, ...sources: IJson[]) {
    sources.forEach(source => {
        for (const k in source) {
            target[k] = source[k];
        }
    });
    return target;
}
export function keys (json: IJson) {
    const arr = [];
    for (const key in json)
        arr.push(key);
    return arr;
}
export function values (json: IJson) {
    const arr = [];
    for (const key in json)
        arr.push(json[key]);
    return arr;
}

function initPolyFill () {
    if (!window.localStorage) window.localStorage = createFakeStorage();
    if (!window.sessionStorage) window.sessionStorage = createFakeStorage();
    if (!Object.assign) Object.assign = assign;
    if (!Object.keys) Object.keys = keys;
    if (!Object.values) Object.values = values;
}

initPolyFill();