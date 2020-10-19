import { TABLE_ROW_EDIT, ATTRIBUTE_EDIT, TABLE_EDIT_CANCEL, ATTRIBUTE_EDIT_CANCEL, VALIDATION_ERROR_EDIT, DETAIL_TABLE_EDIT_SUBMIT, DETAIL_ATTRIBUTE_EDIT_SUBMIT, EDIT_INPUT_CHANGE, VALIDATION_ERROR_TABLE_ROW } from '../actionConsts';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
import { Reducer } from './reducer';
export declare class EditReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [LOCATION_CHANGE](): {};
    [TABLE_ROW_EDIT](state: any, action: any): any;
    [ATTRIBUTE_EDIT](state: any, action: any): any;
    [TABLE_EDIT_CANCEL](state: any, action: any): unknown;
    [ATTRIBUTE_EDIT_CANCEL](state: any, action: any): any;
    [VALIDATION_ERROR_EDIT](state: any, action: any): any;
    [DETAIL_TABLE_EDIT_SUBMIT](state: any, action: any): any;
    [DETAIL_ATTRIBUTE_EDIT_SUBMIT](state: any, action: any): unknown;
    [EDIT_INPUT_CHANGE](state: any, action: any): (val: unknown) => any;
    [VALIDATION_ERROR_TABLE_ROW](state: any, action: any): any;
}
