import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./HomeDescription.module.scss";

import Scene1 from "./Scene/1Scene";
import Scene2 from "./Scene/2Scene";
import Scene3 from "./Scene/3Scene";

import { useAppDispatch } from "@/Store/hooks";
import { useAppSelector } from "@/Store/hooks";
import { setGameNumber, setScene, setPlayer, setAlgo } from "@/Store/app.slice";
import { GameNumber } from "@/Types/interfaces";
import { characters } from "@/Configs/gameConfig";

export default function HomeDescription() {
  const dispatch = useAppDispatch();
  const gameNumber = useAppSelector((state) => state.app.gameNumber);
  const algorithms = useAppSelector((store) => store.algoSlice.algorithms);

  const navigate = useNavigate();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [selectedMap, setSelectedMap] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  const maps = useMemo(
    () => [
      {
        name: "🩸沙漠迷宫🩸",
        description:
          "沙漠迷宫以温暖的棕黄色调为主题，展现了一个充满挑战的沙漠环境,为玩家增添了沙漠氛围。",
        com: <Scene1 />,
      },
      {
        name: "🌿森林迷宫🌿",
        description:
          "森林迷宫以其生机勃勃的绿色调为特色，象征自然与生命的活力。深绿色的墙壁代表茂密的树林，而明亮的绿色路径则是森林中蜿蜒的小径。",
        com: <Scene2 />,
      },
      {
        name: "❄️冰雪迷宫❄️",
        description:
          "冰雪迷宫以清新的蓝白色调为主题，呈现出一个寒冷而晶莹的冰雪世界。深蓝色的冰墙与纯白色的雪地路径清晰可见。",
        com: <Scene3 />,
      },
    ],
    []
  );

  const startGame = () => {
    navigate("/startGame");
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftSection}>
        <h1 className={classes.sectionTitle}>算法介绍</h1>
        <div className={classes.algorithmButtons}>
          {algorithms.map((algo, index) => (
            <button
              key={index}
              className={selectedAlgorithm === index ? classes.active : ""}
              onClick={() => {
                setSelectedAlgorithm(index);
                if (gameNumber == null) {
                  dispatch(setGameNumber("一"));
                } else {
                  dispatch(
                    setGameNumber(algorithms[index]?.index as GameNumber)
                  );
                }
                dispatch(setAlgo(algorithms[index].name));
              }}
            >
              {algo.locked ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>
                    第{algo.index}关：
                    {algo.name}
                  </span>
                  <span
                    style={{
                      color: "rgba(227, 197, 119, 1.00)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    &nbsp; (未解锁)
                  </span>
                </div>
              ) : (
                <>
                  第{algo.index}关：
                  {algo.name}
                </>
              )}
            </button>
          ))}
        </div>
        <div className={classes.algorithmDescription}>
          {algorithms[selectedAlgorithm].locked ? (
            <div
              style={{
                color: "rgba(227, 197, 119, 1.00)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              该关卡尚未解锁，解锁后可开始游戏
            </div>
          ) : (
            <div className={classes.scrollableContent}>
              {algorithms[selectedAlgorithm].description}
            </div>
          )}
        </div>
      </div>

      <div className={classes.rightSection}>
        <h1 className={classes.sectionTitle}>游戏介绍</h1>
        <div className={classes.mapSection}>
          <div className={classes.thumbnails}>
            {maps.map((map, index) => (
              <div
                key={index}
                className={`${classes.thumbnail} ${
                  classes[`gradient${index + 1}`]
                } ${selectedMap === index ? classes.selected : ""}`}
                onClick={() => {
                  setSelectedMap(index);
                  dispatch(setScene(maps[index].name));
                }}
              >
                {map.com}
              </div>
            ))}
          </div>
          <div className={classes.description}>
            {maps[selectedMap].description}
          </div>
        </div>

        <div className={classes.characterSection}>
          <div className={classes.characters}>
            {characters.map((char, index) => (
              <div
                key={index}
                className={`${classes.character} ${
                  classes[`characterGradient${index + 1}`]
                } ${selectedCharacter === index ? classes.selected : ""}`}
                onClick={() => {
                  setSelectedCharacter(index);
                  dispatch(setPlayer(characters[index].name));
                }}
              >
                {char.com()}
              </div>
            ))}
          </div>
          <div className={classes.description} style={{ fontSize: "14px" }}>
            <div style={{ marginBottom: "3px" }}>
              {" "}
              技能：
              <br />
              {characters[selectedCharacter].kill.name}让
              {characters[selectedCharacter].kill.des}
              <br />
              <br />
            </div>
            人物介绍：
            <br />
            {characters[selectedCharacter].description}
          </div>
        </div>

        <div className={classes.startSection}>
          <button onClick={backToHome} className={classes.backButton}>
            返回主页
          </button>
          {algorithms[selectedAlgorithm].locked ? (
            <button disabled className={classes.startButton}>
              🔒
            </button>
          ) : (
            <button onClick={startGame} className={classes.startButton}>
              开始游戏
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
