import { apiKey, apiUrl } from '../constants/globals';
import { Action, GetActionValues } from '../models/action';
import { ApiMethods } from '../models/apiMethods';
import { StockResponse } from '../models/stock';
import { apiConnect } from '../services/apiClient';

export class ActionsApi {
    async getActionsStock(): Promise<StockResponse> {
        let url = `${apiUrl}/stocks?source=docs&exchange=NYSE`;
        return await apiConnect(url, ApiMethods.GET);
    }
    async getActionDetail(symbol: string): Promise<Action> {
        let url = `${apiUrl}/stocks?symbol=${symbol}&source=docs`;
        return await apiConnect(url, ApiMethods.GET);
    }
    async getActionValues({ symbol, interval, startDate, endDate }: GetActionValues): Promise<Action> {
        let url = `${apiUrl}/time_series?symbol=${symbol}&interval=${interval}min&start_date=${startDate}&end_date=${endDate}&apikey=${apiKey}`;

        return await apiConnect(url, ApiMethods.GET);
    }
}
