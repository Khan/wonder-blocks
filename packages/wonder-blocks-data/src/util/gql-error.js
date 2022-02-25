// @flow
import {KindError, Errors} from "@khanacademy/wonder-stuff-core";
import type {Metadata} from "@khanacademy/wonder-stuff-core";

type GqlErrorOptions = {|
    metadata?: ?Metadata,
    cause?: ?Error,
|};

/**
 * Error kinds for GqlError.
 */
export const GqlErrors = Object.freeze({
    ...Errors,

    /**
     * A network error occurred.
     */
    Network: "Network",

    /**
     * Response could not be parsed.
     */
    Parse: "Parse",

    /**
     * Response does not have the correct structure for a GraphQL response.
     */
    BadResponse: "BadResponse",

    /**
     * A valid GraphQL result with errors field in the payload.
     */
    ErrorResult: "ErrorResult",

    /**
     * An error that occurred during SSR and was hydrated from cache
     */
    Hydrated: "Hydrated",
});

/**
 * An error from the GQL API.
 */
export class GqlError extends KindError {
    constructor(
        message: string,
        kind: $Values<typeof GqlErrors>,
        {metadata, cause}: GqlErrorOptions = ({}: $Shape<GqlErrorOptions>),
    ) {
        super(message, kind, {
            metadata,
            cause,
            prefix: "Gql",
        });
    }
}
