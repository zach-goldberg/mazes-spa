import graphlib, { Graph } from '@dagrejs/graphlib';

const toJSON = graphlib.json.write;
const fromJSON = graphlib.json.read;

/**
 * Wrapper around `graphlib.alg.prim` that returns a directed graph if the
 * given graph is directed and an undirected graph if the given graph is undirected.
 *
 * @param graph - The graph
 * @param weightsFunction - A function that returns the weight of a given edge
 * @returns A minimum spanning tree of `graph`
 */
export function prim(graph: Graph, weightsFunction: Function): Graph {
  let directed = toJSON(graph).options.directed;
  let treeJSON = toJSON(graphlib.alg.prim(graph, weightsFunction));
  treeJSON.options.directed = directed;
  return fromJSON(treeJSON);
}

export class DFSIterator<T> {
  graph: Graph;
  start: T;
  end: T;
  worklist: T[] = [];
  visited: T[] = [];
  cameFromEdge = new Map();
  reachedEnd = false;

  constructor(graph: Graph, start: T, end: T) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.worklist.push(start);
  }

  [Symbol.iterator]() {
    return {
      next: this.getNext.bind(this)
    };
  }

  public getNext(): {done: boolean, value?: T} {
    if (this.reachedEnd) {
      return { done: true };
    }

    let next = this.worklist.shift();
    this.visited.push(next);

    if (next == this.end) {
      this.reachedEnd = true;
      return { value: next, done: false };
    }
    else {
      for (let neighbor of this.graph.neighbors(next)) {
        if (!this.visited.includes(neighbor) && !this.worklist.includes(neighbor)) {
          this.worklist.unshift(neighbor);
        }
      }
      if (this.worklist.length == 0) {
        this.reachedEnd = true;
      }
      return { value: next, done: false }
    }
  }
}

export class BFSIterator<T> {
  graph: Graph;
  start: T;
  end: T;
  worklist: T[] = [];
  visited: T[] = [];
  cameFromEdge = new Map();
  reachedEnd = false;

  constructor(graph, start, end) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.worklist.push(start);
  }

  [Symbol.iterator]() {
    return {
      next: this.getNext.bind(this)
    }
  }

  getNext() {
    if (this.reachedEnd) {
      return { done: true };
    }

    let next = this.worklist.pop();
    this.visited.push(next);

    if (next == this.end) {
      this.reachedEnd = true;
      return { value: next, done: false };
    }
    else {
      for (let neighbor of this.graph.neighbors(next)) {
        if (!this.visited.includes(neighbor) && !this.worklist.includes(neighbor)) {
          this.worklist.unshift(neighbor);
        }
      }
      if (this.worklist.length == 0) {
        this.reachedEnd = true;
      }
      return { value: next, done: false }
    }
  }
}
