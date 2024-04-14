import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import stockSlice from './reducers/stockSlice';

export const store = configureStore({
    reducer: {
        stock: stockSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, any, Action<string>>;
