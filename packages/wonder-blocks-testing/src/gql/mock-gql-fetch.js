// @flow
import type {GqlContext} from "@khanacademy/wonder-blocks-data";
import {gqlRequestMatchesMock} from "./gql-request-matches-mock.js";
import {makeGqlMockResponse} from "./make-gql-mock-response.js";
import type {GqlMockResponse} from "./make-gql-mock-response.js";
import type {GqlMock, GqlMockOperation, GqlFetchMockFn} from "./types.js";

/**
 * A mock for the fetch function passed to GqlRouter.
 */
export const mockGqlFetch = (): GqlFetchMockFn => {
    // We want this to work in jest and in fixtures to make life easy for folks.
    // This is the array of mocked operations that we will traverse and
    // manipulate.
    const mocks: Array<GqlMock> = [];

    // What we return has to be a drop in for the fetch function that is
    // provided to `GqlRouter` which is how folks will then use this mock.
    const gqlFetchMock: GqlFetchMockFn = (
        operation,
        variables,
        context,
    ): Promise<Response> => {
        // Iterate our mocked operations and find the first one that matches.
        for (const mock of mocks) {
            if (mock.onceOnly && mock.used) {
                // This is a once-only mock and it has been used, so skip it.
                continue;
            }
            if (
                gqlRequestMatchesMock(
                    mock.operation,
                    operation,
                    variables,
                    context,
                )
            ) {
                mock.used = true;
                return mock.response();
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
        operation: GqlMockOperation<TType, TData, TVariables, TContext>,
        response: GqlMockResponse<TData>,
        onceOnly: boolean,
    ): GqlFetchMockFn => {
        const mockResponse = () => makeGqlMockResponse(response);
        mocks.push({
            operation,
            response: mockResponse,
            onceOnly,
            used: false,
        });
        return gqlFetchMock;
    };

    gqlFetchMock.mockOperation = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        operation: GqlMockOperation<TType, TData, TVariables, TContext>,
        response: GqlMockResponse<TData>,
    ): GqlFetchMockFn => addMockedOperation(operation, response, false);

    gqlFetchMock.mockOperationOnce = <
        TType,
        TData,
        TVariables: {...},
        TContext: GqlContext,
    >(
        operation: GqlMockOperation<TType, TData, TVariables, TContext>,
        response: GqlMockResponse<TData>,
    ): GqlFetchMockFn => addMockedOperation(operation, response, true);

    return gqlFetchMock;
};
