import {
    Mesh,
} from '../../../src/Three';

import {LineMaterial} from './LineMaterial';
import {LineSegmentsGeometry} from './LineSegmentsGeometry';

export class Wireframe extends Mesh {
    isWireframe: boolean;

    constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial);

    computeLineDistances(): this;
}
