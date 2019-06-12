export default class Vector {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(point: {
        x: number;
        y: number;
    }, width: number, height: number);
    set(vec: {
        x: number;
        y: number;
        height: number;
        width: number;
    }): this;
    copy(vec: Vector): this;
    clear(): this;
    clone(): Vector;
    add(vec1: Vector, vec2: Vector): this;
    addSelf(vec: Vector): this;
    sub(vec1: Vector, vec2: Vector): this;
    subSelf(vec: Vector): this;
    multiplySelf(vec: Vector): this;
    multiplyScaler(scale: number): this;
    divideScalar(s: number): this;
    negate(): this;
    normalize(): this;
    equals(vec: Vector): boolean;
    lerp(vec: Vector, t: number): this;
    isZero(): boolean;
    getBounds(): {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    dot(vec: Vector): number;
    getLength(): number;
    getDistance(vec: Vector): number;
    getAngle(vec: Vector): number;
}
//# sourceMappingURL=Vector.d.ts.map