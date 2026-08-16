import { SearchAlgoProps, Cell, CellType } from "@/Types/gameType";
import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";

function getAddToQueueIfAllowedFunction(
  grid: number[][],
  parents: Cell[][],
  visited: boolean[][],
  queue: Cell[]
) {
  const rows = grid.length;
  const cols = grid[0].length;

  return function (row: number, col: number, nextX: number, nextY: number) {
    if (nextX >= 0 && nextY >= 0 && nextX < rows && nextY < cols) {
      if (!visited[nextX][nextY] && grid[nextX][nextY] !== 3) {
        queue.push({ row: nextX, col: nextY });
        parents[nextX][nextY] = { row, col };
        visited[nextX][nextY] = true;
      }
    }
  };
}

export async function breadthFirstSearch({
  grid: stateGrid,
  entry,
  exit,
  updateMazeCells,
}: SearchAlgoProps) {
  const grid = stateGrid.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = createInitalTypeMaze(rows, cols, false);
  const parents = createInitalTypeMaze<Cell>(rows, cols, null);

  const queue = [entry];
  visited[entry.row][entry.col] = true;

  const addToQueueIfAllowed = getAddToQueueIfAllowedFunction(
    grid,
    parents,
    visited,
    queue
  );

  while (queue.length) {
    const length = queue.length;

    const loopQueue = [];
    for (let k = 0; k < length; k++) {
      const value = queue.shift() as Cell;

      if (value.row === exit.row && value.col === exit.col) {
        return { grid, parents };
      }

      addToQueueIfAllowed(value.row, value.col, value.row - 1, value.col);
      addToQueueIfAllowed(value.row, value.col, value.row, value.col - 1);
      addToQueueIfAllowed(value.row, value.col, value.row + 1, value.col);
      addToQueueIfAllowed(value.row, value.col, value.row, value.col + 1);

      loopQueue.push({ row: value.row, col: value.col });
    }

    for (const value of loopQueue) {
      if (
        !visited[value.row][value.col] &&
        grid[value.row][value.col] !== CellType.wall
      ) {
        visited[value.row][value.col] = true;
        parents[value.row][value.col] = { row: value.row, col: value.col };
        queue.push(value);
      }

      if (grid[value.row][value.col] === CellType.clear) {
        await updateMazeCells(grid, value, CellType.visited);
      }
    }
  }

  return { grid, parents: null };
}
