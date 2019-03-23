import React, { ReactNode } from "react";
/**
 * We use render functions so that we don't do any work unless we need to.
 * This avoids rendering but not mounting potentially complex component trees.
 */
declare type Props = {
    /**
     * The content that is client-only.  This is what is rendered when
     * not server-side rendering, or (when server-side rendering) after
     * the initial rehydration has finished.
     */
    children: () => ReactNode | null;
    /**
     * What to render during server-side rendering, or null not to
     * render anything.
     *
     * NOTE: Make sure the placeholder will render the same for both
     * client and server -- that is, it does the same thing for both
     * the server-side renderer and the rehydration -- or it defeats
     * the purpose of using the WithSSRPlaceholder component.
     */
    placeholder: (() => ReactNode | null) | null;
};
declare type State = {
    mounted: boolean;
};
declare type RenderState = "root" | "initial" | "standard";
/**
 * Defer or change rendering until the component did mount.
 *
 * The purpose of this component is to disable or modify serverside rendering
 * of certain components. Disabling rendering on the server, by itself, would
 * not be sufficient, since the initial render of the component must match
 * what is rendered on the server. Therefore, this component also disables
 * rendering the first time around on the client.
 *
 * If `WithSSRPlaceholder` components are nested within one another,
 * the root `WithSSRPlaceholder` component will handle the initial
 * render, but nested `WithSSRPlaceholder` components will delegate to
 * the root one, meaning that we don't cascade delayed rendering down
 * the component tree. This will also be the case across portal
 * boundaries.
 *
 * Example:
 *
 * ```js
 * <WithSSRPlaceholder placeholder={() => <div>Renders on the server!</div>}>
 *   {() => <div>Only renders on the client (after rehydration).</div>}
 * </WithSSRPlaceholder>
 * ```
 */
export default class WithSSRPlaceholder extends React.Component<Props, State> {
    state: {
        mounted: boolean;
    };
    componentDidMount(): void;
    _isTheRootComponent: boolean;
    _renderAsRootComponent(): JSX.Element;
    _maybeRender(renderState: RenderState): any;
    render(): JSX.Element;
}
export {};
