import {
    Scene,
    Camera,
    Material,
    Color
} from '../../../src/Three';

import {Pass} from './Pass';

export class RenderPass extends Pass {
    scene: Scene;
    camera: Camera;
    overrideMaterial: Material;
    clearColor: Color;
    clearAlpha: number;
    clearDepth: boolean;

    constructor(scene: Scene, camera: Camera, overrideMaterial: Material, clearColor: Color, clearAlpha: number);
}
