import { AppDispatch, RootState } from "@/Store/store";
import { delay } from "@/Utils/tools/async";
import { Cell, CellType, SearchAlgoProps, Status } from "@/Types/gameType";
import {
  setMazeCells as setStateCells,
  setNumberOfVisitedMazeCell,
} from "@/Store/gameStore/create-channel.slice";

export function searchPath(
  pathFinderAlgo: (
    props: SearchAlgoProps
  ) => Promise<{ grid: CellType[][]; parents: Cell[][] | null }>,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let numberOfVisitedMazeCell = 0;

    function isSearching() {
      return getState().createChannel.status === Status.Searching;
    }

    async function updateMazeCells(
      grid: CellType[][],
      cells: Cell | Cell[],
      cellType = CellType.clear
    ) {
      if (!isSearching()) {
        throw new Error("Path search cancelled");
      }

      if (!Array.isArray(cells)) {
        cells = [cells];
      }
      cells.forEach((cell) => {
        grid[cell.row][cell.col] = cellType;
      });

      numberOfVisitedMazeCell += cells.length;
      if (delayDuration) {
        dispatch(setNumberOfVisitedMazeCell(numberOfVisitedMazeCell));
        dispatch(setStateCells({ cells, cellType }));
        await delay(delayDuration);
      }
    }

    const state = getState().createChannel;
    const { grid, parents } = await pathFinderAlgo({
      grid: state.grid,
      entry: state.entry,
      exit: state.exit,
      updateMazeCells,
    });
    dispatch(setNumberOfVisitedMazeCell(numberOfVisitedMazeCell));
    return { grid, parents };
  };
}
