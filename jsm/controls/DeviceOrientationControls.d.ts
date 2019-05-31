import {
    Camera,
    Vector3
} from '../../../src/Three';

export class DeviceOrientationControls {
    object: Camera;
    alphaOffset: number;

    // API
    deviceOrientation: any;
    enabled: boolean;
    screenOrientation: number;
    target: Vector3;

    constructor(object: Camera);

    connect(): void;

    disconnect(): void;

    dispose(): void;

    update(): void;

}
