import { useAppDispatch, useAppSelector } from "../../../../../Store/hooks";
import {
  setMaze,
  setPathLength,
  setStatus,
  setNumberOfVisitedMazeCell,
  clearGrid,
} from "@/Store/gameStore/create-channel.slice";
import { ScanEye, Snowflake } from "lucide-react";
import { useState, useRef } from "react";
import classes from "../controller.module.scss";

import { pathFinders } from "@/Algorithms";
import { Status } from "@/Types/gameType";
import { highlightPath } from "@/Store/gameStore/path.thunk";
import { searchPath } from "@/Store/gameStore/search.thunk";

import { characters } from "@/Configs/gameConfig";
import SkillModal from "./skill-modal/skill-modal";

function Skill() {
  const dispatch = useAppDispatch();
  const [speed] = useState(1);
  const status = useAppSelector((state) => state.createChannel.status);
  const disabled = status === Status.Generating || status === Status.Searching;

  async function executeSearch(algo: unknown, speed: number) {
    if (status === Status.Complete) {
      dispatch(clearGrid());
    }

    if (!algo) {
      return;
    }

    try {
      dispatch(setNumberOfVisitedMazeCell(0));
      dispatch(setPathLength(0));
      dispatch(setStatus(Status.Searching));
      const { grid, parents } = await dispatch(searchPath(algo.fn, speed));
      await dispatch(highlightPath(grid, parents, speed));
      dispatch(setMaze({ grid, clone: false }));
      dispatch(setStatus(Status.Complete));
    } catch {
      // search cancelled
      // no action needed
    }
  }

  // 设置玩家配备的技能
  const player = useAppSelector((state) => state.app.player);
  let skillAlgo = "";
  const currentPlayer = characters.find((item) => item.name == player);
  if (currentPlayer) skillAlgo = currentPlayer.kill.algo;
  else skillAlgo = characters[0].kill.algo;

  const [scanEyeCooldown, setScanEyeCooldown] = useState(false);
  const [frostCooldown, setFrostCooldown] = useState(false);

  // 添加倒计时状态
  const [scanEyeTimer, setScanEyeTimer] = useState(0);
  const [frostTimer, setFrostTimer] = useState(0);

  // 修改技能处理函数
  // 添加一个ref来存储清除路径的定时器
  const clearPathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 添加一个状态来追踪寻踪之眼是否激活
  const [isPathVisible, setIsPathVisible] = useState(false);

  async function handlePlay() {
    if (scanEyeCooldown) return;
    setScanEyeCooldown(true);
    setScanEyeTimer(30);
    setIsPathVisible(true); // 设置路径可见状态

    clearPathTimerRef.current = setTimeout(() => {
      dispatch(clearGrid());
      dispatch(setNumberOfVisitedMazeCell(0));
      dispatch(setPathLength(0));
      setIsPathVisible(false); // 路径消失时更新状态
    }, 3000);

    // 开始倒计时
    const timer = setInterval(() => {
      setScanEyeTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    await executeSearch(pathFinders.get(skillAlgo), speed);
    setTimeout(() => {
      setScanEyeCooldown(false);
      clearInterval(timer);
      setScanEyeTimer(0);
    }, 30000);
  }

  function handleSnow() {
    if (!isPathVisible || frostCooldown) return; // 只有在路径可见时才能使用
    setFrostCooldown(true);
    setFrostTimer(5);

    if (clearPathTimerRef.current) {
      clearTimeout(clearPathTimerRef.current);
      clearPathTimerRef.current = setTimeout(() => {
        dispatch(clearGrid());
        dispatch(setNumberOfVisitedMazeCell(0));
        dispatch(setPathLength(0));
        setIsPathVisible(false); // 路径消失时更新状态
      }, 5000);
    }

    // 开始倒计时
    const timer = setInterval(() => {
      setFrostTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      setFrostCooldown(false);
      setFrostTimer(0);
    }, 5000);
  }

  // 修改冰霜冻结按钮
  return (
    <>
      {/* <select
        className={`${classes.speed}`}
        name="path-finder-speed"
        id="path-finder-speed"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        disabled={disabled}
      >
        {[...speeds.entries()].map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select> */}

      <div className={classes.skillWrapper} id="skillEye">
        <button
          className={`${classes.play} ${classes.skillButton} ${
            scanEyeCooldown ? classes.cooling : ""
          }`}
          data-testid="player"
          disabled={disabled || !skillAlgo || scanEyeCooldown}
          data-tooltip={currentPlayer?.kill.name}
          onClick={() => handlePlay()}
        >
          <div className={classes.skillIcon}>
            {scanEyeCooldown ? (
              <span className={classes.cooldownTimer}>{scanEyeTimer}s</span>
            ) : (
              <ScanEye size={20} />
            )}
          </div>
          {scanEyeCooldown && <div className={classes.skillCooldown}></div>}
        </button>
        <SkillModal
          skillName={currentPlayer?.kill.name as string}
          description={currentPlayer?.kill.desLong as string}
          theme="eye"
        />
      </div>

      <div className={classes.skillWrapper} id="skillSnow">
        <button
          className={`${classes.skillButton} ${classes.frozenSkill} ${
            frostCooldown ? classes.cooling : ""
          }`}
          data-testid="clear"
          disabled={!isPathVisible || frostCooldown}
          data-tooltip="冰霜冻结"
          onClick={handleSnow}
        >
          <div className={classes.skillIcon}>
            {frostCooldown ? (
              <span className={classes.cooldownTimer}>{frostTimer}s</span>
            ) : (
              <Snowflake
                size={20}
                className={isPathVisible ? classes.active : ""}
              />
            )}
          </div>
          {frostCooldown && <div className={classes.skillCooldown}></div>}
        </button>
        <SkillModal
          skillName="冰霜冻结"
          description={`将技能之眼的视野冻结 5s。只能在技能之眼激活时使用。\n冷却时间：5秒`}
          theme="frost"
        />
      </div>
    </>
  );
}

export default Skill;
