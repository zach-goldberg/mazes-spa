import graphlib, { Graph } from '@dagrejs/graphlib';
import { MazeCell } from './maze-cell.model';
import { BFSIterator, DFSIterator, prim } from './graph-utils';

export class Maze {
  private graph: Graph;

  constructor(private width: number, private height: number) {
    this.graph = this.initMazeGraph(width, height);
  }

  public static toStringCoordinate(x: number, y: number): string {
    return '(' + x + ', ' + y + ')';
  }

  public getCells(): MazeCell[] {
    return this.graph.nodes().map(id => this.graph.node(id));
  }

  public getDFSIterator(): DFSIterator<string> {
    return new DFSIterator<string>(this.graph, '(0, 0)',
      Maze.toStringCoordinate(this.width - 1, this.height - 1));
  }

  public getBFSIterator(): BFSIterator<string> {
    return new BFSIterator<string>(this.graph, '(0, 0)',
      Maze.toStringCoordinate(this.width - 1, this.height - 1));
  }

  public setExplored(position: string): boolean {
    const node: MazeCell = this.graph.node(position);
    if (!node) {
      return false;
    }
    node.exploredType = 'explored';
    return true;
  }

  public setAllUnexplored() {
    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height; y += 1) {
        this.graph.node(Maze.toStringCoordinate(x, y)).exploredType = 'unexplored';
      }
    }
  }

  private initMazeGraph(width: number, height: number): Graph {
    let graph = new Graph({ directed: false });
    for (let x = 0; x < width - 1; x += 1) {
      for (let y = 0; y < height; y += 1) {
        graph.setEdge(
          Maze.toStringCoordinate(x, y),
          Maze.toStringCoordinate(x + 1, y),
          { weight: Maze.getRandomInt(0, 10000) });
      }
    }
    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height - 1; y += 1) {
        graph.setEdge(
          Maze.toStringCoordinate(x, y),
          Maze.toStringCoordinate(x, y + 1),
          { weight: Maze.getRandomInt(0, 10000) });
      }
    }

    let mazeTree = prim(graph, e => graph.edge(e).weight)
    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const pathUp = mazeTree.hasEdge(Maze.toStringCoordinate(x, y), Maze.toStringCoordinate(x, y - 1));
        const pathDown = mazeTree.hasEdge(Maze.toStringCoordinate(x, y), Maze.toStringCoordinate(x, y + 1));
        const pathLeft = mazeTree.hasEdge(Maze.toStringCoordinate(x, y), Maze.toStringCoordinate(x - 1, y));
        const pathRight = mazeTree.hasEdge(Maze.toStringCoordinate(x, y), Maze.toStringCoordinate(x + 1, y));

        mazeTree.setNode(Maze.toStringCoordinate(x, y), {
          exploredType: 'unexplored',
          x,
          y,
          pathUp,
          pathDown,
          pathLeft,
          pathRight
        });
      }
    }

    return mazeTree;
  }

  private static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
