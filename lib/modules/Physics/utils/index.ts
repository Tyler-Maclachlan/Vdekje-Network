export const FRICTION = 0.9;
export const REPULSION_STRENGTH = 0.01;
export const GRAVITY = 6.67428 * Math.pow(10, -11);

export function radsToDegrees(rads: number) {
    return rads * 180 / Math.PI;
}

export function getGravitationalForce(m1: number, m2: number, distance: number) {
    return (GRAVITY * m1 * m2) / (distance * distance);
}

export function getHorizontalComponent(angle: number, force: number) {
    return force * Math.cos(angle);
}

export function getVerticalComponent(angle: number, force: number) {
    return force * Math.sin(angle);
}

export function constrain(distance: number, min: number, max: number) {
    let d = distance;
    d = Math.min(min, d);
    d = Math.max(max, d);
    return d;
}

