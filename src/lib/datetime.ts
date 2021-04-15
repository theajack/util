/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:31:46
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 11:38:07
 * @FilePath: \util\src\lib\datetime.ts
 * @Description: 日期相关api
 */

// 获取某年某月一共有多少天
export function getDaysInMonth (year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

// 获取某年某月的第一天是星期几
export function getFirstDayWeekInMonth (year: number, month: number) {
    return new Date(year, month - 1, 1).getDay();
}


export function formatTime (
    time: number,
    type: 'number' | 'json' | 'text' = 'number'
) {
    let sec: number, hour: number, min: number;
    if (time <= 0) {
        sec = hour = min = 0;
    } else {
        sec = Math.floor(time / 1000);
        hour = Math.floor(sec / 3600);
        sec -= hour * 3600;
        min = Math.floor(sec / 60);
        sec -= min * 60;
    }
    if (type === 'json') {
        return {hour, min, sec};
    } else if (type === 'text') {
        return `${fnText(hour, '小时')}${fnText(min, '分钟')}${fnText(sec, '秒')}` || '0秒';
    }
    return `${fn(hour)}:${fn(min)}:${fn(sec)}`;
}

export function timestampToStr (time: number) {
    const date = new Date(time);
    return `${date.getFullYear()}-${fn(date.getMonth() + 1)}-${fn(date.getDate())} ${fn(date.getHours())}:${fn(date.getMinutes())}`;
}

export function nowDateTime (time = false) {
    const date = new Date();
    if (time) {
        return date.getTime();
    }
    return `${date.getFullYear()}-${fn(date.getMonth() + 1)}-${fn(date.getDate())} ${fn(date.getHours())}:${fn(date.getMinutes())}:${fn(date.getSeconds())}`;
}

export function min2ms (min: number) {
    return min * 60 * 1000;
}

function fn (num: number) {
    return num < 10 ? ('0' + num) : num;
}

function fnText (num: number, tail: string) {
    return num > 0 ? (num + tail) : '';
}