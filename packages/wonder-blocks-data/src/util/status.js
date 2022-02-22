// @flow
import type {Result, ValidCacheData} from "./types.js";

const loadingStatus = Object.freeze({
    status: "loading",
});

const abortedStatus = Object.freeze({
    status: "aborted",
});

/**
 * Create Result<TData> instances with specific statuses.
 */
export const Status = Object.freeze({
    loading: <TData: ValidCacheData = ValidCacheData>(): Result<TData> =>
        loadingStatus,
    aborted: <TData: ValidCacheData = ValidCacheData>(): Result<TData> =>
        abortedStatus,
    success: <TData: ValidCacheData>(data: TData): Result<TData> => ({
        status: "success",
        data,
    }),
    error: <TData: ValidCacheData = ValidCacheData>(
        error: Error,
    ): Result<TData> => ({
        status: "error",
        error,
    }),
});
