import {IJson} from '../type/type';
import {mapArray, mapJson} from './util';

/* 创建一个简单的事件队列
let e = creatEventReady();
e.onEventReady((...args)=>{
    console.log(args);
});
e.eventReady(1,2,3)
*/

interface IEventReady {
    onEventReady(fn: Function, ...args: any[]): void;
    eventReady(...args: any[]): void;
}

export function creatEventReady (): IEventReady {

    const queue: {
        fn: Function;
        args: any;
    }[] = [];
    let lastArgs: any = null;

    function onEventReady (fn: Function, ...args: any[]) {
        if (!queue.find(item => item.fn === fn)) {
            queue.push({fn, args});
        }
        if (lastArgs !== null) {
            if (args.length === 0 && lastArgs) {
                args = lastArgs;
            }
            fn(...args);
        }
    }
     
    function eventReady (...args: any[]) {
        lastArgs = args;
        queue.forEach(item => {
            item.fn(...((args.length === 0) ? item.args : args));
        });
        // queue = null;
    }

    return {
        onEventReady,
        eventReady
    };
}

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
        mapJson(name, fn, (name: string, fn: Function) => {
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