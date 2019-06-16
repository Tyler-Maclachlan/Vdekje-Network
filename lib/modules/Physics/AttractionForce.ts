import Vector from './utils/Vector';
import {
  REPULSION_STRENGTH,
  getGravitationalForce,
  getHorizontalComponent,
  getVerticalComponent,
  constrain
} from './utils';

export default function getAttraction(vec1: Vector, vec2: Vector) {
  const dir = vec1.clone().sub(vec1, vec2);
  const angle = vec1.getAngle(vec2);
  const distance = dir.getLength();

  const F = -getGravitationalForce(1, 1, distance);
  const fX = getHorizontalComponent(angle, F);
  const fY = getVerticalComponent(angle, F);

  const attraction = new Vector(fX, fY);
  attraction.normalize();

  return { x: attraction.x, y: attraction.y };
}
