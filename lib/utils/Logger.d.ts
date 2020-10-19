export declare const isEnabled: (key?: string | undefined) => boolean;
export declare const enable: () => void;
export declare const log: (...args: any) => void;
export declare const epicError: (epicName: string, context: any, error: any) => void;
export declare const rootEpicError: (epicName: string, error: any) => void;
export declare const inputValidationParseValidationErrors: (response: any, e: any) => void;
