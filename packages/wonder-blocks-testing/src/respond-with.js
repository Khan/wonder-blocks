// @flow
import {SettleSignal} from "./settle-signal.js";
import {ResponseImpl} from "./response-impl.js";
import type {GraphQLJson} from "./types.js";

// We want the parameterization here so that folks can assert a response is
// of a specific type if passing between various functions. For example,
// the graphql mocking framework might want to assert a response is returning
// the expected data structure. We could use `opaque` but that would then
// hide the `toPromise` call we want to provide.
/* eslint-disable no-unused-vars */
/**
 * Describes a mock response to a fetch request.
 */
export type MockResponse<TData> = {|
    /**
     * Create a promise from the mocked response.
     *
     * If a signal was provided when the mock response was created, the promise
     * will only settle to resolution or rejection if the signal is raised.
     */
    +toPromise: () => Promise<Response>,
|};
/* eslint-enable no-unused-vars */

type InternalMockResponse =
    | {|
          +type: "text",
          +text: string | (() => string),
          +statusCode: number,
          +signal: ?SettleSignal,
      |}
    | {|
          +type: "reject",
          +error: Error | (() => Error),
          +signal: ?SettleSignal,
      |};

/**
 * Helper for creating a text-based mock response.
 */
const textResponse = <TData>(
    text: string | (() => string),
    statusCode: number,
    signal: ?SettleSignal,
): MockResponse<TData> => ({
    toPromise: () =>
        makeMockResponse({
            type: "text",
            text,
            statusCode,
            signal,
        }),
});

/**
 * Helper for creating a rejected mock response.
 */
const rejectResponse = (
    error: Error | (() => Error),
    signal: ?SettleSignal,
): MockResponse<empty> => ({
    toPromise: () =>
        makeMockResponse({
            type: "reject",
            error,
            signal,
        }),
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
        signal: ?SettleSignal = null,
    ): MockResponse<TData> => textResponse<TData>(text, statusCode, signal),

    /**
     * Response with JSON body and status code 200.
     */
    json: <TJson: {...}>(
        json: TJson,
        signal: ?SettleSignal = null,
    ): MockResponse<TJson> =>
        textResponse<TJson>(() => JSON.stringify(json), 200, signal),

    /**
     * Response with GraphQL data JSON body and status code 200.
     */
    graphQLData: <TData: {...}>(
        data: TData,
        signal: ?SettleSignal = null,
    ): MockResponse<GraphQLJson<TData>> =>
        textResponse<GraphQLJson<TData>>(
            () => JSON.stringify({data}),
            200,
            signal,
        ),

    /**
     * Response with body that will not parse as JSON and status code 200.
     */
    unparseableBody: (signal: ?SettleSignal = null): MockResponse<any> =>
        textResponse("INVALID JSON", 200, signal),

    /**
     * Rejects with an AbortError to simulate an aborted request.
     */
    abortedRequest: (signal: ?SettleSignal = null): MockResponse<any> =>
        rejectResponse(() => {
            const abortError = new Error("Mock request aborted");
            abortError.name = "AbortError";
            return abortError;
        }, signal),

    /**
     * Rejects with the given error.
     */
    reject: (error: Error, signal: ?SettleSignal = null): MockResponse<any> =>
        rejectResponse(error, signal),

    /**
     * A non-200 status code with empty text body.
     * Equivalent to calling `ResponseWith.text("", statusCode)`.
     */
    errorStatusCode: (
        statusCode: number,
        signal: ?SettleSignal = null,
    ): MockResponse<any> => {
        if (statusCode < 300) {
            throw new Error(`${statusCode} is not a valid error status code`);
        }
        return textResponse("{}", statusCode, signal);
    },

    /**
     * Response body that is valid JSON but not a valid GraphQL response.
     */
    nonGraphQLBody: (signal: ?SettleSignal = null): MockResponse<any> =>
        textResponse(
            () =>
                JSON.stringify({
                    valid: "json",
                    that: "is not a valid graphql response",
                }),
            200,
            signal,
        ),

    /**
     * Response that is a GraphQL errors response with status code 200.
     */
    graphQLErrors: (
        errorMessages: $ReadOnlyArray<string>,
        signal: ?SettleSignal = null,
    ): MockResponse<GraphQLJson<any>> =>
        textResponse<GraphQLJson<any>>(
            () =>
                JSON.stringify({
                    errors: errorMessages.map((e) => ({
                        message: e,
                    })),
                }),
            200,
            signal,
        ),
});

const callOnSettled = (signal: ?SettleSignal, fn: () => void): void => {
    if (signal == null || signal.settled) {
        fn();
        return;
    }

    const onSettled = () => {
        signal.removeEventListener("settled", onSettled);
        fn();
    };
    signal.addEventListener("settled", onSettled);
};

/**
 * Turns a MockResponse value to an actual Response that represents the mock.
 */
const makeMockResponse = (
    response: InternalMockResponse,
): Promise<Response> => {
    const {signal} = response;

    switch (response.type) {
        case "text":
            return new Promise((resolve, reject) => {
                callOnSettled(signal, () => {
                    const text =
                        typeof response.text === "function"
                            ? response.text()
                            : response.text;
                    resolve(
                        new ResponseImpl(text, {status: response.statusCode}),
                    );
                });
            });

        case "reject":
            return new Promise((resolve, reject) => {
                callOnSettled(signal, () =>
                    reject(
                        response.error instanceof Error
                            ? response.error
                            : response.error(),
                    ),
                );
            });

        /* istanbul ignore next */
        default:
            if (process.env.NODE_ENV !== "production") {
                // If we're not in production, give an immediate signal that the
                // dev forgot to support this new type.
                throw new Error(`Unknown response type: ${response.type}`);
            }
            // Production; assume a rejection.
            return makeMockResponse({
                type: "reject",
                error: new Error("Unknown response type"),
                signal,
            });
    }
};
