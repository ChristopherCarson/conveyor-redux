import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare const initState: {};
export declare const getEditValue: ({ schema, modelName, fieldName, value }: {
    schema: SchemaBuilder;
    modelName: string;
    fieldName: string;
    value: any;
}) => any;
export declare const selectEdit: (state: any) => unknown;
