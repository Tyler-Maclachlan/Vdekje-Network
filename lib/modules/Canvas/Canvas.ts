import { Node, Edge } from "../../types";

const Konva = require("konva");

export function createStage(container: HTMLElement) {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const stage = new Konva.Stage({
    container: container.id,
    width: width,
    height: height,
    draggable: true,
    x: width / 2,
    y: height / 2,
    offset: {
      x: width / 2,
      y: height / 2
    }
  });

  return stage;
}

export function createLayer() {
  return new Konva.Layer();
}

export function createCircle(node: Node) {
  const shape = new (Konva as any).Circle({
    id: node.id,
    x: node.position.x,
    y: node.position.y,
    radius: 20,
    fill: "red",
    draggable: true
  });

  return shape;
}

export function createLine(edge: Edge, points: number[]) {
  const line = new (Konva as any).Line({
    id: edge.id,
    points: points,
    stroke: "blue",
    strokeWidth: 2,
    tension: 1
  });

  return line;
}
