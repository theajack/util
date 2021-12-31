import {IJson} from './type';

export interface IStorage {
    (key: string | IJson, value?: any): any;
    useLocalStorage(): void;
    useSessionStorage(): void;
    geneKey(key: string): string;
    parseKey(key: string): string;
    parseValue(value: string): any;
    write(key: string, value: any): void;
    read(key: string): any;
    readAll(): IJson;
    remove(key: string): void;
    clear(): void;
}

declare const storage: IStorage;
export default storage;