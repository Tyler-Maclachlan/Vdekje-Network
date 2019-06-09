import { Node } from "../../types";
export declare function getDistanceBetweenNodes(node1: Node, node2: Node): number;
export declare function getAngleBetweenNodes(node1: Node, node2: Node): number;
export declare function getForceBetweenNodes(node1: Node, node2: Node): number;
export declare function getHorizontalComponent(force: number, angle: number): number;
export declare function getVerticalComponent(force: number, angle: number): number;
export declare function calcResultantPosition(node: Node, nodes: Node[]): {
    x: number;
    y: number;
};
//# sourceMappingURL=index.d.ts.map