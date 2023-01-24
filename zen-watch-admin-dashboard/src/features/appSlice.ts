import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP_STATE, CONNECTED, DISCONNECTED } from '../util/constants';
import { RootState } from '../app/store';

export interface AppState {
    user: any;
    status: 'disconnected' | 'connected';
}

const initialState: AppState = {
    user: null,
    status: DISCONNECTED,
};

export const appSlice = createSlice({
    name: APP_STATE,
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.status = CONNECTED;
        },
        disconnect: (state) => {
            state.user = initialState.user;
            state.status = initialState.status;
        }
    }
});

export const selectAppUser = (state: RootState) => state.app.user;
export const selectAppStatus = (state: RootState) => state.app.status;

export const { connect, disconnect } = appSlice.actions;

export default appSlice.reducer;