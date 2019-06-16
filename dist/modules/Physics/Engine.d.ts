import { Node, Edge } from '../../types';
export default class PhysicsEngine {
    private _nodes;
    private _edges;
    private stable;
    constructor(nodes: Node[], edges: Edge[], center: {
        x: number;
        y: number;
    });
    step(t?: number): Promise<{
        [key: string]: any;
    }>;
    isStable(): boolean;
    updateNodePosition(nodeId: string, pos: {
        x: number;
        y: number;
    }): void;
    private _nodesAroundNode;
    private _getConnectedEdges;
}
//# sourceMappingURL=Engine.d.ts.map