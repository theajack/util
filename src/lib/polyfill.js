

function createFakeStorage () {
    return { // 简易临时的localStorage polyfill
        _data: {},
        getItem (k) {
            if (typeof this._data[k] === 'undefined') {
                return null;
            }
            return this._data[k];
        },
        setItem (k, v) {
            this._data[k] = v;
        },
        removeItem (k) {
            delete this._data[k];
        }
    };
}

function initPolyFill () {
    if (!window.localStorage) window.localStorage = createFakeStorage();
    if (!window.sessionStorage) window.sessionStorage = createFakeStorage();
    if (!Object.assign) {
        Object.assign = (target, ...sources) => {
            sources.forEach(source => {
                for (const k in source) {
                    target[k] = source[k];
                }
            });
            return target;
        };
    }
    if (!Object.keys) {
        Object.keys = (json) => {
            const arr = [];
            for (const key in json)
                arr.push(key);
            return arr;
        };
    }
    if (!Object.values) {
        Object.values = (json) => {
            const arr = [];
            for (const key in json)
                arr.push(json[key]);
            return arr;
        };
    }
}

initPolyFill();