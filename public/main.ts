/*
 * @Author: tackchen
 * @Date: 2021-04-15 13:22:55
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 15:58:15
 * @FilePath: \util\public\main.ts
 * @Description: Coding something
 */
import {lib, is} from '../src/index';

declare global {
    interface Window {
        lib: any;
        is: any;
    }
}

window.lib = lib;
window.is = is;