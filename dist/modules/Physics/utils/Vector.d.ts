export default class Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
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
    dot(vec: Vector): number;
    getLength(): number;
    getDistance(vec: Vector): number;
    getAngle(vec: Vector): number;
}
//# sourceMappingURL=Vector.d.ts.map