import {LoadingManager} from './LoadingManager';
import {DataTexture} from './../textures/DataTexture';

export class DataTextureLoader {

    manager: LoadingManager;

    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (dataTexture: DataTexture) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
    ): void;

}
