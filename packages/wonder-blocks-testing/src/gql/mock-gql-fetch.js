// @flow
import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import {gqlRequestMatch} from "./gql-request-match.js";
import {makeGqlMockResponse} from "./make-gql-mock-response.js";
import type {GqlMockResponse} from "./make-gql-mock-response.js";

type OperationOptions<
    TType,
    TData,
    TVariables: {...},
    TContext: GqlContext,
> = {|
    operation: GqlOperation<TType, TData, TVariables>,
    variables?: TVariables,
    context?: TContext,
|};

type GqlMockOperationFn = <
    TType,
    TData,
    TVariables: {...},
    TContext: GqlContext,
>(
    options: OperationOptions<TType, TData, TVariables, TContext>,
    response: GqlMockResponse<TData>,
) => GqlFetchMockFn;

type GqlFetchMockFn = {|
    (
        operation: GqlOperation<any, any, any>,
        variables: ?{...},
        context: GqlContext,
    ): Promise<Response>,
    mockOperation: GqlMockOperationFn,
    mockOperationOnce: GqlMockOperationFn,
|};

type MockedOperation = {|
    operation: GqlOperation<any, any, any>,
    variables: ?any,
    context: ?any,
    onceOnly: boolean,
    used: boolean,
    response: () => Promise<Response>,
|};

const makeMockedOperation = (
    options: OperationOptions<any, any, any, any>,
    response: () => Promise<Response>,
    onceOnly: boolean = false,
): MockedOperation => ({
    operation: options.operation,
    variables: options.variables,
    context: options.context,
    response,
    onceOnly,
    used: false,
});

/**
 * A mock for the fetch function passed to GqlRouter.
 */
export const mockGqlFetch = (): GqlFetchMockFn => {
    // We want this to work in jest and in fixtures to make life easy for folks.
    // This is the array of mocked operations that we will traverse and
    // manipulate.
    const mockedOperations: Array<MockedOperation> = [];

    // What we return has to be a drop in for the fetch function that is
    // provided to `GqlRouter` which is how folks will then use this mock.
    const gqlFetchMock: GqlFetchMockFn = (
        operation,
        variables,
        context,
    ): Promise<Response> => {
        // Iterate our mocked operations and find the first one that matches.
        for (const mockedOperation of mockedOperations) {
            if (mockedOperation.onceOnly && mockedOperation.used) {
                // This is a once-only mock and it has been used, so skip it.
                continue;
            }
            if (
                gqlRequestMatch(
                    mockedOperation.operation,
                    mockedOperation.variables,
                    mockedOperation.context,
                    operation,
                    variables,
                    context,
                )
            ) {
                mockedOperation.used = true;
                return mockedOperation.response();
            }
        }

        // Default is to reject with some helpful info on what request
        // we rejected.
        return Promise.reject(
            new Error(`No matching GraphQL mock response found for request:
    Operation: ${operation.type} ${operation.id}
    Variables: ${
        variables == null ? "None" : JSON.stringify(variables, null, 2)
    }
    Context: ${JSON.stringify(context, null, 2)}`),
        );
    };

    const addMockedOperation = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        response: GqlMockResponse<TData>,
        onceOnly: boolean,
    ): GqlFetchMockFn => {
        const mockResponse = () => makeGqlMockResponse(response);
        mockedOperations.push(
            makeMockedOperation(options, mockResponse, onceOnly),
        );
        return gqlFetchMock;
    };

    gqlFetchMock.mockOperation = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        response: GqlMockResponse<TData>,
    ): GqlFetchMockFn => addMockedOperation(options, response, false);

    gqlFetchMock.mockOperationOnce = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        response: GqlMockResponse<TData>,
    ): GqlFetchMockFn => addMockedOperation(options, response, true);

    return gqlFetchMock;
};
