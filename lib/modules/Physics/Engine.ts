import * as alasql from 'alasql';

import PhysicsEntity from './PhysicsEntity';
import { Node, Edge } from '../../types';
import getAttraction from './AttractionForce';
import Vector from './utils/Vector';

export default class PhysicsEngine {
  private _nodes: PhysicsEntity[] = [];
  private _edges: any[] = [];
  private stable: number = 0;

  constructor(nodes: Node[], edges: Edge[], center: { x: number; y: number }) {
    this._edges = edges;
    for (let i = 0; i < nodes.length; i++) {
      let pE = new PhysicsEntity(nodes[i]);
      this._nodes.push(pE);
    }
  }

  public async step(t: number = 30): Promise< { [key: string]: any }> {
    this.stable = 0;
    const positions: { [key: string]: any } = {};
    for (let i = 0; i < this._nodes.length; i++) {
      const node = this._nodes[i];
      const nodesAroundNode = this._nodesAroundNode(node);
      if (nodesAroundNode.length) {
        const forces: { x: number; y: number }[] = [];
        for (let c = 0; c < nodesAroundNode.length; c++) {
          forces.push(
            getAttraction(node.position, nodesAroundNode[c].position)
          );
        }
        node.update(forces, t);
      } else {
        this.stable++;
      }
    }
    for (let i = 0; i < this._nodes.length; i++) {
      const node = this._nodes[i];
      positions[node.id] = node.position;
    }
    return positions;
  }

  public isStable(): boolean {
    return this.stable === this._nodes.length;
  }

  public updateNodePosition(nodeId: string, pos: { x: number; y: number }) {
    let node = this._nodes.find(n => {
      return n.id === nodeId;
    });
    node!.updatePositionManual(pos.x, pos.y);
  }

  private _nodesAroundNode(
    node: PhysicsEntity,
    perimeter: number = 60
  ): PhysicsEntity[] {
    const { x, y } = node.position;
    return alasql(
      'SELECT * FROM ? AS NODES WHERE NODES.[position].[x] BETWEEN ? AND ? AND NODES.[position].[y] BETWEEN ? AND ? AND NODES.[id] != ?',
      [
        this._nodes,
        x - perimeter,
        x + perimeter,
        y - perimeter,
        y + perimeter,
        node.id
      ]
    );
  }

  private _getConnectedEdges(node: Node) {
    return alasql('SELECT * FROM ? WHERE [to] = ? OR [from] = ?', [
      this._edges,
      node.id,
      node.id
    ]);
  }
}
