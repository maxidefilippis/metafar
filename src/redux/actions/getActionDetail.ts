import { ActionsApi } from '../../api/actionsApi';
import { setActionDetail } from '../reducers/detailSlice';
import { setLoading } from '../reducers/globalSlice';
import { AppThunk } from '../store';

const actionsApi = new ActionsApi();

export const getActionDetailFromApi =
    (symbol: string, exchange: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await actionsApi.getActionDetail(symbol, exchange);
            dispatch(setActionDetail(response.data[0]));
        } catch (error: any) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
