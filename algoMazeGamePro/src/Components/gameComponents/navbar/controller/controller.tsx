import MazeOperations from "@/Components/gameComponents/navbar/controller/generateMaze/maze-operations";
import GameInfo from "@/Components/gameComponents/navbar/controller/GameInfo/game-info";
import AudioOperations from "@/Components/gameComponents/navbar/controller/Audio/audio-operations";

import { useAppSelector } from "../../../../Store/hooks";

import classes from "./controller.module.scss";

import { characters } from "@/Configs/gameConfig";

import Player1 from "@/Views/Game/Player/1Player";
import Skill from "./Skill/skill";

import { useDebounce, useWindowSize } from "react-use";
import { getDimensionsFromScreenSize } from "@/Utils/tools/algorithm-tools/maze-algo";
import {
  resetMaze,
  setMeasurement,
} from "@/Store/gameStore/create-channel.slice";

import { useAppDispatch } from "../../../../Store/hooks";
import { useRef, useState } from "react";
import { mazeGenerators } from "@/Algorithms";
import { createMaze } from "@/Store/gameStore/maze.thunk";

function Controller() {
  const player = useAppSelector((state) => state.app.player);

  let currentPlayerCom = null;
  const currentPlayer = characters.find((item) => item.name == player);
  if (currentPlayer) currentPlayerCom = currentPlayer.com;
  else currentPlayerCom = Player1;

  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.createChannel.rows);
  const cols = useAppSelector((state) => state.createChannel.cols);
  const { width, height } = useWindowSize();
  const [maze, setMaze] = useState<string>("");
  const mazeAlgo = maze ? mazeGenerators.get(maze) : null;
  const [speed, setSpeed] = useState(1);

  const gameNumber = useAppSelector((store) => store.app.gameNumber);
  const algorithms = useAppSelector((store) => store.algoSlice.algorithms);
  const currentAlgorithm = algorithms.find((item) => item.index === gameNumber)
    ?.englishName as string;
  useDebounce(
    () => {
      const maxDimension = getDimensionsFromScreenSize();
      if (maxDimension.maxRows === rows && maxDimension.maxCols === cols) {
        return;
      }

      dispatch(
        setMeasurement({
          rows: maxDimension.maxRows,
          cols: maxDimension.maxCols,
        })
      );
      dispatch(resetMaze());

      const createMazeFn = (mazeAl: string) => {
        if (!mazeAl) return;

        function mazeClickHandler(mazeAl = mazeAlgo) {
          if (mazeAl) {
            dispatch(createMaze(mazeAl.fn, speed));
          }
        }
        mazeClickHandler(mazeGenerators.get(mazeAl));
      };
      createMazeFn(currentAlgorithm);
    },
    333,
    [width, height]
  );

  return (
    <section className={classes.controller}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: "10px",
          }}
        >
          {currentPlayerCom()}
        </div>
        <Skill />
        <GameInfo />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MazeOperations />
        <AudioOperations />
      </div>
    </section>
  );
}

export default Controller;
