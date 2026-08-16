import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";

import { Cell, CellType, MazeAlgoProps } from "@/Types/gameType";

import {
  getValidSpecificTypeNeighbors,
  spliceRandomIdxOfObjectFromArray,
  getObjectIncludedRandomIdxFromArray,
} from "@/Utils/tools/algorithm-tools/maze-algo";

export function createChannel(maze: CellType[][], cell: Cell) {
  const mazeCells = getValidSpecificTypeNeighbors(maze, cell);

  const {
    value: { row, col },
  } = getObjectIncludedRandomIdxFromArray(mazeCells);
  const middleCell = {
    row: cell.row + (row - cell.row) / 2,
    col: cell.col + (col - cell.col) / 2,
  };
  return middleCell;
}

export async function createMazeByPrims({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const maze = createInitalTypeMaze(rows, cols, CellType.wall);
  updateMaze(maze);

  const neighbors: Cell[] = [];

  const startCell = { row: 0, col: 0 };
  updateMazeCells(maze, startCell);

  neighbors.push(
    ...getValidSpecificTypeNeighbors(maze, startCell, CellType.wall)
  );
  while (neighbors.length) {
    const neighbor = spliceRandomIdxOfObjectFromArray(neighbors);

    if (maze[neighbor.row][neighbor.col] !== CellType.clear) {
      const middleCell = createChannel(maze, neighbor);
      await updateMazeCells(maze, [middleCell, neighbor]);
      neighbors.push(
        ...getValidSpecificTypeNeighbors(maze, neighbor, CellType.wall)
      );
    }
  }

  updateMazeCells(maze, entry, CellType.entry);
  updateMazeCells(maze, exit, CellType.exit);
  return maze;
}
