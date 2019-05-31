import {
    Camera,
    EventDispatcher,
    Object3D
} from '../../../src/Three';

export class DragControls extends EventDispatcher {
    object: Camera;
    enabled: boolean;

    // API

    constructor(objects: Object3D[], camera: Camera, domElement?: HTMLElement);

    activate(): void;

    deactivate(): void;

    dispose(): void;

}
