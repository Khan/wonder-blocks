// @flow
import {gqlRequestMatchesMock} from "./gql-request-matches-mock.js";
import {mockRequester} from "../mock-requester.js";
import type {GqlFetchMockFn, GqlMockOperation} from "./types.js";

/**
 * A mock for the fetch function passed to GqlRouter.
 */
export const mockGqlFetch = (): GqlFetchMockFn =>
    mockRequester<GqlMockOperation<any, any, any>, _>(
        gqlRequestMatchesMock,
        (operation, variables, context) =>
            `Operation: ${operation.type} ${operation.id}
    Variables: ${
        variables == null ? "None" : JSON.stringify(variables, null, 2)
    }
    Context: ${JSON.stringify(context, null, 2)}`,
    );
