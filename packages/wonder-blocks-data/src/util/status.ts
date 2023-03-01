import type {Result, ValidCacheData} from "./types";

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
    loading: <TData extends ValidCacheData = ValidCacheData>(): Result<TData> =>
        loadingStatus,
    aborted: <TData extends ValidCacheData = ValidCacheData>(): Result<TData> =>
        abortedStatus,
    success: <TData extends ValidCacheData>(data: TData): Result<TData> => ({
        status: "success",
        data,
    }),
    error: <TData extends ValidCacheData = ValidCacheData>(
        error: Error,
    ): Result<TData> => ({
        status: "error",
        error,
    }),
});
