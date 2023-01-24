import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';

// https://www.youtube.com/watch?v=u3KlatzB7GM
// https://www.learnwithjason.dev/let-s-learn-modern-redux

export const store = configureStore({
  reducer: {
    app: appReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
