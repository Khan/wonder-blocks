// @flow
import * as React from "react";

// TODO(FEI-5000): Convert to TS enum after all codebases have been migrated
export const RenderState = {
    Root: ("root": "root"),
    Initial: ("initial": "initial"),
    Standard: ("standard": "standard"),
};

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
export const RenderStateContext: React.Context<$Values<typeof RenderState>> =
    React.createContext(RenderState.Root);
