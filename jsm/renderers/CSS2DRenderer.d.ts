import {
    Object3D,
    Scene,
    Camera
} from '../../../src/Three';

export class CSS2DObject extends Object3D {
    element: HTMLElement;

    constructor(element: HTMLElement);
}

export class CSS2DRenderer {
    domElement: HTMLElement;

    constructor();

    getSize(): { width: number, height: number };

    setSize(width: number, height: number): void;

    render(scene: Scene, camera: Camera): void;
}
