import {
    Points,
    LoadingManager
} from '../../../src/Three';


export class PCDLoader {
    manager: LoadingManager;
    littleEndian: boolean;
    path: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (points: Points) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(path: string): this;

    parse(data: ArrayBuffer | string, url: string): Points;
}
