import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import detailSlice from './reducers/detailSlice';
import globalSlice from './reducers/globalSlice';
import stockSlice from './reducers/stockSlice';

export const store = configureStore({
    reducer: {
        global: globalSlice,
        stock: stockSlice,
        detail: detailSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, any, Action<string>>;
