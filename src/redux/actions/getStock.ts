import { ActionsApi } from '../../api/actionsApi';
import { setLoading } from '../reducers/globalSlice';
import { setActions } from '../reducers/stockSlice';
import { AppThunk } from '../store';

const actionsApi = new ActionsApi();

export const getStockFromApi = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await actionsApi.getActionsStock();
        dispatch(setActions(response.data));
    } catch (error: any) {
        console.error(error);
    } finally {
        dispatch(setLoading(false));
    }
};
