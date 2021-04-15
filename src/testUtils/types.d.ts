export interface IStrictTestCase {
    name?: string;
    test(): any[];
    expect: any[];
    // method?: 'toBe'|'toHaveBeenCalled'|'toHaveBeenCalledTimes'|'toHaveBeenCalledWith'|'toHaveBeenLastCalledWith'|'toHaveBeenNthCalledWith'|'toHaveReturned'|'toHaveReturnedTimes'|'toHaveReturnedWith'|'toHaveLastReturnedWith'|'toHaveNthReturnedWith'|'toHaveLength'|'toHaveProperty'|'toBeCloseTo'|'toBeDefined'|'toBeFalsy'|'toBeGreaterThan'|'toBeGreaterThanOrEqual'|'toBeLessThan'|'toBeLessThanOrEqual'|'toBeInstanceOf'|'toBeNull'|'toBeTruthy'|'toBeUndefined'|'toBeNaN'|'toContain'|'toContainEqual'|'toEqual'|'toMatch'|'toMatchObject'|'toMatchSnapshot'|'toMatchInlineSnapshot'|'toStrictEqual'|'toThrow'|'toThrowErrorMatchingSnapshot'|'toThrowErrorMatchingInlineSnapshot';
}