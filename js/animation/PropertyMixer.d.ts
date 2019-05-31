export class PropertyMixer {

    binding: any;
    valueSize: number;
    buffer: any;
    cumulativeWeight: number;
    useCount: number;
    referenceCount: number;

    constructor(binding: any, typeName: string, valueSize: number);

    accumulate(accuIndex: number, weight: number): void;

    apply(accuIndex: number): void;

    saveOriginalState(): void;

    restoreOriginalState(): void;

}
