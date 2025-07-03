import type {MockResponse} from "./respond-with";

/**
 * A valid GraphQL response as supported by our mocking framework.
 * Note that we don't currently support both data and errors being set.
 */
export type GraphQLJson<TData extends Record<any, any>> =
    | {
          data: TData;
      }
    | {
          errors: Array<{
              message: string;
          }>;
      };

export interface MockFn<TOperationType, TResponseData> {
    /**
     * The mock fetch function.
     *
     * This function is a drop-in replacement for the fetch function being
     * mocked. It is recommended that a more strongly-typed definition is
     * provided in the consuming codebase, as this definition is intentionally
     * loose to allow for mocking any fetch operation.
     */
    (...args: Array<any>): Promise<Response>;

    /**
     * Mock a fetch operation.
     *
     * This adds a response for a given mocked operation of the given type.
     * Matches are determined by the operation matcher provided to the
     * mockRequester function that creates the mock fetch function.
     */
    mockOperation: MockOperationFn<TOperationType, TResponseData>;

    /**
     * Mock a fetch operation once.
     *
     * This adds a response for a given mocked operation of the given type that
     * will only be used once and discarded. Matches are determined by the
     * operation matcher provided to the mockRequester function that creates the
     * mock fetch function.
     */
    mockOperationOnce: MockOperationFn<TOperationType, TResponseData>;

    /**
     * Configure the mock fetch function with the given configuration.
     *
     * This function is provided as a convenience to allow for configuring the
     * mock fetch function in a fluent manner. The configuration is applied
     * to all mocks for a given fetch function; the last configuration applied
     * will be the one that is used for all mocked operations.
     */
    configure: ConfigureFn<TOperationType, TResponseData>;
}

export type OperationMock<TOperation> = {
    operation: TOperation;
    onceOnly: boolean;
    used: boolean;
    response: () => Promise<Response>;
};

export type OperationMatcher<TOperation> = (
    operation: TOperation,
    ...args: Array<any>
) => boolean;

export type MockOperationFn<TOperationType, TResponseData> = <
    TOperation extends TOperationType,
>(
    operation: TOperation,
    response: MockResponse<TResponseData>,
) => MockFn<TOperationType, TResponseData>;

/**
 * Configuration options for mocked fetches.
 */
export type MockConfiguration = {
    /**
     * If true, any requests that don't match a mock will throw an error
     * immediately on the request being made; otherwise, if false, unmatched
     * requests will return a rejected promise.
     *
     * Defaults to false. When true, this is akin to the Apollo MockLink
     * behavior that throws upon the request being. This is useful as it will
     * clearly fail a test early, indicating that a request was not mocked.
     * However, that mode requires all requests to be mocked, which can be
     * cumbersome and unncessary. Having unmocked requests return a rejected
     * promise is more flexible and allows for more granular control over
     * mocking, allowing developers to mock only the requests they care about
     * and let the error handling of their code deal with the rejected promises.
     */
    hardFailOnUnmockedRequests: boolean;
};

export interface ConfigureFn<TOperationType, TResponseData> {
    /**
     * Configure the mock fetch function with the given configuration.
     *
     * @param config The configuration changes to apply to the mock fetch
     * function.
     * @returns The mock fetch function .
     */
    (config: Partial<MockConfiguration>): MockFn<TOperationType, TResponseData>;
}
