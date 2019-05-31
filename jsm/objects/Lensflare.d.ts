import {
    Mesh,
    Texture,
    Color
} from '../../../src/Three';

export class LensflareElement {
    texture: Texture;
    size: number;
    distance: number;
    color: Color;

    constructor(texture: Texture, size?: number, distance?: number, color?: Color);
}

export class Lensflare extends Mesh {
    isLensflare: boolean;

    constructor();

    addElement(element: LensflareElement): void;

    dispose(): void;
}
