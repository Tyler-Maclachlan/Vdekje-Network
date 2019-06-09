import * as alasql from "alasql";
import { Node, Edge } from "../../../types";

export function getEdgePoints(nodes: Node[], sourceEdge: Edge) {
  const result = alasql("SELECT x,y FROM ? WHERE id=? OR id=?", [
    nodes,
    sourceEdge.to,
    sourceEdge.from
  ]);

  let points = result.map((p: any) => {
    return [p.x, p.y];
  });
  points = [...points[0], ...points[1]];

  return points;
}
