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
    // @ts-expect-error [FEI-5019] - TS2322 - Type 'Readonly<{ status: string; }>' is not assignable to type 'Result<TData>'.
    loading: <TData extends ValidCacheData = ValidCacheData>(): Result<TData> =>
        loadingStatus,
    // @ts-expect-error [FEI-5019] - TS2322 - Type 'Readonly<{ status: string; }>' is not assignable to type 'Result<TData>'.
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
