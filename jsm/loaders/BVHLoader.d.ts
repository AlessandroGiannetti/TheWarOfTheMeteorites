import {
    AnimationClip,
    Skeleton,
    LoadingManager
} from '../../../src/Three';


export interface BVH {
    clip: AnimationClip;
    skeleton: Skeleton;
}

export class BVHLoader {
    manager: LoadingManager;
    path: string;
    animateBonePositions: boolean;
    animateBoneRotations: boolean;

    constructor(manager?: LoadingManager);

    load(url: string, onLoad: (bvh: BVH) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    setPath(path: string): this;

    parse(text: string): BVH;
}
