import { useEffect, useState, useCallback, useRef } from "react"; // 添加 useRef

import { useAppDispatch, useAppSelector } from "../../../../../Store/hooks";
import { resetMaze } from "@/Store/gameStore/create-channel.slice";

import { createMaze } from "@/Store/gameStore/maze.thunk";

import { mazeGenerators } from "@/Algorithms";

// import { algorithms } from "@/Configs/gameConfig.ts";
import { Status } from "@/Types/gameType";
import { speeds } from "@/Configs/gameConfig";

import { RefreshCcw } from "lucide-react";

import classes from "../controller.module.scss";

function MazeControls() {
  const dispatch = useAppDispatch();

  const [maze, setMaze] = useState<string>("");

  const [speed, setSpeed] = useState(1);

  const mazeAlgo = maze ? mazeGenerators.get(maze) : null;

  const algorithms = useAppSelector((store) => store.algoSlice.algorithms);

  const gameNumber = useAppSelector((store) => store.app.gameNumber);
  const currentAlgorithm = algorithms.find((item) => item.index === gameNumber)
    ?.englishName as string;

  const isFirstRender = useRef(true);

  const prevSpeed = useRef(speed);
  const prevMazeAlgo = useRef(mazeAlgo);

  const createMazeFn = useCallback(
    (mazeAl: string) => {
      if (!mazeAl) return;

      // 检查是否是首次渲染或者参数发生变化
      const shouldExecute =
        isFirstRender.current ||
        speed !== prevSpeed.current ||
        mazeAlgo !== prevMazeAlgo.current;

      if (!shouldExecute) return;

      function mazeClickHandler(mazeAl = mazeAlgo) {
        if (mazeAl) {
          dispatch(createMaze(mazeAl.fn, speed));
          isFirstRender.current = false;
          prevSpeed.current = speed;
          prevMazeAlgo.current = mazeAlgo;
        }
      }
      mazeClickHandler(mazeGenerators.get(mazeAl));
    },
    [dispatch, speed, mazeAlgo]
  );

  useEffect(() => {
    createMazeFn(currentAlgorithm);
  }, [createMazeFn, currentAlgorithm]);

  const status = useAppSelector((state) => state.createChannel.status);
  const disabled = status === Status.Generating || status === Status.Searching;

  function refreshMaze() {
    dispatch(resetMaze());
  }
  return (
    <div className={classes.operation + " select-maze"}>
      <div className={classes.speedContainer}>
        <select
          id="speed-select"
          name="speed-select"
          value={speed}
          disabled={disabled}
          className={classes.speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        >
          {[...speeds.entries()].map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={refreshMaze}
        id="refresh"
        data-tooltip="Reset"
        data-testid="reset"
      >
        <RefreshCcw size={15} />
      </button>
    </div>
  );
}

export default MazeControls;
