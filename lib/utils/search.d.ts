export declare const initState: {
    queryText: string;
    entries: never[];
    dropdown: boolean;
};
export declare const selectSearch: (obj: any) => {
    queryText: string;
    entries: never[];
    dropdown: boolean;
};
export declare const selectSearchDropdown: (state: any) => boolean;
export declare const selectSearchEntries: (state: any) => never[];
export declare const selectSearchQueryText: (state: any) => string;
