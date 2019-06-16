import { Network, Node, Edge } from '../../types';
export default class VdekjeNetwork implements Network {
    container: HTMLElement;
    data: {
        nodes: Node[];
        edges: Edge[];
    };
    options: {
        [key: string]: any;
    };
    private stage;
    private layer;
    private shapes;
    private _physicsOn;
    private physicsEngine;
    constructor(container: HTMLElement, data: {
        nodes: Node[];
        edges: Edge[];
    }, options?: {
        [key: string]: any;
    });
    private _render;
    private _draw;
}
//# sourceMappingURL=Network.d.ts.map