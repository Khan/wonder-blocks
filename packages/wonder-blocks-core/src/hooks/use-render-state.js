// @flow
import {useContext} from "react";

import {
    RenderState,
    RenderStateContext,
} from "../components/render-state-context";

export const useRenderState = (): $Values<typeof RenderState> =>
    useContext(RenderStateContext);
