
const ADDON = '_tc_u';

export function getStorage (key: string) {
    key += ADDON;
    let value = window.localStorage.getItem(key);
    if (value === null) {
        return null;
    }
    const type = value.substr(0, value.indexOf(':'));
    value = value.substr(value.indexOf(':') + 1);
    if (type === 'number') {
        return parseFloat(value);
    } else if (type === 'boolean') {
        return value === 'true';
    } else if (type === 'object') {
        return JSON.parse(value);
    }
    return value;
}
export function setStorage (key: string, value: any) {
    key += ADDON;
    const type = typeof value;
    if (type === 'object') {
        value = JSON.stringify(value);
    } else if (type !== 'string') {
        value = value.toString();
    }
    value = `${type}:${value}`;
    window.localStorage.setItem(key, value);
}

export function removeStorage (key: string) {
    key += ADDON;
    window.localStorage.removeItem(key);
}
