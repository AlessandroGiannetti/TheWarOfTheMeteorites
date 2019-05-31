import {PerspectiveCamera} from './PerspectiveCamera';

export class ArrayCamera extends PerspectiveCamera {

    cameras: PerspectiveCamera[];
    isArrayCamera: true;

    constructor(cameras?: PerspectiveCamera[]);

}
