import {COMPARE_RESULT, VERSION} from './constant';
import {isArray, isJsonOrArray, isNull, isObject, isString, isUndf} from './is';
import {keys} from './polyfill';
import {IJson, ISize} from '../type/type';

export function getUrlParam (name: string, defVal?: string) {
    return parseUrlParam(window.location.search, name, defVal);
}

export function parseUrlParam (search: string, name: string, defVal?: string) {
    if (!isUndf(name)) {
        if (search !== '') {
            const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            const r = search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
        }
        return (!isUndf(defVal)) ? defVal : null;
    }
    if (search === '') { return {}; }
    const arr = search.substr(1).split('&');
    const param: IJson = {};
    arr.forEach(item => {
        const pArr = item.split('=');
        param[pArr[0]] = pArr[1];
    });
    return param;
}

export function copy (str: string) {
    let input = document.getElementById('_copy_input_') as HTMLInputElement;
    if (!input) {
        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute(
            'style',
            'height:10px;position:fixed;top:-100px;opacity:0;'
        );
        input.setAttribute('id', '_copy_input_');
        document.body.appendChild(input);
    }
    input.value = str;
    input.select();

    try {
        if (document.execCommand('Copy')) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

export function type (obj: any) {
    let type: string = typeof obj;
    if (type == 'object') {
        if (obj === null) {
            return 'null';
        } else {
            const con = obj.constructor;
            switch (con) {
                case Object:type = 'json'; break;
                case Array:type = 'array'; break;
                case HTMLCollection:type = 'htmlcollection'; break;
                case NodeList:type = 'nodelist'; break;
                case FormData:type = 'formdata'; break;
                case Error:type = 'error'; break;
                case Date:type = 'date'; break;
                default:if (obj.nodeType === 1 && isString(obj.nodeName)) {
                    type = 'htmlelement';
                } else {
                    type = 'object';
                };break;
            }
        }
    }
    return type;
};

export function random (a: number, b: number) {
    return (a + Math.round(Math.random() * (b - a)));
};

export const download = (() => {
    let downloadLink: HTMLElement | null = null;
    return (str: string, filename = 'tc-util-file', type = 'text/plain') => {
        if (!downloadLink) {
            downloadLink = document.createElement('a') as HTMLElement;
            downloadLink.setAttribute('style', 'position: fixed;top: -100px');
            document.body.appendChild(downloadLink);
        }
        downloadLink.setAttribute('download', filename);
        const blob = new Blob([str], {type: type});
        const url = URL.createObjectURL(blob);
        (downloadLink as HTMLLinkElement).href = url;
        downloadLink.click();
    };
})();

export function execute ({
    code = '',
    onload,
    onerror,
    ontimeout,
    timeout = 6000
}: {
    code: string;
    onload?: Function;
    onerror?: Function;
    ontimeout?: Function;
    timeout?: number;
}) {
    if (code.trim() === '') {
        console.warn('execute code 参数不可为空');
        return;
    }
    const blob = new Blob([code], {type: 'application/text'});
    const objectURL = window.URL.createObjectURL(blob);
    const script = document.createElement('script');
    let timer: any = null;
    if (ontimeout) {
        timer = setTimeout(() => {
            ontimeout();
            document.body.removeChild(script);
        }, timeout);
    }
    script.onload = function () {
        if (onload) {
            onload();
        }
        clearTimeout(timer);
        document.body.removeChild(script);
    };
    script.onerror = function (err) {
        if (onerror) {
            onerror(err);
        }
        clearTimeout(timer);
        document.body.removeChild(script);
    };
    document.body.appendChild(script);
    script.src = objectURL;
}

export function importScript (
    src: string,
    onload?: Function
) {
    const script = document.createElement('script');
    script.src = src;
    if (onload) {
        script.onload = function () {
            onload();
        };
    }
    document.body.appendChild(script);
}

export const readFile = (() => {
    let fileInput: HTMLInputElement | null = null;
    return (
        success: (result: string | ArrayBuffer | null) => void,
        accept?: string
    ) => {
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('style', 'position: fixed;top: -100px');
            document.body.appendChild(fileInput);
        }
        if (accept) {
            fileInput.setAttribute('accept', accept);
        }
        fileInput.onchange = function () {
            const files = (this as HTMLInputElement).files;
            if (!files) {
                return;
            }
            const file = files[0];
            if (isUndf(FileReader)) {
                alert('你的浏览器暂不支持该功能');
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                success(this.result);
            };
        };
        fileInput.click();
    };
})();

export function mapArray (
    value: any[],
    fn: (v: any) => void
) {
    if (value instanceof Array) {
        value.forEach(v => {
            fn(v);
        });
    } else {
        fn(value);
    }
}
export function mapJson (
    key: IJson | string,
    value: any,
    fn: (key: string, value: any)=>void
) {
    if (typeof key === 'object') {
        for (const k in key) {
            fn(k, key[k]);
        }
    } else {
        fn(key, value);
    }
}

export function parseJSON (data: any) {
    if (isObject(data)) {return data;}
    try {
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
}


export function pick ({
    target,
    data,
    attr,
    deep = false,
    ignoreUndf = false,
    forceSync = false,
}: {
    target?: IJson | Array<any>;
    data: IJson | Array<any>;
    attr?: string[];
    deep?: boolean;
    ignoreUndf?: boolean;
    forceSync?: boolean;
}) {
    if (!isObject(target) || isNull(target)) {
        target = isArray(data) ? [] : {};
    }
    if (isUndf(attr)) {
        attr = keys(data);
    }
    (attr as string[]).forEach(key => {
        let value, name = key;
        if (key.indexOf(':') !== -1) { // 新属性
            const arr = key.split(':');
            name = arr[0];
            value = arr[1] as string; // 旧属性或值
            const result = getValue(data, value);
            if (isUndf(result)) {
                value = (value.indexOf('number.') !== -1) ? parseFloat(value.substr(7)) : value;
            } else {
                value = result;
            }
        } else {
            value = getValue(data, key);
        }
        const targetValue = getValue(target, name);
        if (isJsonOrArray(value) && !isNull(value) && deep === true) {
            if (!isNull(targetValue) && isJsonOrArray(targetValue)) {
                if (forceSync) {
                    removeRedundantAttrInObject(targetValue, value, ignoreUndf);
                }
                setValue(target, name, pick({target: targetValue, data: value, deep: true, ignoreUndf, forceSync}));
            } else {
                setValue(target, name, pick({data: value, deep: true, ignoreUndf, forceSync}));
            }
        } else {
            if (!ignoreUndf || !isUndf(value)) {
                setValue(target, name, value);
            }
        }
    });
    return target;
}

function getValue (
    data: IJson | Array<any> | undefined,
    key: string
) {
    if (isArray(data)) {
        return (data as Array<any>)[parseInt(key)];
    }
    return (data as IJson)[key];
}
function setValue (
    data: IJson | Array<any> | undefined,
    key: string,
    value: any
) {
    if (isArray(data)) {
        (data as Array<any>)[parseInt(key)] = value;
    } else {
        (data as IJson)[key] = value;
    }
}

export function pickAttr (
    data: IJson | Array<any>,
    attr?: string[],
    deep?: boolean
) {
    return pick({data, attr, deep});
}

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
) {
    return pick({target, data, attr, deep});
}

export function removeRedundantAttrInObject (
    target: IJson | Array<any>,
    source: IJson | Array<any>,
    ignoreUndf: boolean = false
) {
    if (isArray(target)) {
        const targetArr = target as Array<any>;
        const sourceArr = source as Array<any>;
        if (targetArr.length > sourceArr.length) {
            targetArr.splice(sourceArr.length, targetArr.length - sourceArr.length);
        }
    } else if (isObject(target)) {
        for (const key in target) {
            const isRedundant = ignoreUndf ? isUndf((source as IJson)[key]) : (!source.hasOwnProperty(key));
            if (isRedundant) {
                delete (target as IJson)[key];
            }
        }
    }
}

/**
 * 获取canvas浏览器指纹
 */
export function getCanvasFingerPrint (domain = 'tc-util') {
    const bin2hex = (s: string) => {
        let o = '', n: string;
        s += '';
        for (let i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i).toString(16);
            o += n.length < 2 ? '0' + n : n;
        }
        return o;
    };
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return '';
    }
    const txt = domain;
    ctx.textBaseline = 'top';
    ctx.font = '14px \'Arial\'';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);
  
    const b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
    const bin = atob(b64);
    const crc = bin2hex(bin.slice(-16, -12));
    return crc;
}

