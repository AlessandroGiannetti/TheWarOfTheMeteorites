import {
    Object3D,
    Scene,
    Camera
} from '../../../src/Three';

export class CSS3DObject extends Object3D {
    element: HTMLElement;

    constructor(element: HTMLElement);
}

export class CSS3DSprite extends CSS3DObject {
    constructor(element: HTMLElement);
}

export class CSS3DRenderer {
    domElement: HTMLElement;

    constructor();

    getSize(): { width: number, height: number };

    setSize(width: number, height: number): void;

    render(scene: Scene, camera: Camera): void;
}
