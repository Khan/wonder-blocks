import type {MockResponse} from "../respond-with";
import {ConfigureFn} from "../types";

export type FetchMockOperation = RegExp | string;

interface FetchMockOperationFn {
    (
        /**
         * The operation to match.
         *
         * This is a string for an exact match, or a regex. This is compared to
         * to the URL of the fetch request to determine if it is a matching
         * request.
         */
        operation: FetchMockOperation,

        /**
         * The response to return when the operation is matched.
         */
        response: MockResponse<any>,
    ): FetchMockFn;
}

export type FetchMockFn = {
    /**
     * The mock fetch function.
     *
     * This function is a drop-in replacement for the fetch function. You should
     * not need to call this function directly. Just replace the normal fetch
     * function implementation with this.
     */
    (input: RequestInfo, init?: RequestInit): Promise<Response>;

    /**
     * Mock a fetch operation.
     *
     * This adds a response for a given mocked operation. Regardless of how
     * many times this mock is matched, it will be used.
     *
     * @returns The mock fetch function for chaining.
     */
    mockOperation: FetchMockOperationFn;

    /**
     * Mock a fetch operation once.
     *
     * This adds a response for a given mocked operation that will only be used
     * once and discarded.
     *
     * @returns The mock fetch function for chaining.
     */
    mockOperationOnce: FetchMockOperationFn;

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
    configure: ConfigureFn<FetchMockOperation, any>;
};
