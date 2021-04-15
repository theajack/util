
import {read, write} from './storage';
import event, {IEventListener} from 'tc-event';

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
        get (storage?: boolean) {
            if (storage === true) {
                return read(name);
            }
            if (this._value === null) {
                const v = read(name);
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
            write(name, this._value);
        },
        init (value: any, save = false) {
            this.set(value || this.get(), save);
        }
    };
}

// export const theme = createStatus({
//     def: 1,
//     name: 'xxx',
//     emit: 'example'
// });