export function boolPipe (funcs: (boolean | (()=>boolean))[]) {
    for (let i = 0; i < funcs.length; i++) {
        const type = typeof funcs[i];
        if (type === 'function' && (funcs[i] as Function)() === false) {
            return false;
        }
        if (type === 'boolean' && funcs[i] === false) {
            return false;
        }
    }
    return true;
}

// 节流函数
export function throttle (func: Function, delay = 100) {
    let previous = 0;
    return function (this: any) {
        const context = this;
        const curr = Date.now();
        // 如果时间间隔超过delay时间，则执行回调
        if (curr - previous >= delay) {
            previous = curr; // 更新previous
            func.apply(context, arguments);
        }
    };
};

export function countImgSize (src: string): Promise<ISize> {
    return new Promise(resolve => {
        const img = document.createElement('img');
        img.style.opacity = '0';
        document.body.appendChild(img);
        img.onload = () => {
            resolve({
                width: img.offsetWidth,
                height: img.offsetHeight
            });
            document.body.removeChild(img);
        };
        img.src = src;
    });
}

export function compareVersion (v1 = 'default', v2 = 'default') {
    if (v1 === v2) {return COMPARE_RESULT.EVEN;}
    if (v1 === VERSION.LATEST || v2 === VERSION.DEFAULT) {return COMPARE_RESULT.MORE;}
    if (v2 === VERSION.LATEST || v1 === VERSION.DEFAULT) {return COMPARE_RESULT.LESS;}
    
    const v1Numbers = versionToArray(v1);
    const v2Numbers = versionToArray(v2);

    for (let i = 0; i < v1Numbers.length; i++) {
        if (v1Numbers[i] > v2Numbers[i]) {
            return COMPARE_RESULT.MORE;
        } else if (v1Numbers[i] < v2Numbers[i]) {
            return COMPARE_RESULT.LESS;
        }
    }

    return COMPARE_RESULT.EVEN;
}

export function versionToArray (version: string) {
    const arr = version.split('.').map(item => parseInt(item));
    const result = [0, 0, 0];
    for (let i = 0; i < result.length; i++) {
        const n = arr[i];
        if (typeof n === 'number' && !Number.isNaN(n)) {
            result[i] = n;
        }
    }
    return result;
}