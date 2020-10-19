import { SchemaBuilder } from '@autoinvent/conveyor-schema';
export declare const initState: {
    index: number;
    stack: never[];
};
export declare const handleStackPop: (state: any) => any;
export declare const handleStackPush: (state: any, action: any) => any;
export declare const clearFormStack: () => {
    index: number;
    stack: never[];
};
export declare const handleEnterFormStack: (state: any, action: any) => any;
export declare const handleDetailCreate: (schema: SchemaBuilder, state: any, action: any) => any;
export declare const handleCreateInputChange: (state: any, action: any) => (val: unknown) => any;
export declare const handleValidationErrorCreate: (state: any, action: any) => any;
export declare const handleClearErrorSave: (state: any) => unknown;
export declare const selectCreate: (state: any) => {
    index: number;
    stack: never[];
};
