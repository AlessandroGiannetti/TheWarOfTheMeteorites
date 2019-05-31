import {
    Mesh,
} from '../../../src/Three';

import {LineMaterial} from './LineMaterial';
import {LineSegmentsGeometry} from './LineSegmentsGeometry';

export class LineSegments2 extends Mesh {
    isLineSegments2: boolean;

    constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial);

    computeLineDistances(): this;
}
