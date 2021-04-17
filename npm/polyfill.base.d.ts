/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:24:08
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 15:43:45
 * @FilePath: \util\src\lib\polyfill.ts
 * @Description: Coding something
 */
import {IJson} from './type';

// 替换 Object.keys 兼容性考虑
export function keys (json: object): string[];
// 替换 Object.values 兼容性考虑
export function values (json: IJson): any[];
// pick({b:2}, 'b')
// 从json中去属性
export function assign (target: object, ...sources: object[]): any;