// @flow
/**
 * Operation types.
 */
export type GqlOperationType = "mutation" | "query";

/**
 * A GraphQL operation.
 */
export type GqlOperation<
    TType: GqlOperationType,
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
 * Functions that make fetches of GQL operations.
 */
export type FetchFn<TType, TData, TVariables: {...}, TContext: GqlContext> = (
    operation: GqlOperation<TType, TData, TVariables>,
    variables: ?TVariables,
    context: TContext,
) => Promise<Response>;

/**
 * The configuration stored in the GqlRouterContext context.
 */
export type GqlRouterConfiguration<TContext: GqlContext> = {|
    fetch: FetchFn<any, any, any, any>,
    defaultContext: TContext,
|};

/**
 * Options for configuring a GQL fetch.
 */
export type GqlFetchOptions<TVariables: {...}, TContext: GqlContext> = {|
    variables?: TVariables,
    context?: Partial<TContext>,
|};
