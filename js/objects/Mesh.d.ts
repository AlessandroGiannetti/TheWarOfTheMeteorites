import {Geometry} from './../core/Geometry';
import {Material} from './../materials/Material';
import {Raycaster} from './../core/Raycaster';
import {Object3D} from './../core/Object3D';
import {BufferGeometry} from '../core/BufferGeometry';
import {Intersection} from '../core/Raycaster';
import {TrianglesDrawModes} from '../constants';

export class Mesh extends Object3D {

    geometry: Geometry | BufferGeometry;
    material: Material | Material[];
    drawMode: TrianglesDrawModes;
    morphTargetInfluences?: number[];
    morphTargetDictionary?: { [key: string]: number };
    isMesh: true;
    type: string;

    constructor(
        geometry?: Geometry | BufferGeometry,
        material?: Material | Material[]
    );

    setDrawMode(drawMode: TrianglesDrawModes): void;

    updateMorphTargets(): void;

    raycast(raycaster: Raycaster, intersects: Intersection[]): void;

    copy(source: this, recursive?: boolean): this;

}
