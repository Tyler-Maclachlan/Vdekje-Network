import VdekjeNetwork from "./modules/Network/Network";
import Vector from "./modules/Physics/utils/Vector";

export interface Network {
  container: HTMLElement;
  data: { nodes: Node[]; edges: Edge[] };
  options: {
    [key: string]: any;
  };
}

export interface Node {
  id: string;
  position: Vector;
  height: number;
  width: number;
  data?: {
    [key: string]: any;
  };
  options?: {
    [key: string]: any;
  };
}

export interface Edge {
  id: string;
  to: string;
  from: string;
  data?: {
    [key: string]: any;
  };
  options?: {
    [key: string]: any;
  };
}

export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose(): any;
}

export type INetworkConstructorArgs = (
  container: HTMLElement,
  data: { nodes: Node[]; edges: Edge[] },
  options?: { [key: string]: any }
) => VdekjeNetwork;
