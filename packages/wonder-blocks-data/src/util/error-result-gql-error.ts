import type {Metadata} from "@khanacademy/wonder-stuff-core";

import {GqlError, GqlErrors} from "./gql-error";
import type {GqlErrorResultPayload} from "./gql-types";

/**
 * A GraphQL response that completed but reported errors.
 *
 * GraphQL servers can return a valid response payload that carries both an
 * `errors` array and a `data` object. Fields that failed are nulled, with the
 * null propagating up to the nearest nullable ancestor, so the `data` that
 * comes back is a partial version of the requested `TData`, or null if the
 * whole result failed. This error exposes that payload with types so callers
 * can make use of the partial data without guessing at the shape.
 *
 * The payload is also attached as `metadata` so that logging sees the same
 * details it always did.
 */
export class ErrorResultGqlError<TData> extends GqlError {
    /**
     * The HTTP status code of the response.
     */
    readonly statusCode: number;

    /**
     * The parsed response payload, including the partial data and errors.
     */
    readonly result: GqlErrorResultPayload<TData>;

    constructor(statusCode: number, result: GqlErrorResultPayload<TData>) {
        super("GraphQL errors", GqlErrors.ErrorResult, {
            metadata: {
                statusCode,
                // The payload is parsed JSON, so it is valid metadata even
                // though TypeScript cannot prove that from the generic type.
                result: result as unknown as Metadata,
            },
        });
        this.statusCode = statusCode;
        this.result = result;
    }
}
