import { Network, Node, Edge } from '../../types';
import {
  createStage,
  createLayer,
  createLine,
  createCircle
} from '../Canvas/Canvas';
import { getEdgePoints } from './utils';
import PhysicsEngine from '../Physics/Engine';
import Vector from '../Physics/utils/Vector';

export default class VdekjeNetwork implements Network {
  public container: HTMLElement;
  public data: {
    nodes: Node[];
    edges: Edge[];
  };
  public options: {
    [key: string]: any;
  };
  private stage: any;
  private layer: any;
  private shapes: {
    nodes: { [key: string]: any };
    edges: { [key: string]: any };
  } = { nodes: {}, edges: {} };
  private _physicsOn: boolean = true;
  private physicsEngine: PhysicsEngine;

  constructor(
    container: HTMLElement,
    data: { nodes: Node[]; edges: Edge[] },
    options?: { [key: string]: any }
  ) {
    this.container = container;
    this.data = data;
    this.options = options || {};
    this.stage = createStage(container);
    this.layer = createLayer();
    this.stage.add(this.layer);
    for (let i = 0; i < this.data.nodes.length; i++) {
      const node = this.data.nodes[i];
      if (typeof node.position != typeof Vector) {
        node.position = new Vector(
          { x: node.position.x, y: node.position.y },
          node.position.width,
          node.position.height
        );
      }
      const circle = createCircle(node);
      circle.on('dragend', ({ target }: any) => {
        const { id, x, y } = target.attrs;
        this.physicsEngine.updateNodePosition(id, { x, y });
        requestAnimationFrame(() => {
          this._draw();
        });
      });
      this.shapes.nodes[node.id] = circle;
      this.layer.add(circle);
    }
    for (let i = 0; i < data.edges.length; i++) {
      const points = getEdgePoints(data.nodes, data.edges[i]);
      const line = createLine(data.edges[i], points);
      this.shapes.edges[data.edges[i].id] = line;
      this.layer.add(line);
    }
    this.stage.on('wheel', (e: any) => {
      e.evt.preventDefault();
      var oldScale = this.stage.scaleX();

      var mousePointTo = {
        x:
          this.stage.getPointerPosition().x / oldScale -
          this.stage.x() / oldScale,
        y:
          this.stage.getPointerPosition().y / oldScale -
          this.stage.y() / oldScale
      };

      var newScale = e.evt.deltaY < 0 ? oldScale * 2 : oldScale / 2;
      this.stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x:
          -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) *
          newScale
      };
      this.stage.position(newPos);
      this.stage.batchDraw();
    });
    this.physicsEngine = new PhysicsEngine(this.data.nodes, this.data.edges, {
      x: container.clientWidth / 2,
      y: container.clientHeight / 2
    });

    requestAnimationFrame(() => {
      this._draw();
    });
  }

  private _draw() {
    const startTime = new Date().getTime();
    console.log('start draw');
    const positions = this.physicsEngine.step(new Date().getTime());
    Object.keys(positions).forEach(key => {
      const shape = this.shapes.nodes[key];
      shape.x(positions[key].x);
      shape.y(positions[key].y);
    });
    this.layer.batchDraw();
    console.log('end draw', new Date().getTime() - startTime);
    if (!this.physicsEngine.isStable()) {
      requestAnimationFrame(() => {
        this._draw();
      });
    }
  }
}
