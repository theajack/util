/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:24:08
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 16:27:25
 * @FilePath: \util\src\lib\polyfill.ts
 * @Description: Coding something
 */
import {IJson} from '../type/type';
import {isFunc} from './is';
import {pickTo} from './tool';

// 替换 Object.keys 兼容性考虑
export function keys (json: object) {
    if (isFunc(Object.keys)) {
        return Object.keys(json);
    }
    const arr = [];
    for (const key in json)
        arr.push(key);
    return arr;
}
// 替换 Object.values 兼容性考虑
export function values (json: IJson) {
    if (isFunc(Object.values)) {
        return Object.values(json);
    }
    const arr = [];
    for (const key in json)
        arr.push(json[key]);
    return arr;
}
// pick({b:2}, 'b')
// 从json中去属性
export function assign (target: object, ...sources: object[]) {
    if (isFunc(Object.assign)) {
        return Object.assign(target, ...sources);
    }
    sources.forEach(source => {
        pickTo(target, source);
    });
    return target;
}