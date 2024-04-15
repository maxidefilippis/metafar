import { ApiMethods } from '../constants/apiMethods';
import { apiKey, apiUrl, pageSize } from '../constants/globals';
import { GetActionHistoricPrice, GetActionRealTimePrice } from '../models/apiParams';
import { StockResponse } from '../models/stock';
import { TimeSerie } from '../models/timeSerie';
import { apiConnect } from '../services/apiClient';

export class ActionsApi {
    async getActionsStock(): Promise<StockResponse> {
        const url = `${apiUrl}/stocks`;

        const params = new URLSearchParams();
        params.append('source', 'docs');
        params.append('exchange', 'NYSE');

        const queryParams = params.toString();
        const urlWithParams = `${url}?${queryParams}`;
        return await apiConnect(urlWithParams, ApiMethods.GET);
    }
    async getActionDetail(symbol: string, exchange: string): Promise<StockResponse> {
        const url = `${apiUrl}/stocks`;

        const params = new URLSearchParams();
        params.append('source', 'docs');
        params.append('symbol', symbol);
        params.append('exchange', exchange);

        const queryParams = params.toString();
        const urlWithParams = `${url}?${queryParams}`;
        return await apiConnect(urlWithParams, ApiMethods.GET);
    }
    async getHistoricPrices({ symbol, startDate, endDate, interval }: GetActionHistoricPrice): Promise<TimeSerie> {
        const url = `${apiUrl}/time_series`;

        const params = new URLSearchParams();
        params.append('symbol', symbol);
        params.append('start_date', startDate);
        params.append('end_date', endDate);
        params.append('interval', interval);
        params.append('outputsize', pageSize);
        params.append('apikey', apiKey);

        const queryParams = params.toString();
        const urlWithParams = `${url}?${queryParams}`;
        return await apiConnect(urlWithParams, ApiMethods.GET);
    }
    async getRealTimePrices({ symbol, interval }: GetActionRealTimePrice): Promise<TimeSerie> {
        const url = `${apiUrl}/time_series`;

        const params = new URLSearchParams();
        params.append('symbol', symbol);
        params.append('interval', interval);
        params.append('outputsize', pageSize);
        params.append('apikey', apiKey);

        const queryParams = params.toString();
        const urlWithParams = `${url}?${queryParams}`;
        return await apiConnect(urlWithParams, ApiMethods.GET);
    }
}
