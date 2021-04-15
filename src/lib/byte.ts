/*
 * @Author: tackchen
 * @Date: 2021-04-15 11:06:31
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 11:29:53
 * @FilePath: \util\src\lib\byte.ts
 * @Description: Coding something
 */
import {UINT_TYPE} from './constant';
import {isNumber} from './is';
import GBK from './gbk';

export function stringToByteArray (
    str: string,
    gbk: boolean = false
) {
    if (gbk) {
        return stringToGbkBytes(str);
    }
    const bytes = new Array();
    let c;
    const len = str.length;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}

export function stringToGbkBytes (str: string) {
    str = GBK.encode(str);
    const byteArr = new Array();
    for (let i = 0; i < str.length; i++) {
        const ch = str.charAt(i);
        if (ch === '%') {
		     const num = str.charAt(i + 1) + str.charAt(i + 2);
		     let result = parseInt(num, 16);
		     result = result | (-1 << 8);
		     byteArr.push(result);
		     i += 2;
        } else {
            byteArr.push(ch.charCodeAt(0));
        }
    }
    return byteArr;
}

export function bytesToString (uint8arr: Uint8Array) {
    if (typeof uint8arr === 'string') {
        return uint8arr;
    }
    let str = '';
    const _arr = uint8arr;
    for (let i = 0; i < _arr.length; i++) {
        const one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            const bytesLength = v[0].length;
            let store = _arr[i].toString(2).slice(7 - bytesLength);
            for (let st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}

export function bytesToNumber (
    uint8arr: Uint8Array,
    uintType: number|string = UINT_TYPE.U32,
    littleEnd: boolean = true
) {
    if (uintType === UINT_TYPE.U8) {
        return uint8arr[uint8arr.length - 1];
    }
    let length = uintType;
    if (!isNumber(uintType)) {
        switch (uintType) {
            case UINT_TYPE.U16: length = 2; break;
            case UINT_TYPE.U32: length = 4; break;
            default : length = 4; break;
        }
    }
    let num = 0;
    if (littleEnd) {
        for (let i = 0; i < length; i++) {
            if (uint8arr[i] !== 0) {
                num += uint8arr[i] * Math.pow(256, i);
            }
        }
    } else {
        let lengthIndex = 0;
        for (let i = uint8arr.length - 1; lengthIndex < length; i--) {
            if (uint8arr[i] !== 0) {
                num += uint8arr[i] * Math.pow(256, lengthIndex);
            }
            lengthIndex ++;
        }
    }
    return num;
}