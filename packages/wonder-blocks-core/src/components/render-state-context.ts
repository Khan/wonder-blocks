import * as React from "react";

/**
 * The possible states of rendering.
 *
 * This is used to determine if we are rendering our initial, hydrateable state
 * or not. Initial renders must be consistent between the server and client so
 * that hydration will succeed.
 *
 * We use a render state like this instead of a simple check for being mounted
 * or not, or some other way of each component knowing if it is rendering itself
 * for the first time so that we can avoid cascading initial renders where each
 * component has to render itself and its children multiple times to reach a
 * stable state. Instead, we track the initial render from the root of the tree
 * and switch everything accordingly so that there are fewer additional renders.
 */
export enum RenderState {
    /**
     * The initial render, either on the server or client.
     */
    Initial = "initial",

    /**
     * Any render after the initial render. Only occurs on the client.
     */
    Standard = "standard",
}

/**
 * The internal states of rendering.
 *
 * This is different to the `RenderState` enum as this is internal to the
 * Core package and solely for components that are going to provide new values
 * to the render state context.
 */
export enum RenderStateInternal {
    /**
     * This is the root state. It indicates that nothing has actually changed
     * then context value that tracks this. This is used solely by components
     * that control the rendering state to know that they are in charge of
     * that process.
     */
    Root = "root",

    /**
     * This indicates something has taken charge of the rendering state and
     * components should render their initial render state that is hydrateable.
     */
    Initial = "initial",

    /**
     * This indicates that things are now rendering after the initial render
     * and components can render without worrying about hydration.
     */
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
