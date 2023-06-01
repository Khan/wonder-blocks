import * as React from "react";

// TODO(FEI-5000): Convert to TS enum after all codebases have been migrated
export const RenderState = {
    Root: "root" as const,
    Initial: "initial" as const,
    Standard: "standard" as const,
} as const;

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
const RenderStateContext = React.createContext<
    typeof RenderState[keyof typeof RenderState]
>(RenderState.Root);
RenderStateContext.displayName = "RenderStateContext";

export {RenderStateContext};
