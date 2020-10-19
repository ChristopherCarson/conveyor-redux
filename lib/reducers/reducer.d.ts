import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class Reducer {
    schema: SchemaBuilder;
    initState: any;
    constructor(schema: SchemaBuilder, initState: any);
    reduce(state: any, action: any): any;
}
