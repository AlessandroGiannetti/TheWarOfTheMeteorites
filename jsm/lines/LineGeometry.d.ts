import {
    Line
} from '../../../src/Three';

import {LineSegmentsGeometry} from './LineSegmentsGeometry';

export class LineGeometry extends LineSegmentsGeometry {
    isLineGeometry: boolean;

    constructor();

    fromLine(line: Line): this;
}
