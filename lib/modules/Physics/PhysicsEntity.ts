import Vector from './utils/Vector';
import { TypedEvent } from '../../utils';
import { FRICTION, constrain } from './utils';
import { Node } from '../../types';

class MovementEvent {
  public position: Vector;

  constructor(pos: Vector) {
    this.position = pos;
  }
}

export default class PhysicsEntity {
  public id: string;
  public position: Vector;
  public velocity: {
    x: number;
    y: number;
  } = { x: 0, y: 0 };
  private lastUpdate: number;
  private emitter: TypedEvent<MovementEvent>;

  constructor(node: Node, options?: {}) {
    this.id = node.id;
    this.position = node.position;
    this.emitter = new TypedEvent<MovementEvent>();
    this.lastUpdate = new Date().getTime();
  }

  public applyForce(force: { x: number; y: number }) {
    const { x, y } = force;
    this.velocity.x += x;
    this.velocity.y += y;
  }

  public applyForces(forces: { x: number; y: number }[]) {
    for (let i = 0; i < forces.length; i++) {
      this.applyForce(forces[i]);
    }
  }

  public update(forces: { x: number; y: number }[], t: number) {
    const timeElapse = constrain(t - this.lastUpdate, -33, 33);
    this.lastUpdate = t;

    this.applyForces(forces);
    this._applyFriction();
    const { x, y, height, width } = this.position;
    let { x: vX, y: vY } = this.velocity;
    vX = constrain(vX, -5, 5);
    vY = constrain(vY, -5, 5);
    if (Math.abs(vX) < 0.01) {
      this.velocity.x = 0;
    }
    if (Math.abs(vY) < 0.01) {
      this.velocity.y = 0;
    }
    this.position.set({
      x: x + timeElapse * this.velocity.x,
      y: y + timeElapse * this.velocity.y,
      height,
      width
    });
  }

  public updatePositionManual(x: number, y: number) {
    this.position.set({
      x,
      y,
      height: this.position.height,
      width: this.position.width
    });
  }

  private _applyFriction() {
    this.velocity.x *= FRICTION;
    this.velocity.y *= FRICTION;
  }
}
