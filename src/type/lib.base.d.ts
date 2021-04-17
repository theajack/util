import {IJson} from './type';
import {IEventListener} from 'tc-event';

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

export function creatEventReady(): IEventReady;

/* 创建一个 动画 ... 的 dom
let dot = createDotAnimation({$});
dot.start();
dot.stop();
dot.hide();

$ 要传入 easy-dom
*/
export function createDotAnimation(options: {
    time?: number;
    length?: number;
    sign?: string;
    autoStart?: boolean;
}): {
    el: HTMLSpanElement;
    stop: () => void;
    hide: () => void;
    start: () => void;
};

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
export function createState(state: IJson): {
    get: (name: string) => any;
    set: (name: string | object, value?: any) => void;
    onChange: (name: string | object, fn: Function) => void;
    trigger: (...name: string[]) => void;
};

export function createStatus(options: {
    def: any;
    name: string;
    emit: string;
}): {
    _value: any;
    get(storage?: boolean): any;
    set(value: any, save?: boolean, emitThis?: boolean): void;
    emit(emitThis?: boolean): void;
    stash(value: any, emitThis?: boolean): void;
    listen(listener: IEventListener, once?: boolean): void;
    save(): void;
    init(value: any, save?: boolean): void;
}