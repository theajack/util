/*
 * @Author: tackchen
 * @Date: 2021-04-15 12:52:27
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 15:59:42
 * @FilePath: \util\src\lib\__tests__\is.spec.ts
 * @Description: Coding something
 */
import {isArray, isObject, isJson, isUndf, isJsonOrArray, isNumber, isNull, isBool, isString, isType, isIPAddress, isInited} from '../is';
import {batchTestCases} from '../../testUtils/index';
import {IStrictTestCase} from '../../testUtils/types';

const testCases: IStrictTestCase[] = [
    {
        test: [
            isArray([]),
            isArray({}),
            isArray(1)
        ],
        expect: [
            true,
            false,
            false,
        ]
    },
    {
        test: [
            isObject([]),
            isObject({}),
            isObject(null),
            isObject(1)
        ],
        expect: [
            true,
            true,
            true,
            false,
        ]
    },
    {
        test: [
            isJson([]),
            isJson({}),
            isJson(null),
            isJson(1)
        ],
        expect: [
            false,
            true,
            false,
            false,
        ]
    },
    {
        test: [
            isUndf(undefined),
            isUndf(1),
            isUndf(null)
        ],
        expect: [
            true,
            false,
            false,
        ]
    },
    {
        test: [
            isJsonOrArray([]),
            isJsonOrArray({}),
            isJsonOrArray(null)
        ],
        expect: [
            true,
            true,
            false,
        ]
    },
    {
        test: [
            isNumber(1),
            isNumber('1'),
        ],
        expect: [
            true,
            false,
        ]
    },
    {
        test: [
            isNull(null),
            isNull(undefined),
        ],
        expect: [
            true,
            false,
        ]
    },
    {
        test: [
            isBool(true),
            isBool(''),
        ],
        expect: [
            true,
            false,
        ]
    },
    {
        test: [
            isString(''),
            isString(1),
        ],
        expect: [
            true,
            false,
        ]
    },
    {
        test: [
            isType([], 'array'),
            isType(1, 'number'),
            isType(null, 'null'),
        ],
        expect: [
            true,
            true,
            true,
        ]
    },
    {
        test: [
            isIPAddress('255.255.255.255'),
            isIPAddress('255.255.255'),
            isIPAddress('2'),
        ],
        expect: [
            true,
            false,
            false,
        ]
    },
    {
        test: [
            isInited('a'),
            isInited('a'),
            isInited('b', false),
            isInited('b', false),
            isInited('b', true),
            isInited('b', true),
            isInited('c', false, 'or'),
            isInited('c', false, 'or'),
            isInited('d', true, 'or'),
            isInited('d', true, 'or'),
        ],
        expect: [
            false,
            true,
            false,
            false,
            true,
            true,
            false,
            true,
            true,
            true,
        ]
    },
];

batchTestCases({
    testCases,
    name: 'is',
});