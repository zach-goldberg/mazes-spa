export interface MazeCell {
  exploredType: string,
  x: number,
  y: number,
  pathUp?: boolean,
  pathDown?: boolean,
  pathLeft?: boolean,
  pathRight?: boolean
}
