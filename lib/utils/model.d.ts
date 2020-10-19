import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare const initState: {};
export declare const DEFAULT_PAGINATION_AMT = 20;
export declare const getModelStore: (state: any, modelName: string) => unknown;
export declare const getPaginatedNode: (schema: SchemaBuilder, state: any, modelName: string, id: string) => {} | null;
export declare const getTabIdentifier: ({ modelName, tabList }: {
    modelName: string;
    tabList: any;
}) => string;
export declare const getDefaultModelStore: () => {
    order: never[];
    values: {};
};
export declare const getOrderedValues: (store: any) => any;
export declare const updateIndex: (state: any, modelName: string, data: any) => any;
export declare const selectModel: (obj: any) => {};
export declare const getDetailUrl: ({ modelName, id }: {
    modelName: string;
    id: string;
}) => string;
export declare const getIndexUrl: ({ modelName }: {
    modelName: string;
}) => string;
