/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:20:11
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 15:36:02
 * @FilePath: \util\src\lib\dom.ts
 * @Description: Coding something
 */
import _ from 'easy-dom-util';

export const $: typeof _;

export function registDisableContextMenu (needDisable?: ()=> boolean): void;

export function disableDefaultEvent (e?: Event): boolean;

export function onPageShowHide (onshow: Function, onhide?: Function): void;