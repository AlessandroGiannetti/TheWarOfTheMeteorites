import {
    Camera,
    Scene,
    Vector2,
    WebGLRenderer
} from '../../../src/Three';

export interface WebGLDeferredRendererParameters {
    antialias?: boolean;
    cacheKeepAlive?: boolean;
    height?: Vector2;
    renderer?: WebGLRenderer;
    width?: Vector2;
}

export class WebGLDeferredRenderer {
    domElement: HTMLElement;
    forwardRendering: boolean;
    renderer: WebGLRenderer;

    constructor(parameters: WebGLDeferredRendererParameters);

    enableLightPrePass(enabled: boolean): void;

    render(scene: Scene, camera: Camera): void;

    setAntialias(enabled: boolean): void;

    setSize(width: number, height: number): void;
}
