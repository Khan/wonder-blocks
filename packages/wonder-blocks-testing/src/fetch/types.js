//@flow
import type {MockResponse} from "../respond-with.js";

export type FetchMockOperation = RegExp | string;

type FetchMockOperationFn = (
    operation: FetchMockOperation,
    response: MockResponse<any>,
) => FetchMockFn;

export type FetchMockFn = {|
    (input: RequestInfo, init?: RequestOptions): Promise<Response>,
    mockOperation: FetchMockOperationFn,
    mockOperationOnce: FetchMockOperationFn,
|};
