import { Network, Node, Edge } from "../../types";
export default class VdekjeNetwork implements Network {
    container: HTMLElement;
    data: {
        nodes: Node[];
        edges: Edge[];
    };
    options: {
        [key: string]: any;
    };
    private shapes;
    private _physicsOn;
    constructor(container: HTMLElement, data: {
        nodes: Node[];
        edges: Edge[];
    }, options?: {
        [key: string]: any;
    });
    private _draw;
}
//# sourceMappingURL=Network.d.ts.map