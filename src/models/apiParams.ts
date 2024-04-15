export interface GetActionHistoricPrice {
    symbol: string;
    startDate: string;
    endDate: string;
    interval: string;
}
export interface GetActionRealTimePrice {
    symbol: string;
    interval: string;
}
