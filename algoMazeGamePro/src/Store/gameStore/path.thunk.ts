import { AppDispatch, RootState } from "@/Store/store";
import {
  setCell as setStateCell,
  setPathLength,
} from "@/Store/gameStore/create-channel.slice";

import { Cell, CellType, Status } from "@/Types/gameType";
import { toast } from "sonner";
import { tracePath } from "@/Algorithms/chennel-success-finder/path-tracer";
import { delay } from "@/Utils/tools/async";

export function highlightPath(
  grid: CellType[][],
  parents: Cell[][] | null,
  delayDuration: number
) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let pathLength = 0;

    function isSearching() {
      return getState().createChannel.status === Status.Searching;
    }

    async function updateCell(cell: Cell, cellType = CellType.path) {
      if (!isSearching()) {
        throw new Error("Path search cancelled");
      }

      grid[cell.row][cell.col] = cellType;

      pathLength += 1;
      if (delayDuration) {
        dispatch(setPathLength(pathLength));
        dispatch(setStateCell({ ...cell, cellType }));
        await delay(delayDuration);
      }
    }

    const state = getState().createChannel;
    if (parents) {
      toast.success("Path found!!! 😃");
      const pathLength = await tracePath({
        parents,
        entry: state.entry,
        exit: state.exit,
        updateCell,
      });

      dispatch(setPathLength(pathLength + 1));
    } else {
      toast.error("No path found 😔");
    }
  };
}
