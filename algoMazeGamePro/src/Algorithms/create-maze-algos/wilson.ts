import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";
import { Cell, CellType, MazeAlgoProps } from "@/Types/gameType";
import {
  Direction,
  filterValidCells,
  getNeighborsWithDirections,
  getObjectIncludedRandomIdxFromArray,
} from "@/Utils/tools/algorithm-tools/maze-algo";

export function getRandomNonMazeCell(
  grid: CellType[][],
  eligibleCellsCount: number,
  inMazeCellsCount: number
) {
  const randomCount = Math.floor(
    Math.random() * (eligibleCellsCount - inMazeCellsCount)
  );

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  for (let row = 0; row < rows; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      if (grid[row][col] === CellType.wall) {
        if (count === randomCount) {
          return { row, col };
        }
        count++;
      }
    }
  }

  return null;
}

export function startRandomWalk(
  grid: CellType[][],
  directions: Direction[][],
  startCell: Cell
) {
  const rows = grid.length;
  const cols = grid[0].length;
  let currentCell = startCell;

  while (grid[currentCell.row][currentCell.col] === CellType.wall) {
    const neighbors = getNeighborsWithDirections(currentCell);
    const validNeighbors = filterValidCells(neighbors, rows, cols);
    const { value: randomNeighbor } =
      getObjectIncludedRandomIdxFromArray(validNeighbors);

    directions[currentCell.row][currentCell.col] = randomNeighbor.direction;
    currentCell = randomNeighbor;
  }
}

export function getTravelledPath(
  grid: CellType[][],
  directions: Direction[][],
  startCell: Cell
) {
  const travelledPath: Cell[] = [];
  let currentCell = startCell;
  let visitedCount = 0;

  travelledPath.push(currentCell);
  do {
    const { row, col } = currentCell;
    const direction = directions[row][col];
    visitedCount++;

    switch (direction) {
      case Direction.Up:
        currentCell = { row: row - 2, col };
        travelledPath.push({ row: row - 1, col });
        break;
      case Direction.Down:
        travelledPath.push({ row: row + 1, col });
        currentCell = { row: row + 2, col };
        break;
      case Direction.Left:
        travelledPath.push({ row, col: col - 1 });
        currentCell = { row, col: col - 2 };
        break;
      case Direction.Right:
        travelledPath.push({ row, col: col + 1 });
        currentCell = { row, col: col + 2 };
        break;
    }

    travelledPath.push(currentCell);
  } while (grid[currentCell.row][currentCell.col] !== CellType.clear);

  return { travelledPath, visitedCount };
}

export async function generateWilsonMaze({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const grid = createInitalTypeMaze(rows, cols, CellType.wall);
  updateMaze(grid);

  const directions: Direction[][] = createInitalTypeMaze<Direction>(
    rows,
    cols,
    null
  );
  const eligibleCellsCount = Math.ceil(rows / 2) * Math.ceil(cols / 2);

  let inMazeCellsCount = 0;
  const randomMazeCell = getRandomNonMazeCell(
    grid,
    eligibleCellsCount,
    inMazeCellsCount
  );
  if (!randomMazeCell) {
    return grid;
  }
  inMazeCellsCount++;
  await updateMazeCells(grid, randomMazeCell);

  let randomStartCell = getRandomNonMazeCell(
    grid,
    eligibleCellsCount,
    inMazeCellsCount
  );

  while (randomStartCell) {
    startRandomWalk(grid, directions, randomStartCell);
    const { travelledPath, visitedCount } = getTravelledPath(
      grid,
      directions,
      randomStartCell
    );

    for (const cell of travelledPath) {
      await updateMazeCells(grid, cell);
    }
    inMazeCellsCount += visitedCount;

    randomStartCell = getRandomNonMazeCell(
      grid,
      eligibleCellsCount,
      inMazeCellsCount
    );
  }

  updateMazeCells(grid, entry, CellType.entry);
  updateMazeCells(grid, exit, CellType.exit);
  return grid;
}
