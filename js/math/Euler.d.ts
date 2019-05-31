import {Matrix4} from './Matrix4';
import {Quaternion} from './Quaternion';
import {Vector3} from './Vector3';

export namespace ColorKeywords {
    export const aliceblue: number;
    export const antiquewhite: number;
    export const aqua: number;
    export const aquamarine: number;
    export const azure: number;
    export const beige: number;
    export const bisque: number;
    export const black: number;
    export const blanchedalmond: number;
    export const blue: number;
    export const blueviolet: number;
    export const brown: number;
    export const burlywood: number;
    export const cadetblue: number;
    export const chartreuse: number;
    export const chocolate: number;
    export const coral: number;
    export const cornflowerblue: number;
    export const cornsilk: number;
    export const crimson: number;
    export const cyan: number;
    export const darkblue: number;
    export const darkcyan: number;
    export const darkgoldenrod: number;
    export const darkgray: number;
    export const darkgreen: number;
    export const darkgrey: number;
    export const darkkhaki: number;
    export const darkmagenta: number;
    export const darkolivegreen: number;
    export const darkorange: number;
    export const darkorchid: number;
    export const darkred: number;
    export const darksalmon: number;
    export const darkseagreen: number;
    export const darkslateblue: number;
    export const darkslategray: number;
    export const darkslategrey: number;
    export const darkturquoise: number;
    export const darkviolet: number;
    export const deeppink: number;
    export const deepskyblue: number;
    export const dimgray: number;
    export const dimgrey: number;
    export const dodgerblue: number;
    export const firebrick: number;
    export const floralwhite: number;
    export const forestgreen: number;
    export const fuchsia: number;
    export const gainsboro: number;
    export const ghostwhite: number;
    export const gold: number;
    export const goldenrod: number;
    export const gray: number;
    export const green: number;
    export const greenyellow: number;
    export const grey: number;
    export const honeydew: number;
    export const hotpink: number;
    export const indianred: number;
    export const indigo: number;
    export const ivory: number;
    export const khaki: number;
    export const lavender: number;
    export const lavenderblush: number;
    export const lawngreen: number;
    export const lemonchiffon: number;
    export const lightblue: number;
    export const lightcoral: number;
    export const lightcyan: number;
    export const lightgoldenrodyellow: number;
    export const lightgray: number;
    export const lightgreen: number;
    export const lightgrey: number;
    export const lightpink: number;
    export const lightsalmon: number;
    export const lightseagreen: number;
    export const lightskyblue: number;
    export const lightslategray: number;
    export const lightslategrey: number;
    export const lightsteelblue: number;
    export const lightyellow: number;
    export const lime: number;
    export const limegreen: number;
    export const linen: number;
    export const magenta: number;
    export const maroon: number;
    export const mediumaquamarine: number;
    export const mediumblue: number;
    export const mediumorchid: number;
    export const mediumpurple: number;
    export const mediumseagreen: number;
    export const mediumslateblue: number;
    export const mediumspringgreen: number;
    export const mediumturquoise: number;
    export const mediumvioletred: number;
    export const midnightblue: number;
    export const mintcream: number;
    export const mistyrose: number;
    export const moccasin: number;
    export const navajowhite: number;
    export const navy: number;
    export const oldlace: number;
    export const olive: number;
    export const olivedrab: number;
    export const orange: number;
    export const orangered: number;
    export const orchid: number;
    export const palegoldenrod: number;
    export const palegreen: number;
    export const paleturquoise: number;
    export const palevioletred: number;
    export const papayawhip: number;
    export const peachpuff: number;
    export const peru: number;
    export const pink: number;
    export const plum: number;
    export const powderblue: number;
    export const purple: number;
    export const red: number;
    export const rosybrown: number;
    export const royalblue: number;
    export const saddlebrown: number;
    export const salmon: number;
    export const sandybrown: number;
    export const seagreen: number;
    export const seashell: number;
    export const sienna: number;
    export const silver: number;
    export const skyblue: number;
    export const slateblue: number;
    export const slategray: number;
    export const slategrey: number;
    export const snow: number;
    export const springgreen: number;
    export const steelblue: number;
    export const tan: number;
    export const teal: number;
    export const thistle: number;
    export const tomato: number;
    export const turquoise: number;
    export const violet: number;
    export const wheat: number;
    export const white: number;
    export const whitesmoke: number;
    export const yellow: number;
    export const yellowgreen: number;
}

export class Euler {

    static RotationOrders: string[];
    static DefaultOrder: string;
    x: number;
    y: number;
    z: number;
    order: string;
    onChangeCallback: Function;

    constructor(x?: number, y?: number, z?: number, order?: string);

    set(x: number, y: number, z: number, order?: string): Euler;

    clone(): this;

    copy(euler: Euler): this;

    setFromRotationMatrix(m: Matrix4, order?: string, update?: boolean): Euler;

    setFromQuaternion(q: Quaternion, order?: string, update?: boolean): Euler;

    setFromVector3(v: Vector3, order?: string): Euler;

    reorder(newOrder: string): Euler;

    equals(euler: Euler): boolean;

    fromArray(xyzo: any[]): Euler;

    toArray(array?: number[], offset?: number): number[];

    toVector3(optionalResult?: Vector3): Vector3;

    onChange(callback: Function): this;

}
