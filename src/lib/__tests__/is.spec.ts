/*
 * @Author: tackchen
 * @Date: 2021-04-15 12:52:27
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-15 13:22:34
 * @FilePath: \util\src\lib\__tests__\is.spec.ts
 * @Description: Coding something
 */
import {isArray} from '../is';
import {batchTestCases} from '../../testUtils/index';
import {IStrictTestCase} from '../../testUtils/types';

const testCases: IStrictTestCase[] = [
    {
        test () {
            return [
                isArray([]),
                isArray({}),
                isArray(1),
            ];
        },
        expect: [
            true,
            false,
            false,
        ]
    }
];

batchTestCases({
    testCases,
    name: 'is',
});