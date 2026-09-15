import {ErrorResultGqlError} from "./error-result-gql-error";

/**
 * Determine if an error is an `ErrorResultGqlError`.
 *
 * The runtime check cannot verify the shape of the partial data, so `TData`
 * is asserted rather than proven. Callers should only supply a `TData` that
 * matches the operation whose response produced the error.
 *
 * @param error The value to check.
 * @returns True if the error is an `ErrorResultGqlError`; otherwise, false.
 */
export const isErrorResultGqlError = <TData>(
    error: unknown,
): error is ErrorResultGqlError<TData> => error instanceof ErrorResultGqlError;
