/* 创建一个简单的事件队列
let e = creatEventReady();
e.onEventReady((...args)=>{
    console.log(args);
});
e.eventReady(1,2,3)
*/
export function creatEventReady () {

    let queue = [];
    let lastArgs = null;

    function onEventReady (fn, ...args) {
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
    
    function eventReady (...args) {
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

$ 要传入 tacl-ui
*/
export function createDotAnimation ({
    time = 400,
    length = 3,
    sign = '.',
    autoStart = false,
    $
} = {}) {
    if (!$) {
        throw new Error('请传入 $');
    }
    let dots = '';
    let interval = null;
    let el = $.create('span').addClass('dot-ani', false).style('position', 'absolute').created(() => {
        if (autoStart) {start();}
    });
    function stop () {
        clearInterval(interval);
        interval = null;
    }

    function hide () {
        stop();
        el.hide();
    }

    function start () {
        if (interval !== null) {return;}
        interval = setInterval(() => {
            if (dots.length < length) {
                dots += sign;
            } else {
                dots = '';
            }
            el.text(dots);
        }, time);
    }
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
export function createState (state) {
    if (typeof state !== 'object') return;
    let calls = {};
    for (let k in state) {
        calls[k] = creatEventReady();
    }
    function checkNecessary (name) {
        if (typeof state[name] === 'undefined') {
            console.warn(`不存在的属性:${name}`);
            return false;
        };
        return true;
    }
    function get (name) {
        return state[name];
    }
    function set (name, value) {
        mapJson(name, value, (name, value) => {
            if (!checkNecessary(name) || value === state[name]) {return;}
            calls[name].eventReady(value, state[name]);
            state[name] = value;
        });
    }
    function onChange (name, fn) {
        mapJson(name, fn, (name, fn) => {
            if (!checkNecessary(name)) {return;}
            calls[name].onEventReady(fn);
        });
    }

    function trigger (...name) {
        mapArray(name, (name) => {
            if (!checkNecessary(name)) {return;}
            calls[name].eventReady(state[name], state[name]);
        });
    }

    return {get, set, onChange, trigger};
}

export function mapArray (value, fn) {
    if (value instanceof Array) {
        value.forEach(v => {
            fn(v);
        });
    } else {
        fn(value);
    }
}
export function mapJson (key, value, fn) {
    if (typeof key === 'object') {
        for (let k in key) {
            fn(k, key[k]);
        }
    } else {
        fn(key, value);
    }
}