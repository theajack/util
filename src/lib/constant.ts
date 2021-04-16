/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:25:50
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 15:50:57
 * @FilePath: \util\src\lib\constant.ts
 * @Description: Coding something
 */

import {IJson, TIsType} from '../type/type';

export const TYPE: IJson<TIsType> = {
    FUNCTION: 'function',
    OBJECT: 'object',
    ARRAY: 'array',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    STRING: 'string',
    NULL: 'null',
    UNDEFINED: 'undefined'
};

export const UINT_TYPE = {
    U8: 'u8',
    U16: 'u16',
    U32: 'u32',
};

export const VERSION = {
    LATEST: 'latest',
    DEFAULT: 'default',
};

export const COMPARE_RESULT = {
    LESS: 0, // 小于
    EVEN: 1, // 等于
    MORE: 2, // 大于
};