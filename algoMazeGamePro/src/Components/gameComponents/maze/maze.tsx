import { useEffect, useRef, useState, useCallback } from "react"; // 添加 useState 导入

import { useAppSelector, useAppDispatch } from "../../../Store/hooks";

import { Status } from "@/Types/gameType";
import { cellSize, characters } from "@/Configs/gameConfig";

import { checkIsDeskTopDevice } from "@/Utils/tools/algorithm-tools/maze-algo";
import { useDIYMazeByMouseHook } from "@/Utils/hooks/gameHooks/use-diy-maze-by-mouse";

import classes from "./maze.module.scss";

import Player1 from "@/Views/Game/Player/1Player";

import { toast } from "sonner";

import GameCompleteModal from "../game-complete-modal/game-complete-modal";

import {
  setGameTime as setGameTimeAction,
  setSteps as setStepsAction,
} from "@/Store/gameStore/create-channel.slice.ts";
import {
  setBestTime,
  setBestSteps,
  incrementCompletedLevels,
} from "@/Store/app.slice";
import { setAlgoUnlock } from "@/Store/gameStore/algo-slice.slice";

// 在文件顶部添加类型声明
declare global {
  interface Window {
    keyListenerAdded: boolean;
  }
}

function Maze() {
  const dispatch = useAppDispatch();

  const gameNumber = useAppSelector((state) => state.app.gameNumber);

  const gameNumberMap = {
    一: "1",
    二: "2",
    三: "3",
    四: "4",
    五: "5",
    六: "6",
    七: "7",
    八: "8",
    九: "9",
  };
  const gameNumberIndexMap = {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
  };

  const grid = useAppSelector((state) => state.createChannel.grid);
  const status = useAppSelector((state) => state.createChannel.status);
  const scene = useAppSelector((state) => state.app.scene);

  const ref = useRef<HTMLDivElement>(null);

  // 添加状态控制是否可以 DIY 迷宫
  const [canDIYMaze, setCanDIYMaze] = useState(false);
  useDIYMazeByMouseHook({
    isMobile: checkIsDeskTopDevice(),
    ref,
    enabled: canDIYMaze,
  });

  // 获取场景
  useEffect(() => {
    function setMapColorSeries(scene: string) {
      let cellColors = null;
      switch (scene) {
        case "🩸沙漠迷宫🩸": {
          cellColors = {
            entry: "rgba(73, 96, 230, 1.00)",
            path: "rgba(189, 201, 237, 1.00)",
            pathBorder: "rgba(249, 216, 190, 1.00)",
            wall: "rgba(121, 87, 62, 1.00)",
            visited: "rgba(204, 165, 122, 1.00)",
            visitedMid: "rgba(227, 197, 119, 1.00)",
            visitedStart: "rgba(234, 222, 171, 1.00)",
            exit: "rgba(212, 73, 76, 1.00)",
            clear: "rgba(249, 238, 215, 1.00)",
          };
          break;
        }
        case "🌿森林迷宫🌿": {
          cellColors = {
            entry: "rgba(73, 96, 230, 1.00)",
            path: "rgba(189, 201, 237, 1.00)",
            pathBorder: "rgba(49, 81, 19, 1.00)",
            wall: "rgba(17, 34, 5, 1.00)",
            visited: "rgba(34, 52, 17, 1.00)",
            visitedMid: "rgba(34, 52, 17, 1.00)",
            visitedStart: "rgba(49, 81, 19, 1.00)",
            exit: "rgba(212, 73, 76, 1.00)",
            clear: "rgba(82, 135, 44, 1.00)",
          };
          break;
        }
        case "❄️冰雪迷宫❄️": {
          cellColors = {
            entry: "rgba(73, 96, 230, 1.00)",
            path: "rgba(189, 201, 237, 1.00)",
            pathBorder: "rgba(233, 249, 251, 1.00)",
            wall: "rgba(161, 179, 191, 1.00)",
            visited: "rgba(200, 222, 226, 1.00)",
            visitedMid: "rgba(200, 222, 226, 1.00)",
            visitedStart: "rgba(233, 249, 251, 1.00)",
            exit: "rgba(212, 73, 76, 1.00)",
            clear: "rgba(242, 250, 252, 1.00)",
          };
          break;
        }
        default: {
          cellColors = {
            entry: "rgba(73, 96, 230, 1.00)",
            path: "rgba(189, 201, 237, 1.00)",
            pathBorder: "rgba(249, 216, 190, 1.00)",
            wall: "rgba(121, 87, 62, 1.00)",
            visited: "rgba(204, 165, 122, 1.00)",
            visitedMid: "rgba(227, 197, 119, 1.00)",
            visitedStart: "rgba(234, 222, 171, 1.00)",
            exit: "rgba(212, 73, 76, 1.00)",
            clear: "rgba(249, 238, 215, 1.00)",
          };
          break;
        }
      }
      const root = document.querySelector(":root") as HTMLElement;

      root.style.setProperty("--maze-cell-size", cellSize + "px");

      root.style.setProperty("--maze-cell-entry", cellColors.entry);
      root.style.setProperty("--maze-cell-path", cellColors.path);
      root.style.setProperty("--maze-cell-path-border", cellColors.pathBorder);
      root.style.setProperty("--maze-cell-wall", cellColors.wall);
      root.style.setProperty("--maze-cell-visited", cellColors.visited);
      root.style.setProperty("--maze-cell-visited-mid", cellColors.visitedMid);
      root.style.setProperty(
        "--maze-cell-visited-start",
        cellColors.visitedStart
      );
      root.style.setProperty("--maze-cell-exit", cellColors.exit);
      root.style.setProperty("--maze-cell-clear", cellColors.clear);
    }
    setMapColorSeries(scene as string);
  }, [scene]);

  // 获取玩家
  const player = useAppSelector((state) => state.app.player);

  let currentPlayerCom = null;
  const currentPlayer = characters.find((item) => item.name == player);
  if (currentPlayer) currentPlayerCom = currentPlayer.com;
  else currentPlayerCom = Player1;

  // 监听玩家位置变化
  // 使用 useState 管理玩家位置
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });

  // 处理键盘按下事件
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      let newRow = playerPosition.row;
      let newCol = playerPosition.col;

      switch (event.key) {
        case "ArrowUp":
          newRow--;
          break;
        case "ArrowDown":
          newRow++;
          break;
        case "ArrowLeft":
          newCol--;
          break;
        case "ArrowRight":
          newCol++;
          break;
        default:
          return;
      }

      // 检查移动是否有效
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length &&
        (grid[newRow][newCol] === 0 ||
          grid[newRow][newCol] === 1 ||
          grid[newRow][newCol] === 2)
      ) {
        setPlayerPosition({ row: newRow, col: newCol });
        setSteps((prev) => {
          const newSteps = prev + 1;
          dispatch(setStepsAction(newSteps));
          return newSteps;
        }); // 增加步数

        // 在到达终点时更新最短记录
        if (grid[newRow][newCol] === 2) {
          setTimeout(() => {
            toast.success("恭喜你！成功到达终点！!!! 😃");
            setIsGameFinished(true);
            setIsModalOpen(true);
            setCanDIYMaze(true);

            // 更新最短时间和步数
            dispatch(setBestTime(gameTime));
            dispatch(setBestSteps(steps + 1));

            // 只有当不是最后一关时才解锁下一关
            const nextGameNumber = Number(gameNumberMap[gameNumber]) + 1;

            if (nextGameNumber > 4) dispatch(incrementCompletedLevels()); // 增加已通过关卡数
            if (nextGameNumber <= 9) {
              dispatch(
                setAlgoUnlock({
                  index: gameNumberIndexMap[nextGameNumber],
                  locked: false,
                })
              );
            }
          }, 100);
        }
      }
    },
    [grid, playerPosition, dispatch]
  );

  // 初始化玩家位置，只在 grid 变化时执行
  useEffect(() => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 1) {
          setPlayerPosition({ row, col });
          break;
        }
      }
    }
  }, [grid]);

  // 单独管理键盘事件监听，避免不必要的重新绑定
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  // 添加计时器
  useEffect(() => {
    if (isGameFinished) return;

    const timer = setInterval(() => {
      setGameTime((prev) => {
        const newTime = prev + 1;
        dispatch(setGameTimeAction(newTime));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameFinished, dispatch]);

  return (
    <>
      <div
        className={classes.maze}
        style={{
          gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
          position: "relative",
        }}
        id="grid"
        ref={ref}
      >
        {grid.map((row, rowIndex) =>
          row.map((cellType, colIndex) => (
            <button
              className={classes["genre" + cellType]}
              disabled={
                status === Status.Searching || status === Status.Generating
              }
              key={`${rowIndex}-${colIndex}`}
              data-cell-type={cellType}
              data-row={rowIndex}
              data-col={colIndex}
            ></button>
          ))
        )}
        <div
          style={{
            width: `${cellSize}px`, // 使用 cellSize 确保与格子大小一致
            height: `${cellSize}px`,
            borderRadius: "50%",
            overflow: "hidden",
            position: "absolute",
            top: 0, // 添加初始位置
            left: 0,
            transition: "transform 0.3s ease",
            transform: `translate(${playerPosition?.col * cellSize}px, ${
              playerPosition?.row * cellSize
            }px)`, // 直接在style中计算位置
            display: "flex", // 确保内容居中
            alignItems: "center",
            justifyContent: "center",
          }}
          className="currentPlayerCom"
        >
          {currentPlayerCom()}
        </div>
      </div>
      <GameCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameTime={gameTime}
        steps={steps}
      />
    </>
  );
}

export default Maze;
