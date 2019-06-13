import { radsToDegrees } from '.';

export default class Vector {
  public x: number;
  public y: number;
  public height: number;
  public width: number;

  constructor(point: { x: number; y: number }, width: number, height: number) {
    this.x = point.x || 0;
    this.y = point.y || 0;
    this.height = height;
    this.width = width;
  }

  public set(vec: { x: number; y: number; height: number; width: number }) {
    const { x, y, width, height } = vec;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    return this;
  }

  public copy(vec: Vector) {
    this.x = vec.x;
    this.y = vec.y;
    this.height = vec.height;
    this.width = vec.width;
    return this;
  }

  public clear() {
    this.x = 0;
    this.y = 0;
    this.height = 0;
    this.width = 0;
    return this;
  }

  public clone() {
    return new Vector({ x: this.x, y: this.y }, this.width, this.height);
  }

  public add(vec1: Vector, vec2: Vector) {
    this.x = vec1.x + vec2.x;
    this.y = vec1.y + vec2.y;
    return this;
  }

  public addSelf(vec: Vector) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  public sub(vec1: Vector, vec2: Vector) {
    this.x = vec1.x - vec2.x;
    this.y = vec1.y - vec2.y;
    return this;
  }

  public subSelf(vec: Vector) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  public multiplySelf(vec: Vector) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  }

  public multiplyScaler(scale: number) {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  public divideScalar(s: number) {
    if (s) {
      this.x /= s;
      this.y /= s;
    } else {
      this.set(this);
    }
    return this;
  }

  public negate() {
    return this.multiplyScaler(-1);
  }

  public normalize() {
    return this.divideScalar(this.getLength());
  }

  public equals(vec: Vector) {
    return this.getDistance(vec) < 0.0001;
  }

  public lerp(vec: Vector, t: number) {
    const x = (vec.x - this.x) * t + this.x;
    const y = (vec.y - this.y) * t + this.y;
    return this.set({ x, y, height: this.height, width: this.width });
  }

  public isZero() {
    return this.getLength() < 0.0001;
  }

  public getBounds() {
    return {
      top: this.y + this.height,
      bottom: this.y,
      left: this.x,
      right: this.x + this.width
    };
  }

  public dot(vec: Vector) {
    return this.x * vec.x + this.y * vec.y;
  }

  public getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public getDistance(vec: Vector) {
    const { x, y } = vec;
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public getAngle(vec: Vector) {
    const myLen = this.getLength();
    const vecLen = vec.getLength();

    const dot = this.dot(vec);
    const cosTheta = dot / (myLen * vecLen);
    return radsToDegrees(Math.acos(cosTheta));
  }
}
