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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TData, // TVariables is not used to define a field on this type, but it is used
    // to ensure that calls using this operation will properly consume the
    // correct variables type.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TVariables extends object = Empty,
> = {
    type: GqlOperationType;
    id: string;
    // We allow other things here to be passed along to the fetch function.
    // For example, we might want to pass the full query/mutation definition
    // as a string here to allow that to be sent to an Apollo server that
    // expects it. This is a courtesy to calling code; these additional
    // values are ignored by WB Data, and passed through as-is.
    [key: string]: unknown;
};

export type GqlContext = {
    [key: string]: string;
};

/**
 * Functions that make fetches of GQL operations.
 */
export type GqlFetchFn<
    TData,
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> = (
    operation: GqlOperation<TData, TVariables>,
    variables: TVariables | null | undefined,
    context: TContext,
) => Promise<Response>;

/**
 * The configuration stored in the GqlRouterContext context.
 */
export type GqlRouterConfiguration<TContext extends GqlContext> = {
    fetch: GqlFetchFn<any, any, any>;
    defaultContext: TContext;
};

/**
 * Options for configuring a GQL fetch.
 */
export type GqlFetchOptions<
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> = {
    variables?: TVariables;
    context?: Partial<TContext>;
};

/**
 * The data of a GraphQL response that reported errors.
 *
 * Each top-level field is either the requested value or null. A field that
 * errored is nulled, and that null propagates to the nearest nullable
 * ancestor, so the top level of the result is the only level whose shape we
 * can state with certainty.
 */
export type GqlPartialData<TData> = {
    [K in keyof TData]: TData[K] | null;
};

/**
 * An error entry from the `errors` array of a GraphQL response.
 */
export type GqlResponseError = {
    message: string;
    locations?: ReadonlyArray<{line: number; column: number}>;
    path?: ReadonlyArray<string | number>;
    extensions?: Record<string, unknown>;
};

/**
 * The payload of a GraphQL response that reported errors.
 *
 * `data` is absent or null when the whole operation failed; otherwise it is
 * the partial data the server was able to resolve.
 */
export type GqlErrorResultPayload<TData> = {
    data?: GqlPartialData<TData> | null;
    errors: ReadonlyArray<GqlResponseError>;
};
