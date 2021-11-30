// @flow
import * as React from "react";

export enum RenderState {
    // TODO(somewhatabstract, FEI-4172): Update eslint-plugin-flowtype when
    // they've fixed https://github.com/gajus/eslint-plugin-flowtype/issues/502
    /* eslint-disable no-undef */
    Root = "root",
    Initial = "initial",
    Standard = "standard",
    /* eslint-enable no-undef */
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
export const RenderStateContext: React.Context<RenderState> =
    React.createContext(RenderState.Root);
