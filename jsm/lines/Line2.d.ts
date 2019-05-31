import {LineGeometry} from './LineGeometry';
import {LineSegments2} from './LineSegments2';
import {LineMaterial} from './LineMaterial';

export class Line2 extends LineSegments2 {
    isLine2: boolean;

    constructor(geometry?: LineGeometry, material?: LineMaterial);
}
