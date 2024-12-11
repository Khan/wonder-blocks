import * as React from "react";

export enum RenderState {
    Initial = "initial",
    Standard = "standard",
}

export enum RenderStateInternal {
    Root = "root",
    Initial = "initial",
    Standard = "standard",
}

/**
 * This is the context that tracks who is doing what in our SSR component tree.
 *
 * root:
 *   no one has instigated an initial SSR render so the component that sees
 *   this "root" state is responsible for controlling initial versus standard
 *   rendering semantics
 *
 * initial:
 *   this means the SSR render has started, and all SSR components should act
 *   as though they are on the server
 *
 * standard:
 *   means that we're all now doing non-SSR rendering
 */
const RenderStateContext = React.createContext<RenderStateInternal>(
    RenderStateInternal.Root,
);
RenderStateContext.displayName = "RenderStateContext";

export {RenderStateContext};
