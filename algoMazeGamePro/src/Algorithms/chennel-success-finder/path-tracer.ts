import { PathAlgoProps } from "@/Types/gameType";

export async function tracePath({
  parents,
  entry,
  exit,
  updateCell,
}: PathAlgoProps) {
  let row = exit.row;
  let col = exit.col;
  [row, col] = [parents[row][col].row, parents[row][col].col];

  let pathLength = 0;
  if (entry.row === row && entry.col === col) {
    return pathLength;
  }

  do {
    await updateCell({ row, col });
    [row, col] = [parents[row][col].row, parents[row][col].col];
    pathLength += 1;
  } while (entry.row !== row || entry.col !== col);

  return pathLength;
}
