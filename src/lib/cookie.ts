import {ICookieSetOption} from '../type/type';

export function getCookie (
    name: string,
    cookie: string = document.cookie
) {
    if (cookie.length > 0 && name) {
        const reg = new RegExp('(^|; ?)' + name + '=([^&]*?)(;|$)', 'i');
        const r = cookie.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    }
    return '';
}

export function setCookie (key: string, value: string, {
    expires, path, domain, secure, sameSite, sameParty, priority
}: ICookieSetOption = {}) {
    let cookieStr = `${key}=${escape(value)};`;
    if (expires) {
        const expiresStr = ((typeof expires === 'number') ? new Date(expires) : expires).toUTCString();
        cookieStr += `expires=${expiresStr};`;
    }
    if (path) cookieStr += `path=${path};`;
    if (domain) cookieStr += `domain=${domain};`;
    if (secure) cookieStr += 'secure;';
    if (sameSite) {
        if (sameSite !== 'None' || secure)
            cookieStr += `sameSite=${sameSite};`;
        else
            console.warn('设置sameSite=None时必须设置secure=true');
    }
    if (sameParty) {
        if (secure)
            cookieStr += 'sameParty;';
        else
            console.warn('设置sameParty=true时必须设置secure=true');
    }
    if (priority) cookieStr += `priority=${priority};`;
    try {
        document.cookie = cookieStr;
        return true;
    } catch (e) {
        console.warn(e);
        return false;
    }
}

export function removeCookie (key: string, path?: string) {
    const setOptions: ICookieSetOption = {path};
    setOptions.expires = countExpiresWithMs(-1000);
    return setCookie(key, '', setOptions);
}

function countExpiresWithMs (ms: number): number {
    return Date.now() + ms;
}