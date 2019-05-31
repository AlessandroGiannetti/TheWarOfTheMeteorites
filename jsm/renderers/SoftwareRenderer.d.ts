import {
    Color,
    Scene,
    Camera
} from '../../../src/Three';

export class SoftwareRenderer {
    domElement: HTMLElement;
    autoClear: boolean;

    constructor();

    setClearColor(color: Color, alpha: number): void;

    setPixelRatio(): void;

    setSize(width: number, height: number): void;

    clear(): void;

    render(scene: Scene, camera: Camera): void;
}
