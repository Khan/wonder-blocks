import type {MockResponse} from "./respond-with";
import type {
    OperationMock,
    OperationMatcher,
    MockFn,
    MockConfiguration,
} from "./types";

/**
 * A generic mock request function for using when mocking fetch or gqlFetch.
 */
export const mockRequester = <TOperationType, TResponseData>(
    operationMatcher: OperationMatcher<any>,
    operationToString: (...args: Array<any>) => string,
): MockFn<TOperationType, TResponseData> => {
    // We want this to work in jest and in fixtures to make life easy for folks.
    // This is the array of mocked operations that we will traverse and
    // manipulate.
    const mocks: Array<OperationMock<any>> = [];

    const configuration: MockConfiguration = {
        hardFailOnUnmockedRequests: false,
    };

    const getMatchingMock = (
        ...args: Array<any>
    ): OperationMock<any> | null => {
        // Iterate our mocked operations and find the first one that matches.
        for (const mock of mocks) {
            if (mock.onceOnly && mock.used) {
                // This is a once-only mock and it has been used, so skip it.
                continue;
            }
            if (operationMatcher(mock.operation, ...args)) {
                mock.used = true;
                return mock;
            }
        }
        return null;
    };

    // What we return has to be a drop in replacement for the mocked function
    // which is how folks will then use this mock.
    const mockFn: MockFn<TOperationType, TResponseData> = (
        ...args: Array<any>
    ): Promise<Response> => {
        const matchingMock = getMatchingMock(...args);
        if (matchingMock) {
            return matchingMock.response();
        }

        // If we get here, there is no match.
        const operation = operationToString(...args);
        const noMatchError =
            new Error(`No matching mock response found for request:
    ${operation}`);
        if (configuration.hardFailOnUnmockedRequests) {
            // When we are set to hard fail, we do what Apollo's MockLink
            // does and throw an error immediately. This catastrophically fails
            // test cases when a request wasn't matched, which can be brutal
            // in some cases, though is also helpful for debugging.
            throw noMatchError;
        }

        // Our default is to return a rejected promise so that errors
        // are handled by the code under test rather than hard failing
        // everything.
        return Promise.reject(noMatchError);
    };

    const addMockedOperation = <TOperation>(
        operation: TOperation,
        response: MockResponse<TResponseData>,
        onceOnly: boolean,
    ): MockFn<TOperationType, TResponseData> => {
        const mockResponse = () => response.toPromise();
        mocks.push({
            operation,
            response: mockResponse,
            onceOnly,
            used: false,
        });
        return mockFn;
    };

    mockFn.mockOperation = <TOperation>(
        operation: TOperation,
        response: MockResponse<TResponseData>,
    ): MockFn<TOperationType, TResponseData> =>
        addMockedOperation(operation, response, false);

    mockFn.mockOperationOnce = <TOperation>(
        operation: TOperation,
        response: MockResponse<TResponseData>,
    ): MockFn<TOperationType, TResponseData> =>
        addMockedOperation(operation, response, true);

    mockFn.configure = (
        config: Partial<MockConfiguration>,
    ): MockFn<TOperationType, TResponseData> => {
        Object.assign(configuration, config);
        return mockFn;
    };

    return mockFn;
};
