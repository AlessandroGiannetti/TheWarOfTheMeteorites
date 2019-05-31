export abstract class Interpolant {

    parameterPositions: any;
    samplesValues: any;
    valueSize: number;
    resultBuffer: any;

    constructor(
        parameterPositions: any,
        samplesValues: any,
        sampleSize: number,
        resultBuffer?: any
    );

    evaluate(time: number): any;

}
