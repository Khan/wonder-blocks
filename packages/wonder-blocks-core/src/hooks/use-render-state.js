// @flow
import * as React from "react";

import {RenderStateContext} from "../components/render-state-context.js";
import type {RenderState} from "../components/render-state-context.js";

export const useRenderState = (): RenderState => {
    return React.useContext(RenderStateContext);
};
