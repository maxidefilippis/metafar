import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GraphType } from '../../constants/graphType';
import { Action, emptyAction } from '../../models/action';
import { TimeSerie, emptyTimeSerie } from '../../models/timeSerie';

interface DetailState {
    actionDetail: Action;
    timeSerie: TimeSerie;
    graphType: GraphType;
    interval: string;
    timeFrom: string;
    timeTo: string;
    lastUpdate: string;
}
const initialState: DetailState = {
    timeSerie: emptyTimeSerie(),
    actionDetail: emptyAction(),
    graphType: GraphType.HISTORY,
    interval: '',
    timeFrom: '',
    timeTo: '',
    lastUpdate: '',
};

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        setActionDetail: (state, action: PayloadAction<Action>) => {
            state.actionDetail = action.payload;
        },
        setTimeSerie: (state, action: PayloadAction<TimeSerie>) => {
            state.timeSerie = action.payload;
        },
        setGraphType: (state, action: PayloadAction<GraphType>) => {
            state.graphType = action.payload;
        },
        setIntervalTime: (state, action: PayloadAction<string>) => {
            state.interval = action.payload;
        },
        setTimeFrom: (state, action: PayloadAction<string>) => {
            state.timeFrom = action.payload;
        },
        setTimeTo: (state, action: PayloadAction<string>) => {
            state.timeTo = action.payload;
        },
        setLastUpdate: (state, action: PayloadAction<string>) => {
            state.lastUpdate = action.payload;
        },
    },
});

export const { setActionDetail, setTimeSerie, setGraphType, setIntervalTime, setTimeFrom, setTimeTo, setLastUpdate } = detailSlice.actions;

export default detailSlice.reducer;
