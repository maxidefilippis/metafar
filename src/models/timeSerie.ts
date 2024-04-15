import { Action } from './action';

export interface TimeSerie {
    meta: MetaData;
    values: StockValue[];
    status: string;
}

export interface MetaData extends Omit<Action, 'name' | 'country'> {
    interval: string;
    exchange_timezone: string;
}

export interface StockValue {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
}

export const emptyTimeSerie = (): TimeSerie => {
    return {
        meta: emptyMetaData(),
        values: [],
        status: ''
    };
};

export const emptyMetaData = (): MetaData => {
    return {
        currency: '',
        exchange: '',
        exchange_timezone: '',
        interval: '',
        mic_code: '',
        symbol: '',
        type: '',
    };
};
