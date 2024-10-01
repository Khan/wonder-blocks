import {GqlContext, GqlOperation} from "@khanacademy/wonder-blocks-data";
import {clone} from "@khanacademy/wonder-stuff-core";
import {GqlMockOperation, MutableGqlMockOperation} from "./types";

interface WithVariablesFn<
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> {
    (variables: TVariables): WithContextApi<TVariables, TContext> &
        GqlMockOperation<any, TVariables, TContext>;
}

interface WithContextFn<
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> {
    (context: TContext): WithVariablesApi<TVariables, TContext> &
        GqlMockOperation<any, TVariables, TContext>;
}

interface WithVariablesApi<
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> {
    withVariables: WithVariablesFn<TVariables, TContext>;
}

interface WithContextApi<
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> {
    withContext: WithContextFn<TVariables, TContext>;
}

interface MatchApi<
    TData extends Record<any, any>,
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> extends WithVariablesApi<TVariables, TContext>,
        WithContextApi<TVariables, TContext>,
        GqlMockOperation<TData, TVariables, TContext> {}

interface InternalMatchApi<
    TData extends Record<any, any>,
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> extends WithVariablesApi<TVariables, TContext>,
        WithContextApi<TVariables, TContext>,
        MutableGqlMockOperation<TData, TVariables, TContext> {}

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
    TData extends Record<any, any>,
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
>(
    operation: GqlOperation<TData, TVariables>,
): MatchApi<TData, TVariables, TContext> => {
    const api: InternalMatchApi<TData, TVariables, TContext> = {
        operation,
        withVariables: (
            variables: TVariables,
        ): WithContextApi<TVariables, TContext> &
            MutableGqlMockOperation<any, TVariables, TContext> => {
            api.variables = clone(variables);
            return api;
        },
        withContext: (
            context: TContext,
        ): WithVariablesApi<TVariables, TContext> &
            MutableGqlMockOperation<any, TVariables, TContext> => {
            api.context = clone(context);
            return api;
        },
    };
    return api;
};
