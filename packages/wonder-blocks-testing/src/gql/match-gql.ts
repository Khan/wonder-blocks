import {GqlContext, GqlOperation} from "@khanacademy/wonder-blocks-data";
import {clone} from "@khanacademy/wonder-stuff-core";
import {
    MatchApi,
    MatchApiWithOperation,
    MutableGqlMockOperation,
} from "./types";

interface InternalMatchApi<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> extends Omit<
            MatchApi<TOperation, TContext>,
            "operation | variables | context"
        >,
        MutableGqlMockOperation<TOperation, TContext> {}

/**
 * Create a mock GQL operation matcher.
 *
 * This function is used to create a mock GQL operation matcher. It is
 * a provided as a convenience to allow for easier type-checking of
 * operations when building mocks, rather than constructing the object
 * directly. It provides a fluent API for building a request matcher.
 *
 * @param operation The operation to match. This is always used when
 * trying to match a request.
 */
export const matchGql = <
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
>(
    operation: TOperation,
): MatchApiWithOperation<TOperation, TContext> => {
    const api: InternalMatchApi<TOperation, TContext> = {
        operation,
        withVariables: (variables) => {
            api.variables = clone(variables);
            return api;
        },
        withContext: (context) => {
            api.context = clone(context);
            return api;
        },
    };
    return api;
};
