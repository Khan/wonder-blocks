import {GqlContext, GqlOperation} from "@khanacademy/wonder-blocks-data";
import {clone} from "@khanacademy/wonder-stuff-core";
import {
    ExtractVariables,
    GqlMockOperation,
    MutableGqlMockOperation,
} from "./types";

interface WithVariablesFn<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    (variables: ExtractVariables<TOperation>): WithContextApi<
        TOperation,
        TContext
    > &
        GqlMockOperation<TOperation, TContext>;
}

interface WithContextFn<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    (context: TContext): WithVariablesApi<TOperation, TContext> &
        GqlMockOperation<TOperation, TContext>;
}

interface WithVariablesApi<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    withVariables: WithVariablesFn<TOperation, TContext>;
}

interface WithContextApi<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> {
    withContext: WithContextFn<TOperation, TContext>;
}

interface MatchApi<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> extends WithVariablesApi<TOperation, TContext>,
        WithContextApi<TOperation, TContext>,
        GqlMockOperation<TOperation, TContext> {}

interface InternalMatchApi<
    TOperation extends GqlOperation<any, any>,
    TContext extends GqlContext,
> extends WithVariablesApi<TOperation, TContext>,
        WithContextApi<TOperation, TContext>,
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
): MatchApi<TOperation, TContext> => {
    const api: InternalMatchApi<TOperation, TContext> = {
        operation,
        withVariables: (
            variables: ExtractVariables<TOperation>,
        ): WithContextApi<TOperation, TContext> &
            MutableGqlMockOperation<TOperation, TContext> => {
            api.variables = clone(variables);
            return api;
        },
        withContext: (
            context: TContext,
        ): WithVariablesApi<TOperation, TContext> &
            MutableGqlMockOperation<TOperation, TContext> => {
            api.context = clone(context);
            return api;
        },
    };
    return api;
};
