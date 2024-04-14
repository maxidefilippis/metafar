import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Action, emptyAction } from '../../models/action';

interface StockState {
    loading: boolean;
    actions: Action[];
    actionDetail: Action;
}
const initialState: StockState = {
    loading: false,
    actions: [],
    actionDetail: emptyAction(),
};

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setActions: (state, action: PayloadAction<Action[]>) => {
            state.actions = action.payload;
        },
        setActionDetail: (state, action: PayloadAction<Action>) => {
            state.actionDetail = action.payload;
        },
    },
});

export const { setLoading, setActions, setActionDetail } = stockSlice.actions;

export default stockSlice.reducer;
