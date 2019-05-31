import {
    LoadingManager,
    Group
} from '../../../src/Three';

export class AMFLoader {
    manager: LoadingManager;
    path: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (object: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(value: string): this;

    parse(data: ArrayBuffer): Group;
}
