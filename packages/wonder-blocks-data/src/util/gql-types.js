// @flow
/**
 * A GraphQL operation.
 */
export type GqlOperation<
    TType: "mutation" | "query",
    // TData is not used to define a field on this type, but it is used
    // to ensure that calls using this operation will properly return the
    // correct data type.
    // eslint-disable-next-line no-unused-vars
    TData,
    // TVariables is not used to define a field on this type, but it is used
    // to ensure that calls using this operation will properly consume the
    // correct variables type.
    // eslint-disable-next-line no-unused-vars
    TVariables: {...} = Empty,
> = {|
    type: TType,
    id: string,
|};

export type GqlContext = {|
    [key: string]: string,
|};

/**
 * Functions that make fetches.
 * Supports `fetch` and similar methods.
 */
export type FetchFn<TRequestOptions: RequestOptions = RequestOptions> = (
    url: string,
    options?: TRequestOptions,
) => Promise<Response>;

/**
 * Functions that details of a GQL request and generate the URL.
 */
export type GetURLForOperation<
    TData,
    TVariables: {...},
    TContext: GqlContext,
    TType,
> = (
    operation: GqlOperation<TType, TData, TVariables>,
    variables: ?TVariables,
    context: TContext,
) => URL;

/**
 * The configuration stored in the GqlRouterContext context.
 */
export type GqlRouterConfiguration<TContext: GqlContext> = {|
    fetch: FetchFn<any>,
    getURLForOperation: GetURLForOperation<any, any, any, any>,
    defaultContext: TContext,
|};
