import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";
import { CellType, MazeAlgoProps } from "@/Types/gameType";

import {
  getEvenIdxRandom,
  getOddIdxRandom,
} from "@/Utils/tools/algorithm-tools/maze-algo";

interface createWallConfig {
  updateMazeCells: MazeAlgoProps["updateMazeCells"];
  partitionDot: number;
  channelDot: number;
  start: number;
  end: number;
}

export async function createXDirctionWall(
  maze: CellType[][],
  { updateMazeCells, partitionDot, channelDot, start, end }: createWallConfig
) {
  for (let pos = start; pos <= end; pos++) {
    await updateMazeCells(maze, { row: partitionDot, col: pos }, CellType.wall);
  }
  await updateMazeCells(maze, { row: partitionDot, col: channelDot });
}

export async function createYDirctionWall(
  maze: CellType[][],
  { updateMazeCells, partitionDot, channelDot, start, end }: createWallConfig
) {
  for (let pos = start; pos <= end; pos++) {
    await updateMazeCells(maze, { row: pos, col: partitionDot }, CellType.wall);
  }
  await updateMazeCells(maze, { row: channelDot, col: partitionDot });
}

export async function recursivePartition(
  maze: CellType[][],
  updateMazeCells: MazeAlgoProps["updateMazeCells"],
  {
    rowStart,
    rowEnd,
    colStart,
    colEnd,
  }: {
    rowStart: number;
    rowEnd: number;
    colStart: number;
    colEnd: number;
  }
) {
  if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
    return;
  }

  const width = colEnd - colStart;
  const height = rowEnd - rowStart;
  const isHorizontal = width < height;

  if (isHorizontal) {
    const partitionDot = getOddIdxRandom(rowStart, rowEnd);
    const channelDot = getEvenIdxRandom(colStart, colEnd);

    await createXDirctionWall(maze, {
      updateMazeCells,
      partitionDot,
      channelDot,
      start: colStart,
      end: colEnd,
    });

    await recursivePartition(maze, updateMazeCells, {
      rowStart,
      rowEnd: partitionDot - 1,
      colStart,
      colEnd,
    });
    await recursivePartition(maze, updateMazeCells, {
      rowStart: partitionDot + 1,
      rowEnd,
      colStart,
      colEnd,
    });
  } else {
    const partitionDot = getOddIdxRandom(colStart, colEnd);
    const channelDot = getEvenIdxRandom(rowStart, rowEnd);

    await createYDirctionWall(maze, {
      updateMazeCells,
      partitionDot,
      channelDot,
      start: rowStart,
      end: rowEnd,
    });

    await recursivePartition(maze, updateMazeCells, {
      rowStart,
      rowEnd,
      colStart,
      colEnd: partitionDot - 1,
    });
    await recursivePartition(maze, updateMazeCells, {
      rowStart,
      rowEnd,
      colStart: partitionDot + 1,
      colEnd,
    });
  }
}

export async function createMazeByRecursivePartition({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const maze = createInitalTypeMaze(rows, cols, CellType.clear);
  updateMaze(maze);

  await recursivePartition(maze, updateMazeCells, {
    rowStart: 0,
    rowEnd: rows - 1,
    colStart: 0,
    colEnd: cols - 1,
  });

  updateMazeCells(maze, entry, CellType.entry);
  updateMazeCells(maze, exit, CellType.exit);

  return maze;
}
