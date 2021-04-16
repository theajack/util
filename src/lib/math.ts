/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:19:36
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-16 18:05:52
 * @FilePath: \util\src\lib\math.ts
 * @Description: Coding something
 */

import {IPoint, ICircle, IRect} from '../type/type';

export function countDistance (point1: IPoint, point2: IPoint) {
    return countDistanceByDiff({
        x: point1.x - point2.x,
        y: point1.y - point2.y
    });
}

export function countDistanceByDiff (diff: IPoint) {
    return Math.round(
        Math.pow(
            countSumOfSquare(diff.x, diff.y),
            0.5
        )
    );
}

export function countSumOfSquare (x: number, y: number) {
    return Math.pow(x, 2) + Math.pow(y, 2);
}

export function countValueByRateAndRange (
    rate: number,
    start: number,
    end: number
) {
    return start + (end - start) * rate;
}

export function circleToRect (circle: ICircle) {
    return {
        x1: circle.x - circle.r,
        x2: circle.x + circle.r,
        y1: circle.y - circle.r,
        y2: circle.y + circle.r,
    };
}

export function isPointInRect ({
    point,
    rect,
    border = false,
}: {
    point: IPoint;
    rect: IRect;
    border?: boolean;
}) {
    if (border) {
        return (
            point.x >= rect.x1 &&
            point.x <= rect.x2 &&
            point.y >= rect.y1 &&
            point.y <= rect.y2
        );
    }
    return (
        point.x > rect.x1 &&
        point.x < rect.x2 &&
        point.y > rect.y1 &&
        point.y < rect.y2
    );
}

export function isPointInCircle ({
    point,
    circle,
    border = false,
}: {
    point: IPoint;
    circle: ICircle;
    border?: boolean;
}) {
    const distance = countSumOfSquare(
        point.x - circle.x, point.y - circle.y
    );
    const base = Math.pow(circle.r, 2);
    return border ? (distance < base) : (distance <= base);
}

/**
 * 计算两个触点之间的单步距离
 */
export function countPosDiffByStep (
    startPos: IPoint,
    targetPos: IPoint,
    step = 5
) {
    if (!startPos || !targetPos) {return null;}
    return {
        x: (targetPos.x - startPos.x) / step,
        y: (targetPos.y - startPos.y) / step
    };
}