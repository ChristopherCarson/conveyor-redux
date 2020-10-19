import { UPDATE_MODEL_INDEX, UPDATE_MODEL_DETAIL, UPDATE_DELETE_MODEL, REMOVE_INSTANCE, MODEL_NOT_FOUND } from '../actionConsts';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
import { Reducer } from './reducer';
export declare class ModelReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [MODEL_NOT_FOUND](state: any, action: any): any;
    [UPDATE_MODEL_INDEX](state: any, action: any): any;
    [UPDATE_MODEL_DETAIL](state: any, action: any): any;
    [UPDATE_DELETE_MODEL](state: any, action: any): any;
    [REMOVE_INSTANCE](state: any, action: any): any;
}
