
let isUndf = (v) => typeof v === 'undefined';
let isObject = (v) => typeof v === 'object';

let events = {}; // 事件回调函数字典
let EVENT = {}; // 事件名称字典

export function checkEvent (name) {
    if (events[name]) {
        return true;
    } else {
        return false;
    }
}

// 初始化一个事件

function init (name) {
    if (isUndf(EVENT[name])) {
        events[name] = new _event(name);
        EVENT[name] = name;
    }
}

// 注册某个事件的一个或多个回调

function regist (name, listener) {
    // json 格式传入可以注册个事件
    if (isObject(name)) {
        let result = {};
        for (let key in name) {
            result[key] = regist(key, name[key]);
        }
        return result;
    }
    if (typeof listener === 'function') {
        return registBase({name, listener});
    } else if (typeof listener === 'object') {
        return registBase({name, ...listener});
    } else {
        console.warn('错误的listener', name, listener);
        return null;
    }
}

function registBase ({
    once = false, // 只触发一次
    all = true, // 始终起作用
    name,
    listener,
    index,
    indexBefore,
}) {
    if (!checkEvent(name)) {
        init(name);
    }
    return events[name].regist({listener, once, all, index, indexBefore});
}

// 移除事件回调
function remove (name, listener) {
    if (!checkEvent(name)) {
        console.warn('removeEvent:未找到事件 ' + name);
        return false;
    }
    if (isUndf(listener)) {
        console.error('请传入要移除的listener 或 id');
        return false;
    } else {// 移除单个监听
        return events[name].remove(listener);
    }
}
// 移除单个事件或是所有
function clear (name) {
    if (typeof name === 'string') {
        if (events[name]) {
            events[name].clear();
            delete events[name];
        }
    } else if (name instanceof Array) {
        name.forEach(n => {
            clear(n);
        });
    } else {
        events = {};
    }
}

// 触发事件
function emit (name, data) {
    // 此处是为了 all 参数，当没有regist之前emit了，all的listener也能被触发
    if (!checkEvent(name)) {
        init(name);
    }
    events[name].emit(data);
}

function index (name) {
    if (checkEvent(name)) {
        return events[name].index;
    } else {
        // console.warn('错误的事件：' + name);
        return -1;
    }
}

function findPos (array, index, indexBefore) {
    let n = array.length;
    if (n === 0) {return 0;}
    return bsearch(array, 0, n - 1, index, indexBefore);
}

function bsearch (array, low, high, index, indexBefore) {
    let mid = Math.floor((low + high) / 2);
    if (low > high) return mid + 1;
    if (array[mid].index > index) {
        return bsearch(array, low, mid - 1, index, indexBefore);
    } else if (array[mid].index < index) {
        return bsearch(array, mid + 1, high, index, indexBefore);
    } else {
        if (indexBefore) {
            if (mid === 0 || array[mid - 1].index < index) {return mid;};
            return bsearch(array, low, mid - 1, index, indexBefore);
        } else {
            if (mid === array.length - 1 || array[mid + 1].index > index) {return mid + 1;};
            return bsearch(array, mid + 1, high, index, indexBefore);
        }
    }
}

// 事件类
class _event {
    constructor (name) {
        // 对于ready之类的事件 增加一个如果已经触发了就马上执行的逻辑
        this.triggerData = undefined;
        this.hasTrigger = false;
        this.name = name;
        this.id = 0;
        this.index = 0;
        this.listeners = [];
    }
    regist ({listener, once = false, all = true, index, indexBefore = false}) {
        if (typeof index !== 'number') {
            index = ++ this.index;
        }
        let n = this.listeners.length;
        let item = {listener, once, all, hasTrigger: false, index, id: ++this.id};
        if (n === 0 || index > this.listeners[n - 1].index) {
            this.listeners.push(item);
        } else {
            let pos = findPos(this.listeners, index, indexBefore);
            this.listeners.splice(pos, 0, item);
        }
        if (all && this.hasTrigger) {
            if (once) {item.hasTrigger = true;}
            listener(this.triggerData);
        }
        return item;
    }
    emit (data) {
        if (!this.hasTrigger) {this.hasTrigger = true;}
        this.triggerData = data;
        for (let i = 0; i < this.listeners.length; i++) {
            let item = this.listeners[i];
            if (item && (!item.once || !item.hasTrigger)) {
                item.hasTrigger = true;
                item.listener(data);
            }
        }
    }
    remove (cond) {
        let attr = '';
        let type = typeof cond;
        if (type === 'number') {
            attr = 'id';
        } else if (type === 'function') {
            attr = 'listener';
        } else {
            console.warn('removeEvent 传入的参数有误');
            return false;
        }
        let result = this.listeners.find(item => {
            return item && item[attr] === cond;
        });
        if (!result) {
            console.warn('removeEvent:未找到监听函数 ' + this.name);
            return false;
        }
        let index = this.listeners.indexOf(result);
        this.listeners[index] = undefined;
        return true;
    }
    clear () {
        this.listeners = [];
        return true;
    }
}

const event = {
    EVENT, // 事件枚举
    // init, // 初始化一个事件（注册一个发布者） // 初始化与注册和到一起
    emit, // 触发事件
    regist, // 注册一个监听者
    checkEvent, // 检查是否存在事件
    remove,
    clear,
    index,
};

export default event;


// function test () {
//     event.emit('aa');
//     event.regist('aa', () => {
//         console.log('1');
//     });
//     window.item = event.regist('aa', () => {
//         console.log('2');
//     });
//     event.regist('aa', {
//         index: 0, listener () {console.log('i0');}, once: true
//     });
//     event.regist('aa', {
//         index: 2, listener () {console.log('2a');}, all: true
//     });
//     event.regist('aa', {
//         index: 2, listener () {console.log('2b');}, indexBefore: true
//     });
//     event.regist('aa', {
//         listener () {console.log('3');}, once: true, all: true
//     });
//     event.regist('aa', {
//         listener () {console.log('1000');}, index: 1000
//     });
//     event.regist('aa', {
//         listener () {console.log('4');}
//     });
//     event.regist('aa', {
//         index: 0, listener () {console.log('ib0');}, indexBefore: true
//     });
//     event.regist('aa', {
//         index: 0, listener () {console.log('ibb0');}, indexBefore: true
//     });
// }
// window.test = test;
// window.ev = event;