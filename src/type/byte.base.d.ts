/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:06:31
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 15:29:07
 * @FilePath: \util\src\lib\byte.ts
 * @Description: Coding something
 */
export function stringToBytes (str: string): Uint8Array;

export function stringToGbkBytes (str: string): Uint8Array;

export function bytesToString (uint8arr: Uint8Array): string;

export function bytesToNumber (
    uint8arr: Uint8Array,
    uintType?: number | string,
    littleEnd?: boolean
): number;