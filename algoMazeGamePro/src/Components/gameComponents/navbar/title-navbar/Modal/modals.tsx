import { useRef } from "react";
import { Info, X } from "lucide-react";
import classes from "./modals.module.scss";
import { createPortal } from "react-dom";

import { useAppSelector } from "@/Store/hooks";
// import { algorithms } from "@/Configs/gameConfig.ts";

const Modals = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShowModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const algorithms = useAppSelector((store) => store.algoSlice.algorithms);

  const gameNumber = useAppSelector((store) => store.app.gameNumber);
  const currentAlgorithm = algorithms.find((item) => item.index === gameNumber);

  return (
    <>
      <button onClick={handleShowModal} className={classes.infoButton}>
        <Info size={15} />
      </button>
      {createPortal(
        <dialog ref={dialogRef} className={classes.dialog}>
          <button onClick={handleCloseModal} className={classes.closeButton}>
            <X />
          </button>

          <div className={classes.body}>
            <div className={classes.content}>
              <h1 className={classes.contentHeading}>
                {currentAlgorithm?.name}
              </h1>
              <p
                className={classes.contentPara}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {currentAlgorithm?.description}
              </p>
            </div>
          </div>
        </dialog>,
        document.getElementById("modal")!
      )}
    </>
  );
};

export default Modals;
