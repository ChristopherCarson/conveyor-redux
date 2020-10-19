import { MENU_OPEN, DATA_OPTIONS_UPDATE, EXISTING_VALUE_UPDATE } from '../actionConsts';
import { Reducer } from './reducer';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class OptionsReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [MENU_OPEN](state: any, action: any): (val: unknown) => any;
    [DATA_OPTIONS_UPDATE](state: any, action: any): (val: unknown) => any;
    [EXISTING_VALUE_UPDATE](state: any, action: any): (val: unknown) => any;
}
