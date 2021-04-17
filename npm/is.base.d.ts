import {TIsType} from './type';

export function isUndf (v: any): boolean;
export function isFunc (v: any): boolean;
export function isObject (v: any): boolean;
export function isJson (v: any): boolean;
export function isJsonOrArray (v: any): boolean;
export function isNumber (v: any): boolean;
export function isNull (v: any): boolean;
export function isBool (v: any): boolean;
export function isString (v: any): boolean;
export function isType (v: any, t: TIsType): boolean;
export function isArray (v: any): boolean;

export function isPC (): boolean;

// 语义更清晰
export function isMobile (): boolean;

export function isIOS (): boolean;

export function isAndroid (): boolean;

export function isWX (): boolean;

export function isQQ (): boolean;

export function isTenVideo (): boolean;

export function isWxMiniProgram (): boolean;

export function isIOSWx (): boolean;

export function isIPAddress (str: string): boolean;

export function isInited (id: string, bool?: boolean | Function, type?: 'and' | 'or'): boolean;