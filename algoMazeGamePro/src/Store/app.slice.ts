import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import {
  AppState,
  Theme,
  UserInfo,
  GameNumber,
  Scene,
  Player,
  Algo,
} from "../Types/interfaces";

const initialState: AppState = {
  userInfo: null,
  theme: null,
  gameNumber: null,
  scene: null,
  player: null,
  algo: null,
  bestTime: null,
  bestSteps: null,
  completedLevels: 3, // 添加已通过关卡数量
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      document.documentElement.setAttribute("data-theme", action.payload);
    },
    setGameNumber: (state, action: PayloadAction<GameNumber>) => {
      state.gameNumber = action.payload;
    },
    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.player = action.payload;
    },
    setAlgo: (state, action: PayloadAction<Algo>) => {
      state.algo = action.payload;
    },
    setBestTime: (state, action: PayloadAction<number>) => {
      // 确保输入值是有效的正数
      console.log("MMMM", state.bestTime, action.payload);
      if (action.payload > 0) {
        state.bestTime =
          state.bestTime == null
            ? action.payload
            : Math.min(state.bestTime, action.payload);
      }
    },
    setBestSteps: (state, action: PayloadAction<number>) => {
      // 确保输入值是有效的正数
      if (action.payload > 0) {
        state.bestSteps =
          state.bestSteps == null
            ? action.payload
            : Math.min(state.bestSteps, action.payload);
      }
    },
    incrementCompletedLevels: (state) => {
      state.completedLevels += 1;
    },
  },
});

export const {
  setUserInfo,
  setTheme,
  setGameNumber,
  setScene,
  setPlayer,
  setAlgo,
  setBestTime,
  setBestSteps,
  incrementCompletedLevels, // 导出新的 action
} = appSlice.actions;
export default appSlice.reducer;
