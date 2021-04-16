/*
 * @Author: tackchen
 * @Date: 2021-04-15 13:22:55
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-16 18:01:43
 * @FilePath: \util\public\main.ts
 * @Description: Coding something
 */
import * as tcUtils from '../src/index';

declare global {
    interface Window {
        tcUtils: any;
    }
}

window.tcUtils = tcUtils;