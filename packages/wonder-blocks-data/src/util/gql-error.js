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
    Network: "Network",
    Parse: "Parse",
    BadResponse: "BadResponse",
    ErrorResult: "ErrorResult",
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
