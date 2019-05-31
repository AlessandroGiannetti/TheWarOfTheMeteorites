import {
    LoadingManager,
    Scene
} from '../../../src/Three';

export class BabylonLoader {
    manager: LoadingManager;
    path: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (scene: Scene) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    parse(json: object): Scene;

    setPath(value: string): this;
}
