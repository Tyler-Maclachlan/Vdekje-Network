import * as alasql from "alasql";
import { Node, Edge } from "../../../types";

export function getEdgePoints(nodes: Node[], sourceEdge: Edge) {
  const result = alasql("SELECT NODES.[position].[x], NODES.[position].[y] FROM ? NODES WHERE id=? OR id=?", [
    nodes,
    sourceEdge.to,
    sourceEdge.from
  ]);

  let points = result.map((p: any) => {
    return [p.x, p.y];
  });

  if (points[0] && points[1]) {
    points = [...points[0], ...points[1]];
  } else {
    if (points[0]) {
      points = points[0];
    } else {
      points = points[1] || [];
    }
  }

  return points;
}
