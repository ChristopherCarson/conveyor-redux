import { ADD_DANGER_ALERT, ADD_SUCCESS_ALERT, DISMISS_ALERT } from '../actionConsts';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
import { Reducer } from './reducer';
export declare class AlertsReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [ADD_DANGER_ALERT](state: any, action: any): any[];
    [ADD_SUCCESS_ALERT](state: any, action: any): any[];
    [DISMISS_ALERT](state: any, action: any): any;
}
