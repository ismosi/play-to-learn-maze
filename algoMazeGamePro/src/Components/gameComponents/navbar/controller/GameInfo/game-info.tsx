import { useAppSelector } from "../../../../../Store/hooks";

import classes from "../controller.module.scss";

function PathInfo() {
  const gameTime = useAppSelector((state) => state.createChannel.gameTime);
  const steps = useAppSelector((state) => state.createChannel.steps);

  // 格式化时间函数
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={classes.pathInfo + " path-info"}>
      <div className={classes.achievementItem}>
        <span className={classes.achievementIcon}>⏱️ </span>
        <span className={classes.achievementLabel}>游戏时间：</span>
        <span className={classes.achievementValue} data-testid="time">
          {formatTime(gameTime)}
        </span>
      </div>
      <div className={classes.achievementItem}>
        <span className={classes.achievementIcon}>👣 </span>
        <span className={classes.achievementLabel}>移动步数：</span>
        <span className={classes.achievementValue} data-testid="steps">
          {steps} 步
        </span>
      </div>
    </div>
  );
}

export default PathInfo;
