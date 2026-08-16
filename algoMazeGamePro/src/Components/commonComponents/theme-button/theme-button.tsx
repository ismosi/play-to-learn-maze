import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

import { setTheme } from "../../../Store/app.slice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";

import classes from "./theme-button.module.scss";

import { Theme } from "../../../Types/interfaces";

function ThemeButton() {
  const dispatch = useAppDispatch();
  const storeTheme = useAppSelector((state) => state.app.theme);
  const prefTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.DARK
    : Theme.LIGHT;
  const currentTheme = storeTheme ?? prefTheme;

  useEffect(() => {
    if (!storeTheme) {
      document.documentElement.setAttribute("data-theme", prefTheme);
    } else {
      dispatch(setTheme(storeTheme));
    }
  }, []);

  return (
    <>
      <button
        className={classes.themeButton}
        onClick={() =>
          dispatch(
            setTheme(currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
          )
        }
      >
        {currentTheme === Theme.LIGHT ? (
          <Moon color="rgba(147, 123, 61, 1.00)" />
        ) : (
          <Sun color="rgba(245, 183, 146, 1.00)" />
        )}
      </button>
    </>
  );
}

export default ThemeButton;
