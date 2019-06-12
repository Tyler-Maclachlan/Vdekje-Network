import * as alasql from "alasql";

import PhysicsEntity from "./PhysicsEntity";
import { Node, Edge } from "../../types";
import getAttraction from "./AttractionForce";
import Vector from "./utils/Vector";


export default class PhysicsEngine {
    private _nodes: PhysicsEntity[] = [];
    private _edges: any[] = [];

    constructor(nodes: Node[], edges: Edge[], center: { x: number, y: number }) {
        this._edges = edges;
        for (let i = 0; i < nodes.length; i++) {
            let pE = new PhysicsEntity(nodes[i]);
            this._nodes.push(pE);
        }
    }

    public step(t: number): { [key: string]: any } {
        const positions: { [key: string]: any } = {};
        for (let i = 0; i < this._nodes.length; i++) {
            const node = this._nodes[i];
            const nodesAroundNode = this._nodesAroundNode(node);
            const forces: { x: number, y: number }[] = [];
            for (let c = 0; c < nodesAroundNode.length; c++) {
                forces.push(getAttraction(node.position, nodesAroundNode[c].position));
            }
            node.update(forces, t);
            positions[node.id] = node.position;
        }
        return positions;
    }

    private _nodesAroundNode(node: PhysicsEntity, perimeter: number = 150): PhysicsEntity[] {
        const { x, y } = node.position;
        return alasql("SELECT * FROM ? AS NODES WHERE NODES.[position].[x] BETWEEN ? AND ? AND NODES.[position].[y] BETWEEN ? AND ? AND NODES.[id] != ?",
        [this._nodes, x - perimeter, x + perimeter, y - perimeter, y + perimeter, node.id]);
    }

    private _getConnectedEdges(node: Node) {
        return alasql("SELECT * FROM ? WHERE [to] = ? OR [from] = ?", [this._edges, node.id, node.id]);
    }
}