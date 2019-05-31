export class AnimationObjectGroup {

    uuid: string;
    stats: {
        bindingsPerObject: number;
        objects: {
            total: number;
            inUse: number;
        };
    };

    constructor(...args: any[]);

    add(...args: any[]): void;

    remove(...args: any[]): void;

    uncache(...args: any[]): void;

}
