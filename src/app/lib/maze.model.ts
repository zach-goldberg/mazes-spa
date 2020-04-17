import graphlib, { Graph } from '@dagrejs/graphlib';
import { MazeCell } from './maze-cell.model';
import { prim } from './graph-utils';

export class Maze {
  private graph: Graph;

  constructor(private width: number, private height: number) {
    this.graph = this.initMazeGraph(width, height);
  }

  public getCells(): MazeCell[] {
    return this.graph.nodes().map(id => {
      let cellData: MazeCell = this.graph.node(id);
      let { x, y } = cellData;
      if (this.graph.hasEdge(id, this.toStringCoordinate(x + 1, y))) {
        cellData.pathRight = true;
      }
      if (this.graph.hasEdge(id, this.toStringCoordinate(x - 1, y))) {
        cellData.pathLeft = true;
      }
      if (this.graph.hasEdge(id, this.toStringCoordinate(x, y + 1))) {
        cellData.pathDown = true;
      }
      if (this.graph.hasEdge(id, this.toStringCoordinate(x, y - 1))) {
        cellData.pathUp = true;
      }
      return cellData;
    });
  }

  private initMazeGraph(width: number, height: number): Graph {
    let graph = new Graph({ directed: false });
    for (let x = 0; x < width - 1; x += 1) {
      for (let y = 0; y < height; y += 1) {
        graph.setEdge(
          this.toStringCoordinate(x, y),
          this.toStringCoordinate(x + 1, y),
          { weight: this.getRandomInt(0, 10000) });
      }
    }
    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height - 1; y += 1) {
        graph.setEdge(
          this.toStringCoordinate(x, y),
          this.toStringCoordinate(x, y + 1),
          { weight: this.getRandomInt(0, 10000) });
      }
    }

    let mazeTree = prim(graph, e => graph.edge(e).weight);
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        mazeTree.setNode(this.toStringCoordinate(x, y), {
          exploredType: 'unexplored',
          x,
          y
        });
      }
    }
    return mazeTree;
  }

  private toStringCoordinate(x: number, y: number): string {
    return '(' + x + ', ' + y + ')';
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
