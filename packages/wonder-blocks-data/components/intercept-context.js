// @flow
import * as React from "react";

import type {InterceptContextData} from "../util/types.js";

/**
 * InterceptContext defines a map from handler type to interception methods.
 *
 * INTERNAL USE ONLY
 */
const InterceptContext = React.createContext<InterceptContextData>({});

export default InterceptContext;
