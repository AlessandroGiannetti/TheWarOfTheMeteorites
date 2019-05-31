import {
    AnimationClip,
    Camera,
    LoadingManager,
    Scene
} from '../../../src/Three';

export interface GLTF {
    animations: AnimationClip[];
    scene: Scene;
    scenes: Scene[];
    cameras: Camera[];
    asset: object;
}

export class GLTFLoader {
    manager: LoadingManager;
    path: string;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (gltf: GLTF) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(path: string): GLTFLoader;

    setResourcePath(path: string): GLTFLoader;

    setCrossOrigin(value: string): GLTFLoader;

    setDRACOLoader(dracoLoader: object): GLTFLoader;

    parse(data: ArrayBuffer | string, path: string, onLoad: (gltf: GLTF) => void, onError?: (event: ErrorEvent) => void): void;
}
