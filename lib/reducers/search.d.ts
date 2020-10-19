import { SEARCH_QUERY_TEXT_CHANGED, SEARCH_QUERY_LINK_CLICKED, UPDATE_SEARCH_ENTRIES, SEARCH_BLUR, TRIGGER_SEARCH } from '../actionConsts';
import { Reducer } from './reducer';
import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class SearchReducer extends Reducer {
    constructor(schema: SchemaBuilder);
    [UPDATE_SEARCH_ENTRIES](state: any, action: any): any;
    [SEARCH_QUERY_TEXT_CHANGED](state: any, action: any): any;
    [SEARCH_QUERY_LINK_CLICKED](): {
        queryText: string;
        entries: never[];
        dropdown: boolean;
    };
    [SEARCH_BLUR](state: any): any;
    [TRIGGER_SEARCH](state: any): any;
}
