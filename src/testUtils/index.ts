import {IStrictTestCase} from './types';

let testId = 0;

export function batchTestCases ({
    testCases,
    name = '' + (testId ++)
}: {
    testCases: IStrictTestCase[],
    name?: string
}) {
    testCases.forEach((testCase, index) => {
        const testCaseName = testCase.name || `${name}-${index}`;
        test(testCaseName, () => {
            const results = testCase.test();
            // const method = testCase.method || 'toStrictEqual';
            expect(results).toStrictEqual(testCase.expect);
        });
    });
}
