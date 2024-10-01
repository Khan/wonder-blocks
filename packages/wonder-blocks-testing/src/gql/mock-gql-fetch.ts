import {
    GraphQLJson,
    mockRequester,
} from "@khanacademy/wonder-blocks-testing-core";
import {gqlRequestMatchesMock} from "./gql-request-matches-mock";
import type {GqlFetchMockFn, GqlMockOperation} from "./types";

/**
 * A mock for the fetch function passed to GqlRouter.
 */
export const mockGqlFetch = (): GqlFetchMockFn =>
    mockRequester<GqlMockOperation<any, any>, GraphQLJson<any>>(
        gqlRequestMatchesMock,
        // Note that the identation at the start of each line is important.
        // TODO(somewhatabstract): Make a stringify that indents each line of
        // the output properly too.
        (operation, variables, context) =>
            `Operation: ${operation.type} ${operation.id}
    Variables: ${
        variables == null ? "None" : JSON.stringify(variables, null, 2)
    }
    Context: ${JSON.stringify(context, null, 2)}`,
    );
