//@flow
import type {OperationMock} from "../types.js";
import type {MockResponse} from "../make-mock-response.js";

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

export type FetchMock = OperationMock<FetchMockOperation>;
