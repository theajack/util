/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:05:16
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 13:29:06
 * @FilePath: \util\src\type\type.d.ts
 * @Description: Coding something
 */

declare global {
    interface Document {
        mozHidden?: boolean;
        msHidden?: boolean;
        webkitHidden?: boolean;
    }

    interface Window {
        __wxjs_environment?: string;
    }
}
export interface IJson<T = any> {
    [prop: string]: T;
}

export type TIsType = 'function' | 'object' | 'array' | 'number' | 'boolean' | 'string' | 'null' | 'null' | 'undefined';

export interface IPoint {
    x: number;
    y: number;
}

export interface ICircle extends IPoint {
    r: number;
}

export interface IRect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface ISize {
    width: number;
    height: number;
}