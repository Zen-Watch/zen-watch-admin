import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP_STATE, CONNECTED, DISCONNECTED } from '../util/constants';

export interface AppState {
    email: string;
    status: 'disconnected' | 'connected';
}

const initialState: AppState = {
    email: '',
    status: DISCONNECTED,
};

export const appSlice = createSlice({
    name: APP_STATE,
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
            state.status = CONNECTED;
        },
        disconnect: (state) => {
            state.email = initialState.email;
            state.status = initialState.status;
        }
    }
});

export const { connect, disconnect } = appSlice.actions;

export default appSlice.reducer;