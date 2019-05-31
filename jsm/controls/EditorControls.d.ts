import {
    Camera,
    EventDispatcher,
    Vector3,
    Object3D
} from '../../../src/Three';

export class EditorControls extends EventDispatcher {
    object: Camera;
    domElement: HTMLElement | HTMLDocument;
    enabled: boolean;
    center: Vector3;
    panSpeed: number;
    zoomSpeed: number;
    rotationSpeed: number;

    constructor(object: Camera, domElement?: HTMLElement);

    focus(target: Object3D): void;

    pan(delta: Vector3): void;

    zoom(delta: Vector3): void;

    rotate(delta: Vector3): void;

    dispose(): void;

}
