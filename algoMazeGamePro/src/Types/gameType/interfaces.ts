import { CellType, Status } from "./enum";

export interface Cell {
  row: number;
  col: number;
}

export interface CellElement extends Cell {
  cellType: CellType;
}

export interface AppState {
  rows: number;
  cols: number;
  grid: number[][];
  entry: Cell;
  exit: Cell;
  status: Status;
  numberOfVisitedMazeCell: number;
  pathLength: number;
  gameTime: number;
  steps: number;
}

export interface SearchAlgoProps {
  grid: number[][];
  entry: Cell;
  exit: Cell;
  updateMazeCells: (
    grid: number[][],
    cells: Cell | Cell[],
    cellType?: CellType
  ) => Promise<void>;
}

export interface MazeAlgoProps {
  rows: number;
  cols: number;
  entry: Cell;
  exit: Cell;
  updateMaze: (grid: number[][]) => void;
  updateMazeCells: (
    grid: number[][],
    cells: Cell | Cell[],
    cellType?: CellType
  ) => Promise<void>;
}

export interface PathAlgoProps {
  parents: Cell[][];
  entry: Cell;
  exit: Cell;
  updateCell: (value: Cell) => Promise<void>;
}
