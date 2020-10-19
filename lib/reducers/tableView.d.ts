import { INDEX_ADD_FILTER, INDEX_DELETE_FILTER, INDEX_CLEAR_FILTERS, INDEX_CHANGE_FILTER_FIELD, CHANGE_REL_TABLE_PAGE, CHANGE_GOTO_PAGE, CHANGE_REL_GOTO_PAGE, UPDATE_OVERVIEW_DISPLAYED, UPDATE_OVERVIEW_SELECTED, INDEX_TABLE_SORT_CHANGE, INDEX_TABLE_FILTER_SUBMIT, COLLAPSE_TABLE_CHANGE, CHANGE_PAGE, UPDATE_MODEL_INDEX, INDEX_TABLE_FILTER_CHANGE, INDEX_TABLE_FILTER_DROPDOWN, UPDATE_MODEL_DETAIL } from '../actionConsts';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
import { Reducer } from './reducer';
export declare class TableViewReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [INDEX_ADD_FILTER](state: any, action: any): any;
    [INDEX_DELETE_FILTER](state: any, action: any): unknown;
    [INDEX_CLEAR_FILTERS](state: any, action: any): unknown;
    [INDEX_CHANGE_FILTER_FIELD](state: any, action: any): any;
    [INDEX_TABLE_FILTER_CHANGE](state: any, action: any): (val: unknown) => any;
    [INDEX_TABLE_FILTER_DROPDOWN](state: any, action: any): (val: unknown) => any;
    [INDEX_TABLE_FILTER_SUBMIT](state: any, action: any): unknown;
    [INDEX_TABLE_SORT_CHANGE](state: any, action: any): unknown;
    [COLLAPSE_TABLE_CHANGE](state: any, action: any): any;
    [CHANGE_PAGE](state: any, action: any): (val: unknown) => any;
    [CHANGE_REL_TABLE_PAGE](state: any, action: any): (val: unknown) => any;
    [CHANGE_GOTO_PAGE](state: any, action: any): (val: unknown) => any;
    [CHANGE_REL_GOTO_PAGE](state: any, action: any): (val: unknown) => any;
    [UPDATE_MODEL_INDEX](state: any, action: any): unknown;
    [UPDATE_MODEL_DETAIL](state: any, action: any): any;
    [UPDATE_OVERVIEW_DISPLAYED](state: any, action: any): (val: unknown) => any;
    [UPDATE_OVERVIEW_SELECTED](state: any, action: any): (val: unknown) => any;
}
