// @flow
import type {Result, ValidCacheData} from "./types.js";

const loadingStatus = Object.freeze({
    status: "loading",
});

const abortedStatus = Object.freeze({
    status: "aborted",
});

export const Status = Object.freeze({
    Loading: (): Result<any> => loadingStatus,
    Aborted: (): Result<any> => abortedStatus,
    Success: <TData: ValidCacheData>(data: TData): Result<TData> => ({
        status: "success",
        data,
    }),
    Error: (error: Error): Result<any> => ({
        status: "error",
        error,
    }),
});
