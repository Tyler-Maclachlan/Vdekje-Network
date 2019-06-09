import { Node, Edge } from "./types";
import VdekjeNetwork from "./modules/Network/Network";

const VNetwork = (
  container: HTMLElement,
  data: { nodes: Node[]; edges: Edge[] },
  options?: { [key: string]: any }
) => {
  return new VdekjeNetwork(container, data, options);
};

if (!(window as any).VNetwork) {
  (window as any).VNetwork = VNetwork;
}

export default VdekjeNetwork;
