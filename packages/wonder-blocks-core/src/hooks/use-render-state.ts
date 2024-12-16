import {useContext} from "react";

import {
    RenderState,
    RenderStateInternal,
    RenderStateContext,
} from "../components/render-state-context";

export const useRenderState = (): RenderState => {
    const rawRenderState = useContext(RenderStateContext);
    // For consumers, they do not care if the render state is initial or
    // root. That is solely info for the RenderStateRoot component.
    // To everything else, it's just the initial render or standard render.
    if (rawRenderState === RenderStateInternal.Standard) {
        return RenderState.Standard;
    } else {
        return RenderState.Initial;
    }
};
