import { CREATE_INPUT_CHANGE, CANCEL_CREATE, SAVE_CREATE_SUCCESSFUL, SAVE_CREATE, STACK_CREATE, DETAIL_CREATE, INDEX_CREATE, UPDATE_FORM_STACK_INDEX, VALIDATION_ERROR_CREATE } from '../actionConsts';
import { Reducer } from './reducer';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class CreateReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [CREATE_INPUT_CHANGE](state: any, action: any): (val: unknown) => any;
    [CANCEL_CREATE](state: any): any;
    [SAVE_CREATE_SUCCESSFUL](state: any): any;
    [SAVE_CREATE](state: any): unknown;
    [STACK_CREATE](state: any, action: any): any;
    [DETAIL_CREATE](state: any, action: any): any;
    [INDEX_CREATE](state: any, action: any): any;
    [UPDATE_FORM_STACK_INDEX](state: any, action: any): any;
    [VALIDATION_ERROR_CREATE](state: any, action: any): any;
}
