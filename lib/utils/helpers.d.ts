import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare const storeValueToArrayBuffer: (value: number[]) => ArrayBuffer;
export declare const getFilters: ({ schema, modelName, tableView }: {
    schema: SchemaBuilder;
    modelName: string;
    tableView: any;
}) => any[];
export declare const getSort: ({ schema, modelName, tableView }: {
    schema: SchemaBuilder;
    modelName: string;
    tableView?: any;
}) => any;
export declare const getPage: ({ modelName, tableView }: {
    modelName: string;
    tableView: any;
}) => {
    current: number;
    per_page: number;
};
export declare const editFieldToQueryInput: ({ schema, modelName, fieldName, value, type }: {
    schema?: SchemaBuilder | undefined;
    modelName: string;
    fieldName: string;
    value: any;
    type?: any;
}) => any;
export declare const isValidationError: (response: any) => boolean;
export declare const prepValidationErrors: ({ schema, context, error }: {
    schema: SchemaBuilder;
    context: any;
    error: any;
}) => {
    [index: string]: string[];
};
export declare const getEditMutationInputVariables: ({ schema, modelName, node }: {
    schema: SchemaBuilder;
    modelName: string;
    node: any;
}) => any;
export declare const getDeleteErrors: ({ data, context }: {
    data: any;
    context: any;
}) => string[] | undefined;
export declare const getCreateSubmitValues: ({ schema, formStack, modelName }: {
    schema: SchemaBuilder;
    formStack: any;
    modelName: string;
}) => unknown;
export declare const fileSubmitToBlob: ({ payload, query, value }: {
    payload: any;
    query: any;
    value: any;
}) => FormData;
export declare const isModelPathPrefix: (path: string[], schema: SchemaBuilder) => unknown;
export declare const modelIndexPath: ({ path, schema }: {
    path: string[];
    schema: SchemaBuilder;
}) => {
    type: string;
    payload: any;
}[] | undefined;
export declare const modelDetailPath: ({ path, schema }: {
    path: string[];
    schema: SchemaBuilder;
}) => {
    type: string;
    payload: any;
}[] | undefined;
export declare const modelCreatePath: ({ path, schema }: {
    path: string[];
    schema: SchemaBuilder;
}) => never[] | undefined;
export declare const pathFunctions: (({ path, schema }: {
    path: string[];
    schema: SchemaBuilder;
}) => {
    type: string;
    payload: any;
}[] | undefined)[];
export declare const getPath: (locationChangeAction: string) => string[];
export declare const tableChangedFields: ({ modelName, id, state$ }: {
    modelName: string;
    id: string;
    state$: any;
}) => any;
export declare const getMissingFieldsMessage: ({ schema, missingFields, modelName }: {
    schema: SchemaBuilder;
    missingFields: any;
    modelName: string;
}) => string;
