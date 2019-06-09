import * as alasql from "alasql";
import { Node, Edge } from "../../../types";

export function getNodesAroundNode(
  nodes: Node[],
  sourceNodeID: string,
  perimeter: number = 100
): Node[] {
  if (!nodes.length) {
    throw new Error("Nodes list cannot be empty");
  }
  if (!sourceNodeID) {
    throw new Error("Source node ID is required.");
  }
  const sourceNode = alasql("SELECT x, y FROM ? WHERE id = ?", [
    nodes,
    sourceNodeID
  ])[0];
  return alasql(
    "SELECT id, x, y FROM ? WHERE x BETWEEN ? AND ? AND y BETWEEN ? AND ? AND id != ?",
    [
      nodes,
      sourceNode.x - perimeter,
      sourceNode.x + perimeter,
      sourceNode.y - perimeter,
      sourceNode.y + perimeter,
      sourceNodeID
    ]
  );
}

export function getConnectedEdges(edges: Edge[], sourceNodeID: string): Edge[] {
  return alasql("SELECT * FROM ? WHERE [to] = ? OR [from] = ?", [
    edges,
    sourceNodeID,
    sourceNodeID
  ]);
}
