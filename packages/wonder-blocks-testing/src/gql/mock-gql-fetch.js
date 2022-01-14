// @flow
import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import {gqlRequestMatch} from "./gql-request-match.js";
import {makeGqlErrorResponse} from "./make-gql-error-response.js";
import type {ErrorResponse} from "./make-gql-error-response.js";

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

type GqlMockResolvedOperationFn = <
    TType,
    TData,
    TVariables: {...},
    TContext: GqlContext,
>(
    options: OperationOptions<TType, TData, TVariables, TContext>,
    data: TData,
) => GqlFetchMockFn;

type GqlMockRejectedOperationFn = <
    TType,
    TData,
    TVariables: {...},
    TContext: GqlContext,
>(
    options: OperationOptions<TType, TData, TVariables, TContext>,
    error: ErrorResponse,
) => GqlFetchMockFn;

type GqlFetchMockFn = {|
    (
        operation: GqlOperation<any, any, any>,
        variables: ?{...},
        context: GqlContext,
    ): Promise<Response>,
    mockResolvedOperationOnce: GqlMockResolvedOperationFn,
    mockRejectedOperationOnce: GqlMockRejectedOperationFn,
    mockResolvedOperation: GqlMockResolvedOperationFn,
    mockRejectedOperation: GqlMockRejectedOperationFn,
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

    gqlFetchMock.mockResolvedOperation = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        data: TData,
    ): GqlFetchMockFn => {
        const response = () =>
            Promise.resolve(
                ({
                    status: 200,
                    text: () => Promise.resolve(JSON.stringify({data})),
                }: any),
            );
        mockedOperations.push(makeMockedOperation(options, response, false));
        return gqlFetchMock;
    };

    gqlFetchMock.mockRejectedOperation = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        error: ErrorResponse,
    ): GqlFetchMockFn => {
        const response = () => Promise.resolve(makeGqlErrorResponse(error));
        mockedOperations.push(makeMockedOperation(options, response, false));
        return gqlFetchMock;
    };

    gqlFetchMock.mockResolvedOperationOnce = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        data: TData,
    ): GqlFetchMockFn => {
        const response = () =>
            Promise.resolve(
                ({
                    status: 200,
                    text: () => Promise.resolve(JSON.stringify({data})),
                }: any),
            );
        mockedOperations.push(makeMockedOperation(options, response, true));
        return gqlFetchMock;
    };

    gqlFetchMock.mockRejectedOperationOnce = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        options: OperationOptions<TType, TData, TVariables, TContext>,
        error: ErrorResponse,
    ): GqlFetchMockFn => {
        const response = () => Promise.resolve(makeGqlErrorResponse(error));
        mockedOperations.push(makeMockedOperation(options, response, true));
        return gqlFetchMock;
    };

    return gqlFetchMock;
};
