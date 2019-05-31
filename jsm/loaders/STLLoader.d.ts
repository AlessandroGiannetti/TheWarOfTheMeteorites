import {
    BufferGeometry,
    LoadingManager
} from '../../../src/Three';


export class STLLoader {
    manager: LoadingManager;
    path: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (geometry: BufferGeometry) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(path: string): this;

    parse(data: ArrayBuffer | string): BufferGeometry;
}
