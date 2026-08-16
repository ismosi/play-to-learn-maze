import { createInitalTypeMaze } from "@/Utils/tools/algorithm-tools/maze-algo";
import { MazeAlgoProps } from "@/Types/gameType";
import { CellType } from "@/Types/gameType/enum";

enum EdgeType {
  horizontal,
  vertical,
}

function getEdges(grid: CellType[][]) {
  const edges = [];
  for (let row = 0; row < grid.length; row++) {
    const start = row % 2 === 0 ? 1 : 0;
    for (let col = start; col < grid[0].length; col += 2) {
      edges.push({
        row,
        col,
        edgeType: row % 2 === 0 ? EdgeType.horizontal : EdgeType.vertical,
      });
    }
  }
  return edges;
}

function getCells(grid: CellType[][]) {
  const cells = [];
  for (let row = 0; row < grid.length; row += 2) {
    for (let col = 0; col < grid[0].length; col += 2) {
      cells.push({ row, col });
    }
  }
  return cells;
}

function getConnections({
  row,
  col,
  edgeType,
}: {
  row: number;
  col: number;
  edgeType: EdgeType;
}) {
  if (edgeType === EdgeType.horizontal) {
    return [
      { row: row, col: col - 1 },
      { row: row, col: col + 1 },
    ];
  }

  return [
    { row: row - 1, col: col },
    { row: row + 1, col: col },
  ];
}

export async function generateKruskalMaze({
  rows,
  cols,
  entry,
  exit,
  updateMaze,
  updateMazeCells,
}: MazeAlgoProps) {
  const grid = createInitalTypeMaze(rows, cols, CellType.wall);
  updateMaze(grid);

  const edges = getEdges(grid);
  const cells = getCells(grid);
  const sets = cells.map(({ row, col }) => new Set([`${row}-${col}`]));

  while (edges.length) {
    const randomEdgeIdx = Math.floor(Math.random() * edges.length);
    const randomEdge = edges.splice(randomEdgeIdx, 1)[0];
    const [cell1, cell2] = getConnections(randomEdge);

    const set1 = sets.find((set) =>
      set.has(`${cell1.row}-${cell1.col}`)
    ) as Set<string>;
    const set2 = sets.find((set) =>
      set.has(`${cell2.row}-${cell2.col}`)
    ) as Set<string>;

    if (set1 !== set2) {
      set2.forEach((cell) => set1.add(cell));
      sets.splice(sets.indexOf(set2), 1);
      await updateMazeCells(grid, [cell1, cell2, randomEdge]);
    } else {
      await updateMazeCells(grid, randomEdge, CellType.wall);
    }
  }

  updateMazeCells(grid, entry, CellType.entry);
  updateMazeCells(grid, exit, CellType.exit);
  return grid;
}
