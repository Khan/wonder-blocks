import {gqlRequestMatchesMock} from "./gql-request-matches-mock";
import {mockRequester} from "../mock-requester";
import type {GqlFetchMockFn, GqlMockOperation} from "./types";

/**
 * A mock for the fetch function passed to GqlRouter.
 */
// @ts-expect-error [FEI-5019] - TS2709 - Cannot use namespace '_' as a type.
export const mockGqlFetch = (): GqlFetchMockFn =>
    mockRequester<GqlMockOperation<any, any, any>, _>(
        gqlRequestMatchesMock,
        (operation, variables, context) =>
            `Operation: ${operation.type} ${operation.id}
Variables: ${variables == null ? "None" : JSON.stringify(variables, null, 2)}
Context: ${JSON.stringify(context, null, 2)}`,
    );
