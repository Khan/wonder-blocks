import type {MockResponse} from "./respond-with";
import type {OperationMock, OperationMatcher, MockFn} from "./types";

/**
 * A generic mock request function for using when mocking fetch or gqlFetch.
 */
export const mockRequester = <
    TOperationType,
    TOperationMock extends OperationMock<TOperationType> = OperationMock<TOperationType>,
>(
    operationMatcher: OperationMatcher<any>,
    operationToString: (
        operationMock: TOperationMock,
        ...args: Array<any>
    ) => string,
): MockFn<TOperationType> => {
    // We want this to work in jest and in fixtures to make life easy for folks.
    // This is the array of mocked operations that we will traverse and
    // manipulate.
    const mocks: Array<OperationMock<any>> = [];

    // What we return has to be a drop in for the fetch function that is
    // provided to `GqlRouter` which is how folks will then use this mock.
    const mockFn: MockFn<TOperationType> = (
        ...args: Array<any>
    ): Promise<Response> => {
        // Iterate our mocked operations and find the first one that matches.
        for (const mock of mocks) {
            if (mock.onceOnly && mock.used) {
                // This is a once-only mock and it has been used, so skip it.
                continue;
            }
            if (operationMatcher(mock.operation, ...args)) {
                mock.used = true;
                return mock.response();
            }
        }

        // Default is to reject with some helpful info on what request
        // we rejected.
        // @ts-expect-error [FEI-5019] - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
        const operation = operationToString(...args);
        return Promise.reject(
            new Error(`No matching mock response found for request:
    ${operation}`),
        );
    };

    const addMockedOperation = <TOperation>(
        operation: TOperation,
        response: MockResponse<any>,
        onceOnly: boolean,
    ): MockFn<TOperationType> => {
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
        response: MockResponse<any>,
    ): MockFn<TOperationType> => addMockedOperation(operation, response, false);

    mockFn.mockOperationOnce = <TOperation>(
        operation: TOperation,
        response: MockResponse<any>,
    ): MockFn<TOperationType> => addMockedOperation(operation, response, true);

    return mockFn;
};