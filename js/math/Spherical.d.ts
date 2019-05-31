import {Vector3} from './Vector3';

export class Spherical {

    radius: number;
    phi: number;
    theta: number;

    constructor(radius?: number, phi?: number, theta?: number);

    set(radius: number, phi: number, theta: number): Spherical;

    clone(): this;

    copy(other: Spherical): this;

    makeSafe(): void;

    setFromVector3(vec3: Vector3): Spherical;

}
