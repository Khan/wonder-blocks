//@flow
import type {GqlOperation, GqlContext} from "@khanacademy/wonder-blocks-data";
import type {MockResponse, GraphQLJson} from "../make-mock-response.js";

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
>(
    operation: GqlMockOperation<TData, TVariables, TContext>,
    response: MockResponse<GraphQLJson<TData>>,
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

export type GqlMock = {|
    operation: GqlMockOperation<any, any, any>,
    onceOnly: boolean,
    used: boolean,
    response: () => Promise<Response>,
|};
