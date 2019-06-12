import { Node, Edge } from "../../types";
export default class PhysicsEngine {
    private _nodes;
    private _edges;
    constructor(nodes: Node[], edges: Edge[], center: {
        x: number;
        y: number;
    });
    step(t: number): {
        [key: string]: any;
    };
    private _nodesAroundNode;
    private _getConnectedEdges;
}
//# sourceMappingURL=Engine.d.ts.map