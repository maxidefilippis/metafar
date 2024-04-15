import { Interval } from '../constants/intervals';

export const setTimeIntervals = (interval: string) => {
    const MIN = 60000;
    switch (interval) {
        case Interval.ONE:
            return MIN;
        case Interval.FIVE:
            return MIN * 5;
        case Interval.FIFTEEN:
            return MIN * 15;
    }
};
