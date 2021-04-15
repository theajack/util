/*
 * @Author: tackchen
 * @Date: 2021-04-15 13:22:55
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 13:24:37
 * @FilePath: \util\public\main.ts
 * @Description: Coding something
 */
import {lib} from '../src/index';

declare global {
    interface Window {
        lib: any;
    }
}

window.lib = lib;