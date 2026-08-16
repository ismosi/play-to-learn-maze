import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/Store/hooks";
import classes from "./game-complete-modal.module.scss";

import Player1 from "@/Views/Game/Player/1Player";
import { characters } from "@/Configs/gameConfig";

interface GameCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTime: number; // 游戏时长（秒）
  steps: number; // 移动步数
}

function GameCompleteModal({
  isOpen,
  onClose,
  gameTime,
  steps,
}: GameCompleteModalProps) {
  const navigate = useNavigate();
  const gameNumber = useAppSelector((state) => state.app.gameNumber);
  const scene = useAppSelector((state) => state.app.scene);
  const player = useAppSelector((state) => state.app.player);
  const algo = useAppSelector((state) => state.app.algo);

  let currentPlayerCom = null;
  const currentPlayer = characters.find((item) => item.name == player);
  if (currentPlayer) currentPlayerCom = currentPlayer.com;
  else currentPlayerCom = Player1;
  if (!isOpen) return null;

  // 格式化时间函数
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <h2
          style={{
            fontSize: "32px",
            color: "#00b894",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          🎉 恭喜通关！
        </h2>

        <div className={classes.gameInfo}>
          {/* {player} */}
          <span
            style={{
              width: "30px",
              height: "30px",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              marginLeft: "2px",
              marginRight: "2px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {currentPlayerCom()}
          </span>
          <span style={{ verticalAlign: "middle" }}>
            成功攻下第{gameNumber}关{algo}：{scene}
          </span>

          <div className={classes.achievementInfo}>
            <div className={classes.achievementItem}>
              <span className={classes.achievementIcon}>⏱️</span>
              <span className={classes.achievementLabel}>通关用时</span>
              <span className={classes.achievementValue}>
                {formatTime(gameTime)}
              </span>
            </div>
            <div className={classes.achievementItem}>
              <span className={classes.achievementIcon}>👣</span>
              <span className={classes.achievementLabel}>移动步数</span>
              <span className={classes.achievementValue}>{steps} 步</span>
            </div>
          </div>
        </div>

        <div className={classes.buttonGroup}>
          <button
            onClick={() => {
              onClose(); // 关闭 modal
            }}
            style={{
              backgroundColor: "#0984e3",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            学习模式
          </button>
          <button
            onClick={() => {
              onClose();
              navigate(-1);
            }}
            style={{
              backgroundColor: "#ff7675",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCompleteModal;
