import {
    Group,
    LoadingManager
} from '../../../src/Three';

export class FBXLoader {
    manager: LoadingManager;
    crossOrigin: string;
    path: string;
    resourcePath: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (object: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(path: string): this;

    setResourcePath(path: string): this;

    setCrossOrigin(value: string): this;

    parse(FBXBuffer: ArrayBuffer | string, path: string): Group;
}
