// @flow
/**
 * Operation types.
 */
export type GqlOperationType = "mutation" | "query";

/**
 * A GraphQL operation.
 */
export type GqlOperation<
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
> = {
    type: GqlOperationType,
    id: string,
    // We allow other things here to be passed along to the fetch function.
    // For example, we might want to pass the full query/mutation definition
    // as a string here to allow that to be sent to an Apollo server that
    // expects it. This is a courtesy to calling code; these additional
    // values are ignored by WB Data, and passed through as-is.
    [key: string]: mixed,
    ...
};

export type GqlContext = {|
    [key: string]: string,
|};

/**
 * Functions that make fetches of GQL operations.
 */
export type GqlFetchFn<TData, TVariables: {...}, TContext: GqlContext> = (
    operation: GqlOperation<TData, TVariables>,
    variables: ?TVariables,
    context: TContext,
) => Promise<Response>;

/**
 * The configuration stored in the GqlRouterContext context.
 */
export type GqlRouterConfiguration<TContext: GqlContext> = {|
    fetch: GqlFetchFn<any, any, any>,
    defaultContext: TContext,
|};

/**
 * Options for configuring a GQL fetch.
 */
export type GqlFetchOptions<TVariables: {...}, TContext: GqlContext> = {|
    variables?: TVariables,
    context?: Partial<TContext>,
|};
