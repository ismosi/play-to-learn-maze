import { useRef } from "react";
import { Info, X } from "lucide-react";
import classes from "./skill-modal.module.scss";
import { createPortal } from "react-dom";

interface SkillModalProps {
  skillName: string;
  description: string;
  theme: "eye" | "frost";
}

const SkillModal = ({ skillName, description, theme }: SkillModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡到技能按钮
    dialogRef.current?.showModal();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${classes.infoButton} ${classes[theme]}`}
      >
        <Info size={32} />
      </button>
      {createPortal(
        <dialog
          ref={dialogRef}
          className={`${classes.dialog} ${classes[theme]}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes.content}>
            <h2>{skillName}</h2>
            <p style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
              {description}
            </p>
            <button onClick={handleClose} className={classes.closeButton}>
              <X size={16} />
            </button>
          </div>
        </dialog>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default SkillModal;
