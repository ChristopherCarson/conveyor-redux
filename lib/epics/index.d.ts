import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class ConveyorEpic {
    schema: SchemaBuilder;
    queryBuilder: QueryBuilder;
    constructor(schema: SchemaBuilder, queryBuilder: QueryBuilder);
    makeEpic(store: any): (action$: any, state$: any, dep: any) => any;
}
/**
 * Combine epics together and catch any errors when creating the root epic.
 * If there are any errors it will log it and add the error to the store.
 * credit: https://github.com/redux-observable/redux-observable/issues/94#issuecomment-396763936
 * @param store - the store of the application
 * @param epics - an object containing all the epics to be combined
 * @return The combined epics
 */
export declare const combineEpicsAndCatchErrors: (store: any, ...epics: any) => (action$: any, state$: any, dep: any) => any;
