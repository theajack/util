/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:31:46
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 16:13:50
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

// 传入毫秒数 返回 时分秒
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

export function timeToDate (time: number | Date) {
    return (typeof time === 'number') ? new Date(time) : time;
}

export function dateToTime (date: number | Date) {
    return (typeof date === 'number') ? date : date.getTime();
}

export function formatDate () {
    
}

export function timeToString (time: number) {
    const date = new Date(time);
    return `${date.getFullYear()}-${fn(date.getMonth() + 1)}-${fn(date.getDate())} ${fn(date.getHours())}:${fn(date.getMinutes())}`;
}

export function nowTime () {
    return new Date().getTime();
}

export function nowTimeString () {
    return timeToString(nowTime());
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