/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:19:36
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 15:43:06
 * @FilePath: \util\src\lib\math.ts
 * @Description: Coding something
 */

import {IPoint, ICircle, IRect} from './type';

export function countDistance (point1: IPoint, point2: IPoint): number;

export function countDistanceByDiff (diff: IPoint): number;

export function countSumOfSquare (x: number, y: number): number;

export function countValueByRateAndRange (
    rate: number,
    start: number,
    end: number
): number;

export function circleToRect(circle: ICircle): {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};

export function isPointInRect (options: {
    point: IPoint;
    rect: IRect;
    border?: boolean;
}): boolean;

export function isPointInCircle (options: {
    point: IPoint;
    circle: ICircle;
    border?: boolean;
}): boolean;

/**
 * 计算两个触点之间的单步距离
 */
export function countPosDiffByStep (
    startPos: IPoint,
    targetPos: IPoint,
    step?: number
): IPoint;