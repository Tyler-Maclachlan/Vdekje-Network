import Vector from './utils/Vector';
import { Node } from '../../types';
export default class PhysicsEntity {
    id: string;
    position: Vector;
    velocity: {
        x: number;
        y: number;
    };
    private lastUpdate;
    private nextPosition;
    constructor(node: Node, options?: {});
    applyForce(force: {
        x: number;
        y: number;
    }): void;
    applyForces(forces: {
        x: number;
        y: number;
    }[]): void;
    update(forces: {
        x: number;
        y: number;
    }[], t?: number): void;
    updatePosition(): Vector;
    updatePositionManual(x: number, y: number): void;
    private _applyFriction;
}
//# sourceMappingURL=PhysicsEntity.d.ts.map