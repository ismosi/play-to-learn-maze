import { useEffect, useRef } from "react";

import { CellElement, CellType } from "@/Types/gameType";

import useDiyMazeByMouseHook from "@/Utils/hooks/gameHooks/use-diy-maze-hook";
import { getSpecificSelectedCellDetails } from "@/Utils/tools/algorithm-tools/maze-algo";

import { useAppDispatch } from "@/Store/hooks";
import { setCell } from "@/Store/gameStore/create-channel.slice";

interface Props {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
  enabled?: boolean; // 添加启用状态控制
}

export function useDIYMazeByMouseHook({
  isMobile,
  ref,
  enabled = true,
}: Props) {
  const dispatch = useAppDispatch();
  const { element, isMouseDown } = useDiyMazeByMouseHook({
    isMobile,
    ref,
    enabled,
  });
  const { isPropertyMazeCell, chosenMazeCell } =
    getSpecificSelectedCellDetails(element);

  const tempCellRef = useRef<CellElement | null>(null);
  const prevCellRef = useRef<CellElement | null>(null);

  useEffect(() => {
    if (!isMouseDown) {
      tempCellRef.current = null;
      prevCellRef.current = null;
    }
  }, [isMouseDown]);

  useEffect(() => {
    if (!isPropertyMazeCell) {
      return;
    }

    if (tempCellRef.current) {
      if (
        ![CellType.entry, CellType.exit, CellType.wall].includes(
          chosenMazeCell.cellType
        )
      ) {
        dispatch(
          setCell({
            ...chosenMazeCell,
            cellType: tempCellRef.current.cellType,
          })
        );
      }
      return;
    }

    if ([CellType.entry, CellType.exit].includes(chosenMazeCell.cellType)) {
      tempCellRef.current = chosenMazeCell;
      return;
    }

    const isEqualPreMazeCel =
      prevCellRef.current?.row === chosenMazeCell.row &&
      prevCellRef.current?.col === chosenMazeCell.col;
    if (!isEqualPreMazeCel) {
      dispatch(
        setCell({
          row: chosenMazeCell.row,
          col: chosenMazeCell.col,
          cellType:
            chosenMazeCell.cellType === CellType.wall
              ? CellType.clear
              : CellType.wall,
        })
      );
      prevCellRef.current = chosenMazeCell;
    }
  }, [isPropertyMazeCell, chosenMazeCell, dispatch]);
}
