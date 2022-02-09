// @flow
import * as React from "react";

import type {InterceptContextData} from "../util/types.js";

/**
 * InterceptContext defines a map from request ID to interception methods.
 *
 * INTERNAL USE ONLY
 */
const InterceptContext: React.Context<InterceptContextData> =
    React.createContext<InterceptContextData>({});

export default InterceptContext;
