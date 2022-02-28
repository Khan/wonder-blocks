// @flow
import {KindError} from "@khanacademy/wonder-stuff-core";

import type {ErrorOptions} from "./types.js";

/**
 * Error kinds for GqlError.
 */
export const GqlErrors = Object.freeze({
    /**
     * An internal framework error.
     */
    Internal: "Internal",

    /**
     * Response does not have the correct structure for a GraphQL response.
     */
    BadResponse: "BadResponse",

    /**
     * A valid GraphQL result with errors field in the payload.
     */
    ErrorResult: "ErrorResult",
});

/**
 * An error from the GQL API.
 *
 * Errors of this type will have names of the format:
 *     `${kind}GqlError`
 */
export class GqlError extends KindError {
    constructor(
        message: string,
        kind: $Values<typeof GqlErrors>,
        {metadata, cause}: ErrorOptions = ({}: $Shape<ErrorOptions>),
    ) {
        super(message, kind, {
            metadata,
            cause,
            name: "Gql",
        });
    }
}
