// @flow
/**
 * This is a thin wrapper around React.useContext(RenderStateContext).
 *
 * RenderStateContext is used by WithSSRPlaceholder to hide a component from
 * rendered during SSR.  It's also used by useUniqueId(With|Without)Mock to
 * to return a UniqueIDFactory instance in a SSR-safe way.
 *
 * This hook isn't part of wonder-blocks-core's public interface since we still
 * need to use WithSSRPlaceholder to update the value in the context.
 *
 * TODO(kevinb): Figure out whether we should always render a WithSSRPlaceholder
 * at the root of our render tree just to update the value of the context.  Once
 * we figure this out we can make `useRenderState` public and create some proper
 * documentation for it.
 */
import * as React from "react";

import {RenderStateContext} from "../components/render-state-context.js";
import type {RenderState} from "../components/render-state-context.js";

export const useRenderState = (): RenderState => {
    return React.useContext(RenderStateContext);
};
