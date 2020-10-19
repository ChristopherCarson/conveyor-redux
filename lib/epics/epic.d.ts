import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare class Epic {
    schema: SchemaBuilder;
    queryBuilder: QueryBuilder;
    constructor(schema: SchemaBuilder, queryBuilder: QueryBuilder);
    makeEpic(): ROEpic[];
}
