import { TRIGGER_SEARCH, FETCH_SEARCH_ENTRIES } from '../actionConsts';
import { Epic } from './epic';
export declare class SearchEpic extends Epic {
    [TRIGGER_SEARCH](action$: any): any;
    [FETCH_SEARCH_ENTRIES](action$: any): any;
}
