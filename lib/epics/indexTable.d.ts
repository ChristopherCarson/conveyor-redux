import { INDEX_TABLE_FILTER_SUBMIT, INDEX_TABLE_SORT_CHANGE } from '../actionConsts';
import { Epic } from './epic';
export declare class IndexTableEpic extends Epic {
    [INDEX_TABLE_FILTER_SUBMIT](action$: any): any;
    [INDEX_TABLE_SORT_CHANGE](action$: any): any;
}
