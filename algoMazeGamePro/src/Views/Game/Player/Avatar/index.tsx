import { useAppSelector } from "../../../../Store/hooks";
import classes from "./index.module.scss";
function Avatar() {
  const userInfo = useAppSelector((state) => state.app.userInfo);
  return (
    <>
      <div className={classes.avatarContainer}>
        <div className={classes.avatar}>{userInfo?.name.charAt(0)}</div>
      </div>
    </>
  );
}

export default Avatar;
