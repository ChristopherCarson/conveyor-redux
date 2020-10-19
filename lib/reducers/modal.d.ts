import { UPDATE_DELETE_DETAIL, CANCEL_DELETE_DETAIL } from '../actionConsts';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
import { Reducer } from './reducer';
export declare class ModalReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [UPDATE_DELETE_DETAIL](state: any, action: any): any;
    [CANCEL_DELETE_DETAIL](state: any): any;
}
