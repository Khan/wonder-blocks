// @flow
import {useContext} from "react";

import {
    RenderStateContext,
    RenderState,
} from "../components/render-state-context";

export const useRenderState = (): $Values<typeof RenderState> =>
    useContext(RenderStateContext);
