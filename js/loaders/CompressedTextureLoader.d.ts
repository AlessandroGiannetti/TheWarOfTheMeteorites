import {LoadingManager} from './LoadingManager';
import {CompressedTexture} from './../textures/CompressedTexture';

/**
 * @deprecated since 0.84.0. Use {@link DataTextureLoader} (renamed)
 */

export class CompressedTextureLoader {

    manager: LoadingManager;
    path: string;

    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad: (texture: CompressedTexture) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
    ): void;

    setPath(path: string): CompressedTextureLoader;

}
