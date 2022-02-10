// @flow
import * as React from "react";
import type {ValidCacheData} from "../util/types.js";

type InterceptContextData = $ReadOnlyArray<
    (requestId: string) => ?Promise<?ValidCacheData>,
>;

/**
 * InterceptContext defines a map from request ID to interception methods.
 *
 * INTERNAL USE ONLY
 */
const InterceptContext: React.Context<InterceptContextData> =
    React.createContext<InterceptContextData>([]);

export default InterceptContext;
