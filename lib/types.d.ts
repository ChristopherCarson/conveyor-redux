declare type QueryType = 'index' | 'detail' | 'select' | 'tooltip' | 'indexRelationship' | 'detailRelationship' | 'selectRelationship' | 'search' | 'create' | 'update' | 'delete' | 'deleteCascades';
interface QueryBuilder {
    buildQuery({ modelName, queryType }: {
        modelName?: string;
        queryType: QueryType;
    }): any;
    sendRequest({ query, variables, formData }: {
        query?: string;
        variables?: object;
        formData?: any;
    }): Promise<{
        data: any;
        error: boolean;
    } | {
        data: null;
        error: any;
    }>;
    buildAndSendRequest({ modelName, variables, queryType }: {
        modelName: string;
        variables: object;
        queryType: QueryType;
    }): Promise<{
        data: any;
        error: boolean;
    } | {
        data: null;
        error: any;
    }>;
}
declare type ROEpic = (action$: any, state$: any) => any;
interface EpicPayload {
    modelName?: string;
    fieldName?: string;
    id?: string;
    parentModelName?: string;
    parentId?: string;
    changedFields?: any;
    removedId?: string;
    queryString?: string;
    queryText?: string;
    expiresOn?: number;
}
