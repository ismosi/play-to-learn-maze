import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../Store/hooks";

import classes from "./User.module.scss";

const User = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.app.userInfo);
  const bestTime = useAppSelector((state) => state.app.bestTime);
  const bestSteps = useAppSelector((state) => state.app.bestSteps);
  const completedLevels = useAppSelector((state) => state.app.completedLevels);

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToGame = () => {
    navigate("/gameDescription");
  };
  return (
    <div className={classes.profileCenter}>
      <div className={classes.profileContainer}>
        <div className={classes.profileHeader}>
          <div className={classes.avatarContainer}>
            <div className={classes.avatar}>{userInfo?.name.charAt(0)}</div>
          </div>
          <h1 className={classes.nickname}>{userInfo?.name}</h1>
        </div>

        <div className={classes.statsContainer}>
          <div className={classes.statItem}>
            <h3>最短用时</h3>
            <div className={classes.statValue}>
              {bestTime && bestTime != null ? `${bestTime}秒` : "暂无记录"}
            </div>
          </div>

          <div className={classes.statItem}>
            <h3>最少步数</h3>
            <div className={classes.statValue}>
              {bestSteps && bestSteps != null ? bestSteps : "暂无记录"}
            </div>
          </div>

          <div className={classes.statItem}>
            <h3>已通关</h3>
            <div className={classes.statValue}>{completedLevels}</div>
          </div>
        </div>
      </div>
      <div className={classes.buttonWrapper}>
        <button onClick={navigateToHome}>返回主页</button>
        <button onClick={navigateToGame}>开始游戏</button>
      </div>
    </div>
  );
};

export default User;
