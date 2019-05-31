import {
    LoadingManager,
    Group
} from '../../../src/Three';

export class PlayCanvasLoader {
    manager: LoadingManager;
    path: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (group: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    parse(json: object): Group;

    setPath(value: string): this;
}
