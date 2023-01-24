import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// https://www.youtube.com/watch?v=u3KlatzB7GM
// https://www.learnwithjason.dev/let-s-learn-modern-redux
// Persist reducer - https://www.youtube.com/watch?v=b88Z5POQBwI
// Ignore deserializable - https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
