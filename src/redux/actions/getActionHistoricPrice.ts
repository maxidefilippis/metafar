import { ActionsApi } from '../../api/actionsApi';
import { StatusCode } from '../../constants/statusCode';
import { GetActionHistoricPrice } from '../../models/apiParams';
import { setLastUpdate, setTimeSerie } from '../reducers/detailSlice';
import { setLoading } from '../reducers/globalSlice';
import { AppThunk } from '../store';

const actionsApi = new ActionsApi();

export const getActionHistoricPrice =
    ({ symbol, startDate, endDate, interval }: GetActionHistoricPrice): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await actionsApi.getHistoricPrices({ interval, symbol, startDate, endDate });
            response.status === StatusCode.OK && dispatch(setTimeSerie(response));
            dispatch(setLastUpdate(''));
        } catch (error: any) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
