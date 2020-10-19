import { FETCH_MODEL_INDEX, FETCH_MODEL_DETAIL, REQUEST_DELETE_MODEL, REQUEST_DELETE_REL_TABLE_MODEL, REQUEST_DELETE_MODEL_FROM_DETAIL_PAGE } from '../actionConsts';
import { Epic } from './epic';
export declare class ModelEpic extends Epic {
    [FETCH_MODEL_INDEX](action$: any, state$: any): any;
    [FETCH_MODEL_DETAIL](action$: any): any;
    [REQUEST_DELETE_MODEL](action$: any): any;
    [REQUEST_DELETE_REL_TABLE_MODEL](action$: any): any;
    [REQUEST_DELETE_MODEL_FROM_DETAIL_PAGE](action$: any): any;
}
