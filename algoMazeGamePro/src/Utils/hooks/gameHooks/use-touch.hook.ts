import { useCallback, useEffect, useRef } from "react";
import { CellElement, CellType } from "@/Types/gameType";
import { getSpecificSelectedCellDetails } from "@/Utils/tools/algorithm-tools/maze-algo";
import { useAppDispatch } from "@/Store/hooks";
import { setCell } from "@/Store/gameStore/create-channel.slice";

interface Props {
  isMobile: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export function useTouch({ isMobile, ref }: Props) {
  const dispatch = useAppDispatch();
  const tempCellRef = useRef<CellElement | null>(null);

  const onClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { isValidCell, selectedCell } = getSpecificSelectedCellDetails(
        e.target as HTMLElement
      );

      if (!isValidCell) {
        return;
      }

      if (tempCellRef.current) {
        if (
          ![CellType.entry, CellType.exit, CellType.wall].includes(
            selectedCell.cellType
          )
        ) {
          dispatch(
            setCell({
              ...selectedCell,
              cellType: tempCellRef.current.cellType,
            })
          );
        }
        tempCellRef.current = null;
        return;
      }

      if ([CellType.entry, CellType.exit].includes(selectedCell.cellType)) {
        tempCellRef.current = selectedCell;
        return;
      }

      dispatch(
        setCell({
          row: selectedCell.row,
          col: selectedCell.col,
          cellType:
            selectedCell.cellType === CellType.wall
              ? CellType.clear
              : CellType.wall,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const referenceEl = ref.current;
    if (!referenceEl) {
      return;
    }

    referenceEl.addEventListener("click", onClick);
    return () => {
      referenceEl.removeEventListener("mousedown", onClick);
    };
  }, [isMobile, onClick, ref]);
}
