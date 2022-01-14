// @flow
import {KindError} from "@khanacademy/wonder-stuff-core";
import type {Metadata} from "@khanacademy/wonder-stuff-core";
import typeof {GqlErrors} from "./gql-errors.js";

type GqlErrorOptions = {|
    metadata?: ?Metadata,
    cause?: ?Error,
|};

/**
 * An error from the GQL API.
 */
export class GqlError extends KindError {
    constructor(
        message: string,
        kind: $Values<GqlErrors>,
        {metadata, cause}: GqlErrorOptions = ({}: $Shape<GqlErrorOptions>),
    ) {
        super(message, kind, {
            metadata,
            cause,
            prefix: "Gql",
        });
    }
}
