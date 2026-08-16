import CellInfo from "@/Components/gameComponents/navbar/title-navbar/cell-info/cell-info";

import { useAppSelector } from "../../../../Store/hooks";

import classes from "./navbar.module.scss";

import { useNavigate } from "react-router-dom";

import Modals from "./Modal/modals";

export interface Props {
  title: string;
  children?: React.ReactNode;
}

function Navbar() {
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.app.userInfo);
  const gameNumber = useAppSelector((state) => state.app.gameNumber);
  const scene = useAppSelector((state) => state.app.scene);
  const algo = useAppSelector((state) => state.app.algo);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: " 0 10px 10px",
          // 添加一个下阴影，左边、右边、上边都无阴影
          boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "28px", whiteSpace: "pre-wrap" }}>
            第{gameNumber}关 {algo}
            <span className={classes.modalWrapper}>
              <Modals />
            </span>
            : {scene}
          </span>
        </div>

        <CellInfo />
        <div className={classes.avatar} onClick={() => navigate("/user")}>
          {userInfo?.name.charAt(0)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
