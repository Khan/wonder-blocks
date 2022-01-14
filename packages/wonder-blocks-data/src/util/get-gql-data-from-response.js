// @flow
import {GqlError} from "./gql-error.js";
import {GqlErrors} from "./gql-errors.js";

/**
 * Validate a GQL operation response and extract the data.
 */
export const getGqlDataFromResponse = async <TData>(
    response: Response,
): Promise<TData> => {
    // Get the response as text, that way we can use the text in error
    // messaging, should our parsing fail.
    const bodyText = await response.text();
    let result;
    try {
        result = JSON.parse(bodyText);
    } catch (e) {
        throw new GqlError("Failed to parse response", GqlErrors.Parse, {
            metadata: {
                statusCode: response.status,
                bodyText,
            },
            cause: e,
        });
    }

    // Check for a bad status code.
    if (response.status >= 300) {
        throw new GqlError("Response unsuccessful", GqlErrors.Network, {
            metadata: {
                statusCode: response.status,
                result,
            },
        });
    }

    // Check that we have a valid result payload.
    if (
        // Flow shouldn't be warning about this.
        // $FlowIgnore[method-unbinding]
        !Object.prototype.hasOwnProperty.call(result, "data") &&
        // Flow shouldn't be warning about this.
        // $FlowIgnore[method-unbinding]
        !Object.prototype.hasOwnProperty.call(result, "errors")
    ) {
        throw new GqlError("Server response missing", GqlErrors.BadResponse, {
            metadata: {
                statusCode: response.status,
                result,
            },
        });
    }

    // If the response payload has errors, throw an error.
    if (result?.errors != null) {
        throw new GqlError("GraphQL errors", GqlErrors.ErrorResult, {
            metadata: {
                statusCode: response.status,
                graphQLErrors: result.errors,
                result,
            },
        });
    }

    // We got here, so return the data.
    return result.data;
};
