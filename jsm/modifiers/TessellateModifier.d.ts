import {
    Geometry
} from '../../../src/Three';

export class SubdivisionModifier {
    maxEdgeLength: number;

    constructor(maxEdgeLength: number);

    modify(geometry: Geometry): void;
}
