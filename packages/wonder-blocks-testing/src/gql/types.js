//@flow
import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import type {GraphQLJson} from "../types.js";
import type {MockResponse} from "../respond-with.js";

export type GqlMockOperation<
    TData: {...},
    TVariables: {...},
    TContext: GqlContext,
> = {|
    operation: GqlOperation<TData, TVariables>,
    variables?: TVariables,
    context?: TContext,
|};

type GqlMockOperationFn = <
    TData: {...},
    TVariables: {...},
    TContext: GqlContext,
    TResponseData: GraphQLJson<TData>,
>(
    operation: GqlMockOperation<TData, TVariables, TContext>,
    response: MockResponse<TResponseData>,
) => GqlFetchMockFn;

export type GqlFetchMockFn = {|
    (
        operation: GqlOperation<any, any>,
        variables: ?{...},
        context: GqlContext,
    ): Promise<Response>,
    mockOperation: GqlMockOperationFn,
    mockOperationOnce: GqlMockOperationFn,
|};
