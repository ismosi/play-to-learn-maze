import {
  createInitalTypeMaze,
  getValidSpecificTypeNeighbors,
} from "@/Utils/tools/algorithm-tools/maze-algo";

import { Cell, CellType, MazeAlgoProps } from "@/Types/gameType";

async function createChannel(
  maze: CellType[][],
  updateMazeCells: MazeAlgoProps["updateMazeCells"],
  cell: Cell,
  { row, col }: Cell
) {
  const middleCell = {
    row: row + (cell.row - row) / 2,
    col: col + (cell.col - col) / 2,
  };

  await updateMazeCells(maze, [middleCell, { row, col }]);
}

export async function createMazeByRecursiveBacktracking({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const maze = createInitalTypeMaze(rows, cols, CellType.wall);
  updateMaze(maze);
  updateMazeCells(maze, { row: 0, col: 0 });

  async function recursiveBacktracking(cell: Cell) {
    const neighbors = getValidSpecificTypeNeighbors(maze, cell, CellType.wall);
    while (neighbors.length) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      const neighbor = neighbors[randomIndex];
      neighbors.splice(randomIndex, 1);

      if (maze[neighbor.row][neighbor.col] !== CellType.clear) {
        await createChannel(maze, updateMazeCells, cell, neighbor);
        await recursiveBacktracking(neighbor);
      }
    }
  }

  await recursiveBacktracking({ row: 0, col: 0 });

  updateMazeCells(maze, entry, CellType.entry);
  updateMazeCells(maze, exit, CellType.exit);
  return maze;
}
