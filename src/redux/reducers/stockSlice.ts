import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Action, emptyAction } from '../../models/action';

interface StockState {
    loading: boolean;
    actions: Action[];
    search: string;
    filteredActions: Action[];
    actionDetail: Action;
}
const initialState: StockState = {
    loading: false,
    actions: [],
    filteredActions: [],
    search: '',
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
        setFilteredActions: (state, action: PayloadAction<Action[]>) => {
            state.filteredActions = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

export const { setLoading, setActions, setActionDetail, setFilteredActions, setSearch } = stockSlice.actions;

export default stockSlice.reducer;
