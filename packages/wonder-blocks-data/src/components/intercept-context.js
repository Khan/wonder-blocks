// @flow
import * as React from "react";
import type {ValidCacheData} from "../util/types.js";

type InterceptContextData = {
    [id: string]: <TData: ValidCacheData>() => ?Promise<?TData>,
    ...
};

/**
 * InterceptContext defines a map from request ID to interception methods.
 *
 * INTERNAL USE ONLY
 */
const InterceptContext: React.Context<InterceptContextData> =
    React.createContext<InterceptContextData>({});

export default InterceptContext;
