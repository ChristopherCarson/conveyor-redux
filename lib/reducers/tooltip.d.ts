import { UPDATE_MODEL_TOOLTIP } from '../actionConsts';
import { Reducer } from './reducer';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class TooltipReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [UPDATE_MODEL_TOOLTIP](state: any, action: any): any;
}
