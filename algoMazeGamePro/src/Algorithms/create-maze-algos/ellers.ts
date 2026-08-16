import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";
import { spliceRandomIdxOfObjectFromArray } from "@/Utils/tools/algorithm-tools/maze-algo";
import { CellType } from "@/Types/gameType/enum";
import { Cell, MazeAlgoProps } from "@/Types/gameType";

export function findSet(
  parents: (string | null)[][],
  cell: { row: number; col: number }
) {
  let currentCell: Cell = cell;

  while (parents[currentCell.row][currentCell.col]) {
    const parent = parents[currentCell.row][currentCell.col] as string;
    currentCell = {
      row: parseInt(parent.split(":")[0]),
      col: parseInt(parent.split(":")[1]),
    };
  }

  return currentCell;
}

export function updateMap(
  map: Map<string, Cell[]>,
  parents: (string | null)[][],
  cell: Cell
) {
  const parent = findSet(parents, cell);
  const key = `${parent.row}:${parent.col}`;
  const value = map.get(key);

  if (value) {
    value.push(cell);
  } else {
    map.set(key, [cell]);
  }
}

export function mergeSets(
  parents: (string | null)[][],
  cellA: Cell,
  cellB: Cell
) {
  const parentA = findSet(parents, cellA);
  const parentB = findSet(parents, cellB);
  const isSameSet = parentA.row === parentB.row && parentA.col === parentB.col;

  if (!isSameSet || !parentA || !parentB) {
    parents[parentA.row][parentA.col] = `${parentB.row}:${parentB.col}`;
    parents[cellA.row][cellA.col] = `${parentB.row}:${parentB.col}`;
    return true;
  }

  return false;
}

export async function extendVerticals(
  grid: CellType[][],
  parents: (string | null)[][],
  map: Map<string, Cell[]>,
  updateMazeCells: MazeAlgoProps["updateMazeCells"]
) {
  for (const cells of map.values()) {
    const verticalsCount = 1 + Math.floor(Math.random() * (cells.length - 1));

    for (let i = 0; i < verticalsCount; i++) {
      const cell = spliceRandomIdxOfObjectFromArray(cells);
      const passageCell = { row: cell.row + 1, col: cell.col };
      const verticalCell = { row: cell.row + 2, col: cell.col };
      mergeSets(parents, verticalCell, cell);
      await updateMazeCells(grid, passageCell, CellType.clear);
    }
  }
}

export async function generateEllersMaze({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const grid = createInitalTypeMaze(rows, cols, CellType.wall);
  updateMaze(grid);

  const parents = createInitalTypeMaze(rows, cols, null);
  const map = new Map<string, Cell[]>();

  for (let row = 0; row < rows - 2; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      await updateMazeCells(grid, { row, col });

      if (col === 0) {
        updateMap(map, parents, { row, col });
        continue;
      }

      if (Math.random() > 0.5) {
        if (mergeSets(parents, { row, col }, { row, col: col - 2 })) {
          await updateMazeCells(grid, [{ row, col: col - 1 }]);
        }
      }

      updateMap(map, parents, { row, col });
    }

    await extendVerticals(grid, parents, map, updateMazeCells);
    map.clear();
  }

  const row = rows - 1;
  for (let col = 0; col < cols; col += 2) {
    await updateMazeCells(grid, { row, col });

    if (col === 0) {
      continue;
    }

    if (mergeSets(parents, { row, col }, { row, col: col - 2 })) {
      await updateMazeCells(grid, [{ row, col: col - 1 }]);
    }
  }

  updateMazeCells(grid, entry, CellType.entry);
  updateMazeCells(grid, exit, CellType.exit);
  return grid;
}
