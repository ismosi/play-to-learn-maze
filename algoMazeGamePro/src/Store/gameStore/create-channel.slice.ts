import "@/Configs/gameConfig";
import {
  AppState,
  Cell,
  CellElement,
  CellType,
  Status,
} from "@/Types/gameType";
import {
  createInitalTypeMaze,
  getDimensionsFromScreenSize,
  initGrid,
} from "@/Utils/tools/algorithm-tools/maze-algo";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const { maxRows, maxCols } = getDimensionsFromScreenSize();

const initialState: AppState = {
  rows: maxRows,
  cols: maxCols,
  entry: { row: 0, col: 0 },
  exit: { row: maxRows - 1, col: maxCols - 1 },
  grid: initGrid(maxRows, maxCols),
  status: Status.Ready,
  numberOfVisitedMazeCell: 0,
  pathLength: 0,
  gameTime: 0,
  steps: 0,
};

export const createChannelSlice = createSlice({
  name: "createChannel",
  initialState,
  reducers: {
    setMeasurement: (
      state,
      action: PayloadAction<{ rows?: number; cols?: number }>
    ) => {
      state.rows = action.payload.rows ?? state.rows;
      state.cols = action.payload.cols ?? state.cols;
    },
    setMaze: (
      state,
      action: PayloadAction<{ grid: CellType[][]; clone?: boolean }>
    ) => {
      if (!action.payload.clone) {
        state.grid = action.payload.grid;
        return;
      }

      const gridClone = action.payload.grid.map((row) => row.slice());
      state.grid = gridClone;
    },
    setMazeCells: (
      state,
      action: PayloadAction<{ cells: Cell[]; cellType: CellType }>
    ) => {
      const { cells, cellType } = action.payload;

      const gridClone = state.grid.map((row) => row.slice());
      cells.forEach((cell) => {
        gridClone[cell.row][cell.col] = cellType;
      });

      state.grid = gridClone;
    },
    resetMaze: (state) => {
      const grid = createInitalTypeMaze(state.rows, state.cols, CellType.clear);
      if (state.entry.row >= state.rows) {
        state.entry.row = state.rows - 1;
      }
      if (state.entry.col >= state.cols) {
        state.entry.col = state.cols - 1;
      }
      if (state.exit.row >= state.rows) {
        state.exit.row = state.rows - 1;
      }
      if (state.exit.col >= state.cols) {
        state.exit.col = state.cols - 1;
      }
      grid[state.entry.row][state.entry.col] = CellType.entry;
      grid[state.exit.row][state.exit.col] = CellType.exit;

      state.grid = grid;
      state.status = Status.Ready;
    },
    setCell: (state, action: PayloadAction<CellElement>) => {
      const payload = action.payload;

      if (
        payload.cellType === CellType.entry ||
        payload.cellType === CellType.exit
      ) {
        const cellType = payload.cellType === CellType.entry ? "entry" : "exit";
        const { row, col } = state[cellType];
        state.grid[row][col] = CellType.clear;
        state[cellType] = {
          row: payload.row,
          col: payload.col,
        };
      }
      state.grid[payload.row][payload.col] = payload.cellType;
    },

    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },

    setNumberOfVisitedMazeCell: (state, action: PayloadAction<number>) => {
      state.numberOfVisitedMazeCell = action.payload;
    },

    setPathLength: (state, action: PayloadAction<number>) => {
      state.pathLength = action.payload;
    },
    setGameTime: (state, action: PayloadAction<number>) => {
      state.gameTime = action.payload;
    },
    setSteps: (state, action: PayloadAction<number>) => {
      state.steps = action.payload;
    },
    clearGrid: (state) => {
      const gridClone = state.grid.map((row) => row.slice());
      for (let i = 0; i < state.rows; i++) {
        for (let j = 0; j < state.cols; j++) {
          if (
            gridClone[i][j] === CellType.visited ||
            gridClone[i][j] === CellType.path
          ) {
            gridClone[i][j] = CellType.clear;
          }
        }
      }
      state.grid = gridClone;
      state.status = Status.Ready;
    },
  },
});

export const {
  setMeasurement,
  setMaze,
  setCell,
  setMazeCells,
  resetMaze,
  setStatus,
  setNumberOfVisitedMazeCell,
  setPathLength,
  setGameTime,
  setSteps,
  clearGrid,
} = createChannelSlice.actions;
export default createChannelSlice.reducer;
