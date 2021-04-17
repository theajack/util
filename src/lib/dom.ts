/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:20:11
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 12:05:49
 * @FilePath: \util\src\lib\dom.ts
 * @Description: Coding something
 */
import _ from 'easy-dom-util';

export const $ = _;

export function registDisableContextMenu (needDisable: Function = () => true) {
    window.addEventListener('contextmenu', (e) => {
        if (needDisable()) {
            return disableDefaultEvent(e);
        }
    }, false);
}

export function disableDefaultEvent (e?: Event) {
    e = (e || window.event) as Event;
    e.returnValue = false;
    e.preventDefault();
    return false;
}

export function onPageShowHide (onshow: Function, onhide?: Function) {
    // 切换后台倒计时停止问题
    let hidden: string,
        state: 'visibilityState' | 'mozVisibilityState' | 'msVisibilityState' | 'webkitVisibilityState',
        visibilityChange: string = '';
    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
        state = 'visibilityState';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
        state = 'mozVisibilityState';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
        state = 'msVisibilityState';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
        state = 'webkitVisibilityState';
    }
    const cb = function () {
        if (document[state] === hidden) {
            if (onhide)onhide();
        } else {
            onshow();
        }
    };
    document.removeEventListener(visibilityChange, cb, false);
    document.addEventListener(visibilityChange, cb, false);
}