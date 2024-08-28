import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import type {
    GraphQLJson,
    MockResponse,
} from "@khanacademy/wonder-blocks-testing-core";

export type GqlMockOperation<
    TData extends Record<any, any>,
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
> = {
    operation: GqlOperation<TData, TVariables>;
    variables?: TVariables;
    context?: TContext;
};

type GqlMockOperationFn = <
    TData extends Record<any, any>,
    TVariables extends Record<any, any>,
    TContext extends GqlContext,
    TResponseData extends GraphQLJson<TData>,
>(
    operation: GqlMockOperation<TData, TVariables, TContext>,
    response: MockResponse<TResponseData>,
) => GqlFetchMockFn;

export type GqlFetchMockFn = {
    (
        operation: GqlOperation<any, any>,
        variables: Record<any, any> | null | undefined,
        context: GqlContext,
    ): Promise<Response>;
    mockOperation: GqlMockOperationFn;
    mockOperationOnce: GqlMockOperationFn;
};
