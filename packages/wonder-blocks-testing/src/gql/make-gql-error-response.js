// @flow
export opaque type ErrorResponse =
    | {|
          type: "parse",
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
    ParseError: (): ErrorResponse => ({type: "parse"}),
    StatusError: (statusCode: number): ErrorResponse => {
        if (statusCode < 300) {
            throw new Error(
                `${statusCode} is not a valid error response status`,
            );
        }
        return {
            type: "status",
            statusCode,
        };
    },
    InvalidResponseError: (): ErrorResponse => ({type: "invalid"}),
    GraphQLError: (errorMessages: $ReadOnlyArray<string>): ErrorResponse => ({
        type: "graphql",
        errors: errorMessages,
    }),
});

/**
 * Turns an ErrorResponse value in an actual Response that will invoke
 * that error.
 */
export const makeGqlErrorResponse = (error: ErrorResponse): Response => {
    switch (error.type) {
        case "parse":
            return ({
                status: 200,
                text: () => Promise.resolve("INVALID JSON"),
            }: any);

        case "status":
            return ({
                status: error.statusCode,
                text: () => Promise.resolve(JSON.stringify({})),
            }: any);

        case "invalid":
            return ({
                status: 200,
                text: () =>
                    Promise.resolve(
                        JSON.stringify({
                            valid: "json",
                            that: "is not a valid graphql response",
                        }),
                    ),
            }: any);

        case "graphql":
            return ({
                status: 200,
                text: () =>
                    Promise.resolve(
                        JSON.stringify({
                            errors: error.errors.map((e) => ({
                                message: e,
                            })),
                        }),
                    ),
            }: any);

        default:
            throw new Error(`Unknown error type: ${error.type}`);
    }
};
