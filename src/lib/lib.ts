import {IJson} from '../type/type';
import {mapArray, mapJson} from './tool';
import storage from './storage';
import event, {IEventListener} from 'tc-event';

/* 创建一个简单的事件队列
let e = creatEventReady();
e.onEventReady((...args)=>{
    console.log(args);
});
e.eventReady(1,2,3)
*/

interface IEventReadyListener<T> {
    (...args: T[]): void
}

interface IEventReadyOption<T> {
    once?: boolean;
    after?: boolean;
    head?: boolean;
    listener: IEventReadyListener<T>;
}
interface IEventReady<T = any> {
    onEventReady(option: IEventReadyListener<T> | IEventReadyOption<T>, ...args: T[]): IEventReadyListener<T>;
    eventReady(...args: T[]): void;
    removeListener(fn: Function): void;
    isFirstReady(): boolean;
}

export function creatEventReady<T = any> (): IEventReady<T> {
    const queue: {
        listener: IEventReadyListener<T>;
        args: T[];
        once: boolean;
    }[] = [];
    let lastArgs: T[] | null = null;
    let isFirst = true;

    function onEventReady (option: IEventReadyListener<T> | IEventReadyOption<T>, ...args: T[]) {
        let once = false, after = false, head = false;
        let listener: IEventReadyListener<T>;
        if (typeof option === 'object') {
            if (typeof option.once === 'boolean') once = option.once;
            if (typeof option.after === 'boolean') after = option.after;
            if (typeof option.head === 'boolean') head = option.head;
            listener = option.listener;
        } else
            listener = option;
        if (!queue.find(item => item.listener === listener))
            queue[head ? 'unshift' : 'push']({listener, args, once});
        if (lastArgs !== null && !after) {
            if (args.length === 0 && lastArgs) args = lastArgs;
            listener(...args);
            if (once) removeListener(listener);
        }
        return listener;
    }
     
    function eventReady (...args: T[]) {
        lastArgs = args;
        queue.forEach(item => {
            item.listener(...((args.length === 0) ? item.args : args));
            if (item.once) removeListener(item.listener);
        });
        isFirst = false;
    }

    function removeListener (listener: IEventReadyListener<T>) {
        const result = queue.find(item => item.listener === listener);
        if (result) queue.splice(queue.indexOf(result), 1);
    }

    return {
        onEventReady,
        eventReady,
        removeListener,
        isFirstReady: () => isFirst
    };
}

export const Event = (() => {
    let map: IJson<IEventReady<any>> = {};
    return {
        regist<T = any> (name: string, option: IEventReadyListener<T> | IEventReadyOption<T>) {
            if (!map[name]) map[name] = creatEventReady<T>();
            return map[name].onEventReady(option);
        },
        emit (name: string, data?: any) {
            if (!map[name]) return false;
            map[name].eventReady(data);
            return true;
        },
        removeListener<T = any> (name: string, listener: IEventReadyListener<T>) {
            if (!map[name]) return;
            map[name].removeListener(listener);
        },
        removeEvent (name: string) {delete map[name];},
        clear () {map = {};},
        isFirstEmit (name: string) {
            if (!map[name]) return true;
            return map[name].isFirstReady();
        }
    };
})();


/* 创建一个 动画 ... 的 dom
let dot = createDotAnimation({$});
dot.start();
dot.stop();
dot.hide();

$ 要传入 easy-dom
*/
export function createDotAnimation ({
    time = 400,
    length = 3,
    sign = '.',
    autoStart = false,
} = {}) {
    let dots = '';
    let interval: any = null;
    const el = document.createElement('span');
    el.className = 'dot-ani';
    el.style.position = 'absolute';

    function stop () {
        clearInterval(interval);
        interval = null;
    }

    function hide () {
        stop();
        el.style.display = 'none';
    }

    function start () {
        if (interval !== null) {return;}
        interval = setInterval(() => {
            if (dots.length < length) {
                dots += sign;
            } else {
                dots = '';
            }
            el.innerText = dots;
        }, time);
    }
    if (autoStart) {start();}
    return {el, stop, hide, start};
}

/* 简易的状态管理

// 目前仅支持简单json，即值都是值类型
let state = createState({
    a: 1,
    b: 'b',
})
state.onChange('a', (newValue, oldValue)=>{
    console.log(newValue, oldValue);
})
state.get('a');
state.set('a', 2);
state.trigger('a'); // 主动触发一次 属性 change
*/
export function createState (state: IJson) {
    if (typeof state !== 'object') return;
    const calls: IJson<IEventReady> = {};
    for (const k in state) {
        calls[k] = creatEventReady();
    }
    function checkNecessary (name: string) {
        if (typeof state[name] === 'undefined') {
            console.warn(`不存在的属性:${name}`);
            return false;
        };
        return true;
    }
    function get (name: string) {
        return state[name];
    }
    function set (name: string | object, value?: any) {
        mapJson(name, value, (name: string, value: any) => {
            if (!checkNecessary(name) || value === state[name]) {return;}
            calls[name].eventReady(value, state[name]);
            state[name] = value;
        });
    }
    function onChange (name: string | object, fn: Function) {
        mapJson(name, fn, (name: string, fn: (...args: any[])=>void) => {
            if (!checkNecessary(name)) {return;}
            calls[name].onEventReady(fn);
        });
    }

    function trigger (...name: string[]) {
        mapArray(name, (name: string) => {
            if (!checkNecessary(name)) {return;}
            calls[name].eventReady(state[name], state[name]);
        });
    }

    return {get, set, onChange, trigger};
}

export function createStatus ({
    def,
    name,
    emit
}: {
    def: any,
    name: string,
    emit: string
}) {
    return {
        _value: null,
        get (store?: boolean) {
            if (store === true) {
                return storage.read(name);
            }
            if (this._value === null) {
                const v = storage.read(name);
                this._value = v === null ? def : v;
            }
            return this._value;
        },
        set (value: any, save = true, emitThis = true) {
            this.stash(value, false);
            if (save) {
                this.save();
            }
            this.emit(emitThis);
        },
        emit (emitThis = true) {
            if (emit && emitThis)
                event.emit(emit, this._value);
        },
        stash (value: any, emitThis = true) {
            this._value = value;
            this.emit(emitThis);
        },
        listen (listener: IEventListener, once: boolean = false) {
            event.regist(emit, {
                immediate: false,
                once,
                listener
            });
        },
        save () {
            storage.write(name, this._value);
        },
        init (value: any, save = false) {
            this.set(value || this.get(), save);
        }
    };
}