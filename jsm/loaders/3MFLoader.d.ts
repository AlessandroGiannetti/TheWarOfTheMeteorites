import {
    LoadingManager,
    Group
} from '../../../src/Three';

export class ThreeMFLoader {
    manager: LoadingManager;
    path: string;
    availableExtensions: object[];

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (object: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(value: string): this;

    parse(data: ArrayBuffer): Group;

    addExtension(extension: object): void
}
