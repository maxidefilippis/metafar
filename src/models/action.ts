export interface Action {
    symbol: string;
    name: string;
    currency: string;
    exchange: string;
    mic_code: string;
    country: string;
    type: string;
}

export interface GetActionValues {
    symbol: string;
    interval: number;
    startDate: string;
    endDate: string;
}

export const emptyAction = (): Action => {
    return {
        symbol: '',
        name: '',
        currency: '',
        country: '',
        exchange: '',
        mic_code: '',
        type: '',
    };
};
