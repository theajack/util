import {ICookieSetOption} from './type';

export function getCookie (
    name: string,
    cookie?: string
): string

export function setCookie (key: string, value: string, options?: ICookieSetOption): boolean;

export function removeCookie (name: string, path?: string): boolean;