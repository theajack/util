interface EventItem {
    listener: (data?: any)=>void;
    all: boolean;
    once: boolean;
    index: number;
    hasTrigger: boolean;
    id: number;
}

interface EventRegistOption {
    listener: (data?: any)=>void;
    all?: boolean;
    once?: boolean;
    index?: number;
    indexBefore?: boolean;
}

export default interface EventStatic {
    EVENT: object;
    emit(name: string, data?: any): void;
    regist(name: string, listener:(data?: any)=>void): EventItem;
    regist(name: string, options: EventRegistOption): EventItem;
    regist(obj: {
        [prop: string]: EventRegistOption
    }): {
        [prop: string]: EventItem
    };
    index(name: string): number;
    checkEvent(name: string): boolean;
    remove(name: string, cond: Function | number): boolean;
    clear(name?: string | Array<string>): void;
}