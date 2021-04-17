import {IJson, ISize} from './type';

export function getUrlParam (name: string, defVal?: string): string;

export function parseUrlParam (search: string, name: string, defVal?: string): any;

export function copy (str: string): boolean;

export function type (obj: any): string;

export function random (a: number, b: number): number;

export function download(str: string, filename?: string, type?: string): void;

export function execute (options: {
    code: string;
    onload?: Function;
    onerror?: Function;
    ontimeout?: Function;
    timeout?: number;
}): void;

export function importScript (
    src: string,
    onload?: Function
): void;

export function readFile(success: (result: string | ArrayBuffer | null) => void, accept?: string): void;

export function mapArray (
    value: any[],
    fn: (v: any) => void
): void;

export function mapJson (
    key: IJson | string,
    value: any,
    fn: (key: string, value: any)=>void
): void;

export function parseJSON (data: any): object | null;


export function pick (options: {
    target?: IJson | Array<any>;
    data: IJson | Array<any>;
    attr?: string[];
    deep?: boolean;
    ignoreUndf?: boolean;
    forceSync?: boolean;
}): any[] | IJson<any>;


export function pickAttr (
    data: IJson | Array<any>,
    attr?: string[],
    deep?: boolean
): any[] | IJson<any>;

// pickTo({a:1}, {b:2}, ['b'])
// pickTo({a:1}, {b:2}, ['b','newAttr:b']) // 别名
// pickTo({a:1}, {b:2}, ['b','newAttr:newValue']) // 新属性
// pickTo({a:1}, {b:2}, ['b','newAttr:number.1']) // 新属性
// 从一个json复制属性到另一个json
export function pickTo (
    target: IJson | Array<any>,
    data: IJson | Array<any>,
    attr?: string[],
    deep?: boolean
): any[] | IJson<any>;

export function removeRedundantAttrInObject (
    target: IJson | Array<any>,
    source: IJson | Array<any>,
    ignoreUndf?: boolean
): void;

/**
 * 获取canvas浏览器指纹
 */
export function getCanvasFingerPrint (domain?: string): string;

export function boolPipe (funcs: (boolean | (()=>boolean))[]): boolean;

// 节流函数
export function throttle(func: Function, delay?: number): (this: any) => void;

export function countImgSize (src: string): Promise<ISize>;

export function compareVersion (v1?: string, v2?: string): 0 | 1 | 2;

export function versionToArray (version: string): number[]