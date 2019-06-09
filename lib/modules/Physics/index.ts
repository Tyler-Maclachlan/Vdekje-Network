import { Node } from "../../types";
import { getNodesAroundNode } from "../Network/utils";
import { getDistance } from "../utils";

const k = 9 * Math.pow(10, 9);

export function getDistanceBetweenNodes(node1: Node, node2: Node) {
  return getDistance({ x: node1.x, y: node1.y }, { x: node2.x, y: node2.y });
}

export function getAngleBetweenNodes(node1: Node, node2: Node) {
  const dx = node2.x - node1.x;
  const dy = node2.y - node1.y;

  return Math.atan2(dy, dx);
}

export function getForceBetweenNodes(node1: Node, node2: Node) {
  return (
    k *
    ((Math.abs(1 * Math.pow(10, -1)) * Math.abs(1 * Math.pow(10, -1))) /
      Math.pow(getDistanceBetweenNodes(node1, node2), 2))
  );
}

export function getHorizontalComponent(force: number, angle: number) {
  return force * Math.cos(angle);
}

export function getVerticalComponent(force: number, angle: number) {
  return force * Math.sin(angle);
}

export function calcResultantPosition(node: Node, nodes: Node[]) {
  let resultantX = 0;
  let resultantY = 0;
  const nodesAround = getNodesAroundNode(nodes, node.id, 200);

  const forces: { force: number; angle: number }[] = [];

  if (nodesAround.length) {
    nodesAround.forEach(n => {
      forces.push({
        force: getForceBetweenNodes(node, n),
        angle: getAngleBetweenNodes(node, n)
      });
    });

    forces.forEach(f => {
      resultantX += getHorizontalComponent(f.force, f.angle);
      resultantY += getVerticalComponent(f.force, f.angle);
    });
  }

  resultantX = Math.min(100, resultantX);
  resultantX = Math.max(resultantX, -100);

  resultantY = Math.min(100, resultantY);
  resultantY = Math.max(resultantY, -100);
  return {
    x: node.x + resultantX,
    y: node.y + resultantY
  };
}
