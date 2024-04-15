import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalState {
    loading: boolean;
}
const initialState: GlobalState = {
    loading: false,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = globalSlice.actions;

export default globalSlice.reducer;