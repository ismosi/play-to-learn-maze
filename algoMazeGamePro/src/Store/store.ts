import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

import createChannelReducer from "@/Store/gameStore/create-channel.slice";
import algoSlice from "@/Store/gameStore/algo-slice.slice";
import appReducer from "./app.slice";

export const store = configureStore({
  reducer: {
    app: persistReducer<ReturnType<typeof appReducer>>(
      {
        key: "app",
        storage,
      },
      appReducer
    ),
    createChannel: createChannelReducer,
    algoSlice: persistReducer(
      {
        key: "algoSlice",
        storage,
      },
      algoSlice
    ),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
