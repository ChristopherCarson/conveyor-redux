import { SAVE_CREATE_CHECK, DETAIL_ATTRIBUTE_EDIT_SUBMIT_CHECK, DETAIL_TABLE_EDIT_SUBMIT_CHECK, INDEX_EDIT_SUBMIT_CHECK } from '../actionConsts';
import { Epic } from './epic';
export declare class ValidationEpic extends Epic {
    [SAVE_CREATE_CHECK](action$: any, state$: any): any;
    [DETAIL_ATTRIBUTE_EDIT_SUBMIT_CHECK](action$: any, state$: any): any;
    [DETAIL_TABLE_EDIT_SUBMIT_CHECK](action$: any, state$: any): any;
    [INDEX_EDIT_SUBMIT_CHECK](action$: any, state$: any): any;
}
