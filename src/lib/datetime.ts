/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:31:46
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-31 08:34:06
 * @FilePath: /util/src/lib/datetime.ts
 * @Description: 日期相关api
 */

import {isString} from './is';
import {assign} from './polyfill';
import {TDateTime} from '../type/type';

// 获取某年某月一共有多少天
export function getDaysInMonth (year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

// 获取某年某月的第一天是星期几
export function getFirstDayWeekInMonth (year: number, month: number) {
    return new Date(year, month - 1, 1).getDay();
}

// 传入毫秒数 返回 时分秒
export function formatTime ({
    time,
    type,
}:{
    time: number;
    type?: 'number' | 'json' | 'text' | 'number-no-hour';
}): string;
export function formatTime ({
    time,
    template,
    customReplacers,
}:{
    time: number;
    template: string;
    customReplacers?: {[prop in TDateTime]?: string | RegExp};
}): string;
export function formatTime ({
    time,
    type,
    template,
    customReplacers,
}: {
    time: number;
    type?: 'number' | 'json' | 'text' | 'number-no-hour';
    template?: string;
    customReplacers?: {[prop in TDateTime]?: string | RegExp};
}) {
    const json = timeToJson(time);
    if (template) {
        return formatDate({template, date: json, customReplacers});
    } else if (type === 'json') {
        return json;
    } else if (type === 'text') {
        return `${fnText(json.hour, '小时')}${fnText(json.minute, '分钟')}${fnText(json.second, '秒')}` || '0秒';
    } else if (type === 'number-no-hour') {
        return `${fn(json.minute)}:${fn(json.second)}`;
    }
    return `${fn(json.hour)}:${fn(json.minute)}:${fn(json.second)}`;
}

export function formatDate ({
    template = 'YYYY-MM-DD hh:mm:ss',
    date = new Date(),
    customReplacers,
}: {
    template?: string,
    date?: {[prop in TDateTime]?: number} | Date | number,
    customReplacers?: {[prop in TDateTime]?: string | RegExp}
} = {}) {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    if (date instanceof Date) {
        date = dateToJson(date);
    }
    const replacers: {
        [prop in TDateTime]: string | RegExp
    } = {
        year: 'YYYY',
        month: 'MM',
        day: 'DD',
        hour: 'hh',
        minute: 'mm',
        second: 'ss',
        microsecond: 'ms',
    };
    if (customReplacers) {
        assign(replacers, customReplacers);
    }
    for (const key in date) {
        const item = date[key as TDateTime];
        if (typeof item === 'number') {
            const str = fn(item);
            const replacer = replacers[key as TDateTime];
            let reg: RegExp;
            if (replacer instanceof RegExp) {
                reg = replacer as RegExp;
            } else if (isString(replacer)) {
                reg = new RegExp(replacer, 'g');
            } else {
                continue;
            }
            template = template.replace(reg, str);
            if (key === 'year') {
                template = template.replace(/YY/g, str.substr(str.length - 2));
            }
        }
    }
    return template;
}

export function timeToJson (time: number) {
    let second: number, hour: number, minute: number;
    if (time <= 0) {
        second = hour = minute = 0;
    } else {
        second = Math.floor(time / 1000);
        hour = Math.floor(second / 3600);
        second -= hour * 3600;
        minute = Math.floor(second / 60);
        second -= minute * 60;
    }
    return {hour, minute, second};
}

export function dateToJson (date = nowDate()) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        microsecond: date.getMilliseconds()
    };
}

export function timeToDate (time: number | Date) {
    return (typeof time === 'number') ? new Date(time) : time;
}

export function dateToTime (date: number | Date) {
    return (typeof date === 'number') ? date : date.getTime();
}

export function nowTime () {
    return nowDate().getTime();
}

export function nowDate () {
    return new Date();
}

function fn (num: number) {
    return num < 10 ? ('0' + num) : num.toString();
}

function fnText (num: number, tail: string) {
    return num > 0 ? (num + tail) : '';
}

export function msToSecond (value: number) {
    return Math.round(value / 1000);
}
export function secondToMs (value: number) {
    return value * 1000;
}
export function minuteToMs (value: number) {
    return secondToMs(value * 60);
}
export function hourToMs (value: number) {
    return minuteToMs(value * 60);
}

export function createTimeTick ({
    key = '',
    useStorage = false,
    onTimeRunOut = () => {},
    autoStart = true,
    time = 10,
    intervalTime = 1000,
}) {
    let totalUseTimeKey = '_tt_total_use';
    if (useStorage) {
        window.addEventListener('beforeunload', markTotalUseTime, false);
    }
    if (key) {
        totalUseTimeKey = `${key}${totalUseTimeKey}`;
    }
    let targetTime = 0;
    let startTime = getNowTime();

    function getNowTime () {
        return new Date().getTime();
    }

    let interval = 0;

    function markTotalUseTime () {
        if (!useStorage) return;
        const thisUseTime = getNowTime() - startTime;
        const str = localStorage.getItem(totalUseTimeKey);
        let totalUseTime = thisUseTime;
        if (str) {
            const lastTotalUseTime = parseInt(str);
            totalUseTime += lastTotalUseTime;
        }
        localStorage.setItem(totalUseTimeKey, totalUseTime + '');
    }

    function getTotalUseTime () {
        if (!useStorage) return 0;
        const str = localStorage.getItem(totalUseTimeKey);
        return str ? parseInt(str) : 0;
    }

    function timeOut (limitTime: number) {
        clearInterval(interval);
        if (useStorage) {
            window.removeEventListener('beforeunload', markTotalUseTime, false);
            localStorage.setItem(totalUseTimeKey, limitTime + '');
        }
        onTimeRunOut();
    }

    function tick () {
        const limitTime = time * 1000;
        const totalUseTime = getTotalUseTime();
        if (limitTime <= totalUseTime) {
            timeOut(limitTime);
            return;
        }
        startTime = getNowTime();
        targetTime = startTime + limitTime - totalUseTime;

        clearInterval(interval);
        interval = window.setInterval(() => {
            const nowTime = getNowTime();
            if (nowTime >= targetTime) {
                timeOut(limitTime);
            }
        }, intervalTime);
    }

    if (autoStart) {
        tick();
        return null;
    }
    return tick;
}