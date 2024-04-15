import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Action } from '../../models/action';

interface StockState {
    actions: Action[];
    search: string;
    filteredActions: Action[];
}
const initialState: StockState = {
    actions: [],
    filteredActions: [],
    search: '',
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
    },
});

export const { setActions, setFilteredActions, setSearch } = stockSlice.actions;

export default stockSlice.reducer;
