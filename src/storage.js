let storage = window.localStorage;
const ADDON = '_jsbox';

function read (key) {
    key += ADDON;
    let value = storage.getItem(key);
    if (value === null) {
        return null;
    }
    let type = value.substr(0, value.indexOf(':'));
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
function write (key, value) {
    key += ADDON;
    let type = typeof value;
    if (type === 'object') {
        value = JSON.stringify(value);
    } else if (type !== 'string') {
        value = value.toString();
    }
    value = `${type}:${value}`;
    storage.setItem(key, value);
}

function remove (key) {
    key += ADDON;
    storage.removeItem(key);
}

export default {
    read,
    write,
    remove
};
