import * as React from "react";
import type {ValidCacheData} from "../util/types";

type InterceptContextData = ReadonlyArray<
    (
        requestId: string,
    ) => Promise<ValidCacheData | null | undefined> | null | undefined
>;

/**
 * InterceptContext defines a map from request ID to interception methods.
 *
 * INTERNAL USE ONLY
 */
const InterceptContext: React.Context<InterceptContextData> =
    React.createContext<InterceptContextData>([]);
InterceptContext.displayName = "InterceptContext";

export default InterceptContext;
