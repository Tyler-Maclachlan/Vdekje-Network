import { Network, Node, Edge } from "../../types";
import {
  createStage,
  createLayer,
  createLine,
  createCircle
} from "../Canvas/Canvas";
import { getConnectedEdges, getEdgePoints } from "./utils";
import { calcResultantPosition } from "../Physics";
export default class VdekjeNetwork implements Network {
  public container: HTMLElement;
  public data: {
    nodes: Node[];
    edges: Edge[];
  };
  public options: {
    [key: string]: any;
  };
  private shapes: {
    nodes: { [key: string]: any };
    edges: { [key: string]: any };
  } = { nodes: {}, edges: {} };
  private _physicsOn: boolean = true;

  constructor(
    container: HTMLElement,
    data: { nodes: Node[]; edges: Edge[] },
    options?: { [key: string]: any }
  ) {
    this.container = container;
    this.data = data;
    this.options = options || {};
    this._draw();
  }

  private _draw() {
    const _this = this;
    const stage = createStage(this.container);
    var scaleBy = 2;
    stage.on("wheel", (e: any) => {
      e.evt.preventDefault();
      var oldScale = stage.scaleX();

      var mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
      };

      var newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x:
          -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      };
      stage.position(newPos);
      stage.batchDraw();
    });

    const layer = createLayer();
    stage.add(layer);

    function updateObjects(node: Node) {
      const target = _this.shapes.nodes[node.id];
      target.x(node.x);
      target.y(node.y);
      const connectedEdges = getConnectedEdges(_this.data.edges, node.id);

      connectedEdges.forEach(edge => {
        const line = _this.shapes.edges[edge.id];
        const points = getEdgePoints(_this.data.nodes, edge);

        line.points(points);
      });

      layer.batchDraw();
    }

    for (const edge of this.data.edges) {
      let points = getEdgePoints(this.data.nodes, edge);

      const line = createLine(edge, points);
      layer.add(line);
      this.shapes.edges[edge.id] = line;
    }

    for (const node of this.data.nodes) {
      const shape = createCircle(node);
      this.shapes.nodes[node.id] = shape;
      layer.add(shape);

      shape.on("dragmove", () => {
        node.x = shape.x();
        node.y = shape.y();

        requestAnimationFrame(() => {
          updateObjects(node);
        });
      });

      shape.on("dragend", () => {
        this._physicsOn = true;
        requestAnimationFrame(() => {
          physics();
        });
      });
    }

    layer.draw();

    let physics = () => {
      let stable = 0;
      this.data.nodes.forEach(node => {
        let { x, y } = calcResultantPosition(node, this.data.nodes);
        if (x === node.x && y === node.y) {
          stable++;
          return;
        }
        node.x = x;
        node.y = y;
        requestAnimationFrame(() => {
          updateObjects(node);
        });
      });
      if (stable === this.data.nodes.length) {
        this._physicsOn = false;
      }
      if (this._physicsOn) {
        requestAnimationFrame(() => {
          console.log("running physics");
          const startTime = new Date().getTime();
          physics();
          console.log(new Date().getTime() - startTime);
        });
      }
    };

    physics();
  }
}
