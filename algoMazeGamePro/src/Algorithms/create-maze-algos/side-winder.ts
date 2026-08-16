import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";

import { CellType, MazeAlgoProps } from "@/Types/gameType";

// 逐行构建迷宫，并在每行中随机选择一些连续的单元格（称为“run”），然后为每个 run 随机选择一个向北的出口
export async function generateSideWinderMaze({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  console.log(
    "generateSideWinderMazegenerateSideWinderMazegenerateSideWinderMazegenerateSideWinderMazegenerateSideWinderMaze"
  );
  const grid = createInitalTypeMaze(rows, cols, CellType.wall);
  updateMaze(grid);

  // // 将第一行所有单元格设置为通道
  const topRowCells = grid[0].map((_, i) => ({ row: 0, col: i }));
  await updateMazeCells(grid, topRowCells);

  //  // 逐行构建迷宫
  for (let row = 2; row < rows; row += 2) {
    for (let col = 0; col < cols; col += 2) {
      //  // 当前行的单元格设置为通道
      const run = [{ row, col }];
      const runCells = [{ row, col }];
      while (col < cols - 2 && Math.random() < 0.5) {
        // // 决定是否继续扩展 run 或者结束当前 run 并打通北向出口
        // // 随机选择一个单元格打通北向出口
        col += 2;
        run.push({ row, col });
        runCells.push({ row, col: col - 1 }, { row, col });
      }

      const northCell = run[Math.floor(Math.random() * run.length)];
      //  // 清除 run 中的所有单元格
      runCells.push({ row: northCell.row - 1, col: northCell.col });
      await updateMazeCells(grid, runCells);
    }
  }

  updateMazeCells(grid, entry, CellType.entry);
  updateMazeCells(grid, exit, CellType.exit);
  return grid;
}
