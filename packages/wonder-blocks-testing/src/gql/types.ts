import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import type {
    ConfigureFn,
    GraphQLJson,
    MockResponse,
} from "@khanacademy/wonder-blocks-testing-core";

/**
 * A mutable GraphQL operation to be mocked.
 *
 * This is used to specify what a request must match in order for a mock to
 * be used.
 */
export interface MutableGqlMockOperation<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    operation: TOperation;
    variables?: ExtractVariables<TOperation>;
    context?: TContext;
}

export type ExtractData<TOperation> = TOperation extends GqlOperation<
    infer TData,
    any
>
    ? TData
    : never;

export type ExtractVariables<TOperation> = TOperation extends GqlOperation<
    any,
    infer TVariables
>
    ? TVariables
    : never;

/**
 * A GraphQL operation to be mocked.
 *
 * This is used to specify what a request must match in order for a mock to
 * be used.
 */
export type GqlMockOperation<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> = Readonly<MutableGqlMockOperation<TOperation, TContext>>;

interface GqlMockOperationFn {
    <
        TOperation extends GqlOperation<any, any>,
        TContext extends GqlContext,
        TResponseData extends GraphQLJson<ExtractData<TOperation>>,
    >(
        /**
         * The operation to match.
         */
        operation: GqlMockOperation<TOperation, TContext>,
        /**
         * The response to return when the operation is matched.
         */
        response: MockResponse<TResponseData>,
    ): GqlFetchMockFn;
}

export interface GqlFetchMockFn {
    /**
     * The mock fetch function.
     *
     * This function is a drop-in replacement for the gqlFetch function used
     * by Wonder Blocks Data. You should not need to call this function
     * directly. Just pass this in places where you would pass a gqlFetch
     * function, as provided by the GqlRouter.
     */
    (
        operation: GqlOperation<any, any>,
        variables: Record<any, any> | null | undefined,
        context: GqlContext,
    ): Promise<Response>;

    /**
     * Mock a fetch operation.
     *
     * This adds a response for a given mocked operation. Operations are
     * matched greedily, so if only the GraphQL operation is provided, then
     * all requests for that operation will be matched, regardless of
     * variables or context.
     *
     * Regardless of how many times this mock is matched, it will be used.
     *
     * @returns The mock fetch function for chaining.
     */
    mockOperation: GqlMockOperationFn;

    /**
     * Mock a fetch operation once.
     *
     * This adds a response for a given mocked operation. Operations are
     * matched greedily, so if only the GraphQL operation is provided, then
     * all requests for that operation will be matched, regardless of
     * variables or context.
     *
     * Once the added mock is used, it will be discarded and no longer match
     * any requests.
     *
     * @returns The mock fetch function for chaining.
     */
    mockOperationOnce: GqlMockOperationFn;

    /**
     * Configure the mock fetch function with the given configuration.
     *
     * This function is provided as a convenience to allow for configuring the
     * mock fetch function in a fluent manner. The configuration is applied
     * to all mocks for a given fetch function; the last configuration applied
     * will be the one that is used for all mocked operations.
     *
     * @returns The mock fetch function for chaining.
     */
    configure: ConfigureFn<GqlMockOperation<any, any>, GraphQLJson<any>>;
}

interface WithVariablesFn<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    (variables: ExtractVariables<TOperation>): Omit<
        MatchApi<TOperation, TContext>,
        "withVariables"
    > &
        GqlMockOperation<TOperation, TContext>;
}

interface WithContextFn<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    (context: TContext): Omit<MatchApi<TOperation, TContext>, "withContext"> &
        GqlMockOperation<TOperation, TContext>;
}

export interface MatchApi<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    withVariables: WithVariablesFn<TOperation, TContext>;
    withContext: WithContextFn<TOperation, TContext>;
}

export interface MatchApiWithOperation<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> extends GqlMockOperation<TOperation, TContext>,
        MatchApi<TOperation, TContext> {}
