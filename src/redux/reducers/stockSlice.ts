import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Action } from '../../models/action';

interface StockState {
    actions: Action[];
    search: string;
    filteredActions: Action[];
    currentPage: number;
}
const initialState: StockState = {
    actions: [],
    filteredActions: [],
    search: '',
    currentPage: 1,
};

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setActions: (state, action: PayloadAction<Action[]>) => {
            state.actions = action.payload;
        },
        setFilteredActions: (state, action: PayloadAction<Action[]>) => {
            state.filteredActions = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setActions, setFilteredActions, setSearch, setCurrentPage } = stockSlice.actions;

export default stockSlice.reducer;
