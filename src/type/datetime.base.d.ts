/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:31:46
 * @LastEditors: tackchen
 * @LastEditTime: 2021-12-31 08:35:26
 * @FilePath: /util/src/type/datetime.base.d.ts
 * @Description: 日期相关api
 */

import {TDateTime} from './type';

// 获取某年某月一共有多少天
export function getDaysInMonth (year: number, month: number): number;

// 获取某年某月的第一天是星期几
export function getFirstDayWeekInMonth (year: number, month: number): number;

// 传入毫秒数 返回 时分秒
export function formatTime (options: {
    time: number;
    type?: 'number' | 'json' | 'text' | 'number-no-hour';
}): string;
export function formatTime (options: {
    time: number;
    template: string;
    customReplacers?: {[prop in TDateTime]?: string | RegExp};
}): string;

export function formatDate (options?: {
    template?: string,
    date?: {[prop in TDateTime]?: number} | Date | number,
    customReplacers?: {[prop in TDateTime]?: string | RegExp}
}): string;

export function timeToJson (time: number): {
    hour: number;
    minute: number;
    second: number;
}

export function dateToJson (date: Date): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    microsecond: number;
}

export function timeToDate (time: number | Date): Date;

export function dateToTime (date: number | Date): number;

export function nowTime (): number;

export function nowDate (): Date;

export function msToSecond (value: number): number;
export function secondToMs (value: number): number;
export function minuteToMs (value: number): number;
export function hourToMs (value: number): number;
