import {
  setMazeCells as setStateCells,
  setMaze,
  setStatus,
  setNumberOfVisitedMazeCell,
} from "@/Store/gameStore/create-channel.slice";

import { AppDispatch, RootState } from "@/Store/store";

import { Cell, CellType, MazeAlgoProps, Status } from "@/Types/gameType";

import { delay } from "@/Utils/tools/async";

export function createMaze(
  createMazeAl: (props: MazeAlgoProps) => Promise<CellType[][]>,
  delayTime: number
) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState().createChannel;

    dispatch(setNumberOfVisitedMazeCell(0));

    dispatch(setStatus(Status.Generating));

    function isGenerating() {
      return getState().createChannel.status === Status.Generating;
    }

    function updateMaze(grid: CellType[][]) {
      if (delayTime) {
        dispatch(setMaze({ grid, clone: true }));
      }
    }

    async function updateMazeCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear
    ) {
      if (!isGenerating()) {
        throw new Error("Maze generation cancelled");
      }

      if (!Array.isArray(cells)) {
        cells = [cells];
      }

      cells.forEach((cell) => {
        grid[cell.row][cell.col] = cellType;
      });

      if (delayTime) {
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayTime);
      }
    }

    try {
      const grid = await createMazeAl({
        rows: state.rows,
        cols: state.cols,
        entry: state.entry,
        exit: state.exit,
        updateMaze,
        updateMazeCells,
      });

      dispatch(setMaze({ grid }));
      dispatch(setStatus(Status.Ready));
    } catch {
      console.error("error");
    }
  };
}
