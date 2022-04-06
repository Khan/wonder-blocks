// @flow
import type {MockResponse} from "./make-mock-response.js";

/**
 * A valid GraphQL response as supported by our mocking framework.
 * Note that we don't currently support both data and errors being set.
 */
export type GraphQLJson<TData: {...}> =
    | {|
          data: TData,
      |}
    | {|
          errors: Array<{|
              message: string,
          |}>,
      |};

export type MockFn<TOperationType> = {|
    (...args: Array<any>): Promise<Response>,
    mockOperation: MockOperationFn<TOperationType>,
    mockOperationOnce: MockOperationFn<TOperationType>,
|};

export type OperationMock<TOperation> = {|
    operation: TOperation,
    onceOnly: boolean,
    used: boolean,
    response: () => Promise<Response>,
|};

export type OperationMatcher<TOperation> = (
    operation: TOperation,
    ...args: Array<any>
) => boolean;

export type MockOperationFn<TOperationType> = <TOperation: TOperationType>(
    operation: TOperation,
    response: MockResponse<any>,
) => MockFn<TOperationType>;
