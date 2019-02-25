// @flow
import * as React from "react";

import {MEDIA_DEFAULT_SPEC} from "../util/specs.js";
import type {MediaSize, MediaSpec} from "../util/types.js";

type Context = {|
    overrideSize?: MediaSize,
    ssrSize: MediaSize,
    mediaSpec: MediaSpec,
|};

const defaultContext: Context = {
    ssrSize: "large",
    mediaSpec: MEDIA_DEFAULT_SPEC,
};

export default React.createContext<Context>(defaultContext);
