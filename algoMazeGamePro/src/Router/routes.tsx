import { createHashRouter } from "react-router-dom";

import Home from "@/Views/Home";
import Login from "@/Views/Login/Login";
import GameHome from "@/Views/gameHome";
import HomeDescription from "@/Views/Game/HomeDescription";
import StartHome from "@/Views/gameHome.tsx";
import User from "@/Views/User/User";

export const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/game",
    element: <GameHome />,
  },
  {
    path: "/gameDescription",
    element: <HomeDescription />,
  },
  {
    path: "/startGame",
    element: <StartHome />,
  },
]);
