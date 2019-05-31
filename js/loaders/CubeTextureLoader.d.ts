import {LoadingManager} from './LoadingManager';
import {CubeTexture} from './../textures/CubeTexture';

export class CubeTextureLoader {

    manager: LoadingManager;
    crossOrigin: string;
    path?: string;

    constructor(manager?: LoadingManager);

    load(
        urls: Array<string>,
        onLoad?: (texture: CubeTexture) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
    ): CubeTexture;

    setCrossOrigin(crossOrigin: string): this;

    setPath(path: string): this;

}
