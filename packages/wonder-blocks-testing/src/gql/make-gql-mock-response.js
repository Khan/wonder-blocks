// @flow
export opaque type GqlMockResponse<TData> =
    | {|
          type: "data",
          data: TData,
      |}
    | {|
          type: "parse",
      |}
    | {|
          type: "abort",
      |}
    | {|
          type: "status",
          statusCode: number,
      |}
    | {|
          type: "invalid",
      |}
    | {|type: "graphql", errors: $ReadOnlyArray<string>|};

/**
 * Helpers to define rejection states for mocking GQL requests.
 */
export const RespondWith = Object.freeze({
    data: <TData>(data: TData): GqlMockResponse<TData> => ({
        type: "data",
        data,
    }),
    unparseableBody: (): GqlMockResponse<any> => ({type: "parse"}),
    abortedRequest: (): GqlMockResponse<any> => ({type: "abort"}),
    errorStatusCode: (statusCode: number): GqlMockResponse<any> => {
        if (statusCode < 300) {
            throw new Error(`${statusCode} is not a valid error status code`);
        }
        return {
            type: "status",
            statusCode,
        };
    },
    nonGraphQLBody: (): GqlMockResponse<any> => ({type: "invalid"}),
    graphQLErrors: (
        errorMessages: $ReadOnlyArray<string>,
    ): GqlMockResponse<any> => ({
        type: "graphql",
        errors: errorMessages,
    }),
});

/**
 * Turns an ErrorResponse value in an actual Response that will invoke
 * that error.
 */
export const makeGqlMockResponse = <TData>(
    response: GqlMockResponse<TData>,
): Promise<Response> => {
    switch (response.type) {
        case "data":
            return Promise.resolve(
                ({
                    status: 200,
                    text: () =>
                        Promise.resolve(
                            JSON.stringify({
                                data: response.data,
                            }),
                        ),
                }: any),
            );

        case "parse":
            return Promise.resolve(
                ({
                    status: 200,
                    text: () => Promise.resolve("INVALID JSON"),
                }: any),
            );

        case "abort":
            const abortError = new Error("Mock request aborted");
            abortError.name = "AbortError";
            return Promise.reject(abortError);

        case "status":
            return Promise.resolve(
                ({
                    status: response.statusCode,
                    text: () => Promise.resolve(JSON.stringify({})),
                }: any),
            );

        case "invalid":
            return Promise.resolve(
                ({
                    status: 200,
                    text: () =>
                        Promise.resolve(
                            JSON.stringify({
                                valid: "json",
                                that: "is not a valid graphql response",
                            }),
                        ),
                }: any),
            );

        case "graphql":
            return Promise.resolve(
                ({
                    status: 200,
                    text: () =>
                        Promise.resolve(
                            JSON.stringify({
                                errors: response.errors.map((e) => ({
                                    message: e,
                                })),
                            }),
                        ),
                }: any),
            );

        default:
            throw new Error(`Unknown response type: ${response.type}`);
    }
};
