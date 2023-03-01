import type {MockResponse} from "../respond-with";

export type FetchMockOperation = RegExp | string;

type FetchMockOperationFn = (
    operation: FetchMockOperation,
    response: MockResponse<any>,
) => FetchMockFn;

export type FetchMockFn = {
    (input: RequestInfo, init?: RequestInit): Promise<Response>;
    mockOperation: FetchMockOperationFn;
    mockOperationOnce: FetchMockOperationFn;
};
