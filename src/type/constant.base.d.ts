/*
 * @Author: tackchen
 * @Date: 2021-04-15 10:25:50
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-17 15:30:15
 * @FilePath: \util\src\lib\constant.ts
 * @Description: Coding something
 */

export const TYPE: {
    FUNCTION: 'function';
    OBJECT: 'object';
    ARRAY: 'array';
    NUMBER: 'number';
    BOOLEAN: 'boolean';
    STRING: 'string';
    NULL: 'null';
    UNDEFINED: 'undefined'
};

export const UINT_TYPE: {
    U8: 'u8';
    U16: 'u16';
    U32: 'u32';
};

export const VERSION: {
    LATEST: 'latest';
    DEFAULT: 'default';
};

export const COMPARE_RESULT: {
    LESS: 0; // 小于
    EVEN: 1; // 等于
    MORE: 2; // 大于
};