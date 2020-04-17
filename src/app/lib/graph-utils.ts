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
