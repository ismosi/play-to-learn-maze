import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";
import { CellType, MazeAlgoProps } from "@/Types/gameType";
import { getOddIdxRandom } from "@/Utils/tools/algorithm-tools/maze-algo";

interface Direction {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export async function addStages(
  grid: CellType[][],
  updateMazeCells: MazeAlgoProps["updateMazeCells"]
) {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 1; row < rows / 2; row += 2) {
    for (let col = row; col < cols - row; col++) {
      await updateMazeCells(
        grid,
        [
          { row, col },
          { row: rows - row - 1, col },
        ],
        CellType.wall
      );
    }
  }

  for (let col = 1; col < cols / 2; col += 2) {
    for (let row = col; row < rows - col - 1; row++) {
      await updateMazeCells(
        grid,
        [
          { row, col },
          { row, col: cols - col - 1 },
        ],
        CellType.wall
      );
    }
  }
}

export async function addVerticalBlocks(
  grid: CellType[][],
  updateMazeCells: MazeAlgoProps["updateMazeCells"],
  stage: number
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const top = getOddIdxRandom(stage + 2, cols - stage - 3);
  const bottom = getOddIdxRandom(stage + 2, cols - stage - 3);

  await updateMazeCells(
    grid,
    [
      { row: stage, col: top },
      { row: rows - stage - 1, col: bottom },
    ],
    CellType.wall
  );
  return { top, bottom };
}

export async function addHorizontalBlocks(
  grid: CellType[][],
  updateMazeCells: MazeAlgoProps["updateMazeCells"],
  stage: number
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const left = getOddIdxRandom(stage + 2, rows - stage - 3);
  const right = getOddIdxRandom(stage + 2, rows - stage - 3);

  await updateMazeCells(
    grid,
    [
      { row: right, col: cols - stage - 1 },
      { row: left, col: stage },
    ],
    CellType.wall
  );
  return { left, right };
}

export function getTopRightCells({
  cols,
  stage,
  top,
  right,
}: {
  cols: number;
  stage: number;
  top: number;
  right: number;
}) {
  const cells = [];
  if (top !== 0) {
    for (let i = top + 1; i < cols - stage - 1; i += 2) {
      cells.push({ row: stage + 1, col: i });
    }
  }
  if (right !== 0) {
    for (let i = stage + 2; i < right; i += 2) {
      cells.push({ row: i, col: cols - stage - 2 });
    }
  }

  return cells;
}

export function getRightBottomCells({
  rows,
  cols,
  stage,
  right,
  bottom,
}: {
  rows: number;
  cols: number;
  stage: number;
  right: number;
  bottom: number;
}) {
  const cells = [];
  if (right !== 0) {
    for (let i = right + 1; i < rows - stage - 1; i += 2) {
      cells.push({ row: i, col: cols - stage - 2 });
    }
  }
  if (bottom !== 0) {
    for (let i = cols - stage - 3; i > bottom; i -= 2) {
      cells.push({ row: rows - stage - 2, col: i });
    }
  }
  return cells;
}

export function getBottomLeftCells({
  rows,
  stage,
  bottom,
  left,
}: {
  rows: number;
  stage: number;
  bottom: number;
  left: number;
}) {
  const cells = [];
  if (bottom !== 0) {
    for (let i = bottom - 1; i > stage; i -= 2) {
      cells.push({ row: rows - stage - 2, col: i });
    }
  }
  if (left !== 0) {
    for (let i = rows - stage - 3; i > left; i -= 2) {
      cells.push({ row: i, col: stage + 1 });
    }
  }
  return cells;
}

export function getLeftTopCells({
  stage,
  top,
  left,
}: {
  stage: number;
  top: number;
  left: number;
}) {
  const cells = [];
  if (left !== 0) {
    for (let i = left - 1; i > stage + 1; i -= 2) {
      cells.push({ row: i, col: stage + 1 });
    }
  }
  if (top !== 0) {
    for (let i = stage + 2; i < top; i += 2) {
      cells.push({ row: stage + 1, col: i });
    }
  }
  return cells;
}

export async function addGaps(
  grid: CellType[][],
  updateMazeCells: MazeAlgoProps["updateMazeCells"],
  stage: number,
  { top, right, bottom, left }: Direction
) {
  const rows = grid.length;
  const cols = grid[0].length;

  const topRightCells = getTopRightCells({ cols, stage, top, right });
  const rightBottomCells = getRightBottomCells({
    rows,
    cols,
    stage,
    right,
    bottom,
  });
  const bottomLeftCells = getBottomLeftCells({ rows, stage, bottom, left });
  const leftTopCells = getLeftTopCells({ stage, top, left });

  const topRightRandom = Math.floor(Math.random() * topRightCells.length);
  const rightBottomRandom = Math.floor(Math.random() * rightBottomCells.length);
  const bottomLeftRandom = Math.floor(Math.random() * bottomLeftCells.length);
  const leftTopRandom = Math.floor(Math.random() * leftTopCells.length);

  if (top === 0 || right === 0) {
    await updateMazeCells(grid, [
      topRightCells[topRightRandom],
      bottomLeftCells[bottomLeftRandom],
    ]);
  } else {
    await updateMazeCells(grid, [
      topRightCells[topRightRandom],
      rightBottomCells[rightBottomRandom],
      bottomLeftCells[bottomLeftRandom],
      leftTopCells[leftTopRandom],
    ]);
  }
}

export async function generateLabyrinthMaze({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const grid = createInitalTypeMaze(rows, cols, CellType.clear);
  updateMaze(grid);
  await addStages(grid, updateMazeCells);

  const maxStage = Math.min(rows, cols) / 2 - 2;
  for (let i = 0; i < maxStage; i += 2) {
    let left = 0,
      right = 0,
      top = 0,
      bottom = 0;
    if (rows - 2 * i > 5) {
      ({ left, right } = await addHorizontalBlocks(grid, updateMazeCells, i));
    }

    if (cols - 2 * i > 5) {
      ({ top, bottom } = await addVerticalBlocks(grid, updateMazeCells, i));
    }

    if (rows - 2 * i > 5 || cols - 2 * i > 5) {
      await addGaps(grid, updateMazeCells, i, { top, right, bottom, left });
    }
  }

  const centerPos = Math.floor(rows / 2);
  if (rows === cols && centerPos % 2 === 0) {
    const centerLoop = [
      { row: centerPos, col: centerPos - 1 },
      { row: centerPos, col: centerPos + 1 },
      { row: centerPos - 1, col: centerPos },
      { row: centerPos + 1, col: centerPos },
    ];

    const random = Math.floor(Math.random() * centerLoop.length);
    await updateMazeCells(grid, centerLoop[random], CellType.clear);
  }

  updateMazeCells(grid, entry, CellType.entry);
  updateMazeCells(grid, exit, CellType.exit);
  return grid;
}
