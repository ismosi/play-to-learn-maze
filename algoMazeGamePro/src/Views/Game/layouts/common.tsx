import Navbar from "@/Components/gameComponents/navbar/title-navbar/navbar";
import Controller from "@/Components/gameComponents/navbar/controller/controller";
import Maze from "@/Components/gameComponents/maze/maze";
import AppTour from "@/Components/gameComponents/app-tour/app-tour";
import classes from "./common.module.scss";

function common() {
  return (
    <>
      <Navbar />
      <Controller />

      <main className="text-center">
        <Maze />
      </main>

      <div className={classes.floatingTour}>
        <AppTour />
      </div>
    </>
  );
}

export default common;
