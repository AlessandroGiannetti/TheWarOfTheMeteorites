export class Layers {

    mask: number;

    constructor();

    set(channel: number): void;

    enable(channel: number): void;

    toggle(channel: number): void;

    disable(channel: number): void;

    test(layers: Layers): boolean;

}
