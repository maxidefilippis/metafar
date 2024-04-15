import { ActionsApi } from '../../api/actionsApi';
import { StatusCode } from '../../constants/statusCode';
import { GetActionRealTimePrice } from '../../models/apiParams';
import { setLastUpdate, setTimeSerie } from '../reducers/detailSlice';
import { setLoading } from '../reducers/globalSlice';
import { AppThunk } from '../store';

const actionsApi = new ActionsApi();

export const getActionRealTimePrice =
    ({ symbol, interval }: GetActionRealTimePrice): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await actionsApi.getRealTimePrices({ symbol, interval });
            response.status === StatusCode.OK && dispatch(setTimeSerie(response));
            dispatch(setLastUpdate(new Date().toLocaleString()));
        } catch (error: any) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
