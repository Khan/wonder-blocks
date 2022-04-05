// @flow
import {ResponseImpl} from "./response-impl.js";
import type {GraphQLJson} from "./types.js";

/**
 * Describes a mock response to a fetch request.
 */
export opaque type MockResponse<TJson> =
    | {|
          type: "text",
          text: string | (() => string),
          statusCode: number,
      |}
    | {|
          type: "reject",
          error: Error | (() => Error),
      |};

/**
 * Helper for creating a text-based mock response.
 */
const textResponse = <TData>(
    text: string | (() => string),
    statusCode: number = 200,
): MockResponse<TData> => ({
    type: "text",
    text,
    statusCode,
});

/**
 * Helper for creating a rejected mock response.
 */
const rejectResponse = (error: Error | (() => Error)): MockResponse<empty> => ({
    type: "reject",
    error,
});

/**
 * Helpers to define mock responses for mocked requests.
 */
export const RespondWith = Object.freeze({
    /**
     * Response with text body and status code.
     * Status code defaults to 200.
     */
    text: <TData = string>(
        text: string,
        statusCode: number = 200,
    ): MockResponse<TData> => textResponse<TData>(text, statusCode),

    /**
     * Response with JSON body and status code 200.
     */
    json: <TJson: {...}>(json: TJson): MockResponse<TJson> =>
        textResponse<TJson>(() => JSON.stringify(json)),

    /**
     * Response with GraphQL data JSON body and status code 200.
     */
    graphQLData: <TData: {...}>(
        data: TData,
    ): MockResponse<GraphQLJson<TData>> =>
        textResponse<GraphQLJson<TData>>(() => JSON.stringify({data})),

    /**
     * Response with body that will not parse as JSON and status code 200.
     */
    unparseableBody: (): MockResponse<any> => textResponse("INVALID JSON"),

    /**
     * Rejects with an AbortError to simulate an aborted request.
     */
    abortedRequest: (): MockResponse<any> =>
        rejectResponse(() => {
            const abortError = new Error("Mock request aborted");
            abortError.name = "AbortError";
            return abortError;
        }),

    /**
     * Rejects with the given error.
     */
    reject: (error: Error): MockResponse<any> => rejectResponse(error),

    /**
     * A non-200 status code with empty text body.
     * Equivalent to calling `ResponseWith.text("", statusCode)`.
     */
    errorStatusCode: (statusCode: number): MockResponse<any> => {
        if (statusCode < 300) {
            throw new Error(`${statusCode} is not a valid error status code`);
        }
        return textResponse("{}", statusCode);
    },

    /**
     * Response body that is valid JSON but not a valid GraphQL response.
     */
    nonGraphQLBody: (): MockResponse<any> =>
        textResponse(() =>
            JSON.stringify({
                valid: "json",
                that: "is not a valid graphql response",
            }),
        ),

    /**
     * Response that is a GraphQL errors response with status code 200.
     */
    graphQLErrors: (
        errorMessages: $ReadOnlyArray<string>,
    ): MockResponse<GraphQLJson<any>> =>
        textResponse<GraphQLJson<any>>(() =>
            JSON.stringify({
                errors: errorMessages.map((e) => ({
                    message: e,
                })),
            }),
        ),
});

/**
 * Turns a MockResponse value to an actual Response that represents the mock.
 */
export const makeMockResponse = (
    response: MockResponse<any>,
): Promise<Response> => {
    switch (response.type) {
        case "text":
            const text =
                typeof response.text === "function"
                    ? response.text()
                    : response.text;

            return Promise.resolve(
                new ResponseImpl(text, {status: response.statusCode}),
            );

        case "reject":
            const error =
                response.error instanceof Error
                    ? response.error
                    : response.error();
            return Promise.reject(error);

        default:
            throw new Error(`Unknown response type: ${response.type}`);
    }
};
