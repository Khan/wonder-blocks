import {useContext} from "react";

import {
    RenderState,
    RenderStateContext,
} from "../components/render-state-context";

export const useRenderState =
    (): typeof RenderState[keyof typeof RenderState] =>
        useContext(RenderStateContext);
