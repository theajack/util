const storage = window.localStorage;
const ADDON = '_tc_u';

export function read (key: string) {
    key += ADDON;
    let value = storage.getItem(key);
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
export function write (key: string, value: any) {
    key += ADDON;
    const type = typeof value;
    if (type === 'object') {
        value = JSON.stringify(value);
    } else if (type !== 'string') {
        value = value.toString();
    }
    value = `${type}:${value}`;
    storage.setItem(key, value);
}

export function remove (key: string) {
    key += ADDON;
    storage.removeItem(key);
}
