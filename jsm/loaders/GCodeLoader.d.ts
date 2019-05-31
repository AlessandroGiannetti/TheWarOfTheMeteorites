import {
    Group,
    LoadingManager
} from '../../../src/Three';

export class GCodeLoader {
    manager: LoadingManager;
    path: string;
    splitLayer: boolean;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (object: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(path: string): this;

    parse(data: string): Group;
}
