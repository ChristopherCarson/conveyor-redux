import { DETAIL_ATTRIBUTE_EDIT_SUBMIT, DETAIL_TABLE_EDIT_SUBMIT, DETAIL_TABLE_REMOVE_SUBMIT, INDEX_EDIT_SUBMIT, INLINE_FILE_DELETE, INLINE_FILE_SUBMIT } from '../actionConsts';
import { Epic } from './epic';
export declare class EditEpic extends Epic {
    [DETAIL_ATTRIBUTE_EDIT_SUBMIT](action$: any, state$: any): any;
    [DETAIL_TABLE_EDIT_SUBMIT](action$: any): any;
    [DETAIL_TABLE_REMOVE_SUBMIT](action$: any, state$: any): any;
    [INDEX_EDIT_SUBMIT](action$: any): any;
    [INLINE_FILE_DELETE](action$: any): any;
    [INLINE_FILE_SUBMIT](action$: any, state$: any): any;
}
