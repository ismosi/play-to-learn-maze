export const enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export interface UserInfo {
  name: string;
  pwd: string;
}

export type GameNumber = null | string;

export type Scene = null | string;

export type Player = null | string;

export type Algo = null | string;
export interface AppState {
  theme: null | Theme;
  userInfo: null | UserInfo;
  gameNumber: GameNumber;
  scene: null | Scene;
  player: Player;
  algo: Algo;
  bestTime: null | number;
  bestSteps: null | number;
  completedLevels: number;
}
