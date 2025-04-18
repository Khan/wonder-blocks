import {KindError} from "@khanacademy/wonder-stuff-core";
import type {ErrorOptions} from "./types";

/**
 * Error kinds for DataError.
 */
export const DataErrors = Object.freeze({
    /**
     * The kind of error is not known.
     */
    Unknown: "Unknown",

    /**
     * The error is internal to the executing code.
     */
    Internal: "Internal",

    /**
     * There was a problem with the provided input.
     */
    InvalidInput: "InvalidInput",

    /**
     * A network error occurred.
     */
    Network: "Network",

    /**
     * There was a problem due to the state of the system not matching the
     * requested operation or input.
     */
    NotAllowed: "NotAllowed",

    /**
     * Response could not be parsed.
     */
    Parse: "Parse",

    /**
     * An error that occurred during SSR and was hydrated from cache
     */
    Hydrated: "Hydrated",
});

/**
 * An error from the Wonder Blocks Data API.
 *
 * Errors of this type will have names of the format:
 *     `${kind}DataError`
 */
export class DataError extends KindError {
    constructor(
        message: string,
        kind: (typeof DataErrors)[keyof typeof DataErrors],
        {metadata, cause}: ErrorOptions = {} as Partial<ErrorOptions>,
    ) {
        super(message, kind, {
            metadata,
            cause,
            name: "Data",
        });
    }
}
