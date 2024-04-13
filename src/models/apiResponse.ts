import { Action } from './action';

export interface StockResponse {
    count: number;
    data: Action[];
    status: string;
}

export const emptyStockResponse = (): StockResponse => {
    return { count: 0, data: [], status: '' };
};
