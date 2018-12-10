// @flow
import * as React from "react";

/**
 * We use render functions so that we don't do any work unless we need to.
 * This avoids rendering but not mounting potentially complex component trees.
 */
type Props = {|
    /**
     * The content that is client-only.  This is what is rendered when
     * not server-side rendering, or (when server-side rendering) after
     * the initial rehydration has finished.
     */
    children: () => ?React.Node,

    /**
     * What to render during server-side rendering, or null not to
     * render anything.
     *
     * NOTE: Make sure the placeholder will render the same for both
     * client and server -- that is, it does the same thing for both
     * the server-side renderer and the rehydration -- or it defeats
     * the purpose of using the WithSSRPlaceholder component.
     */
    placeholder: ?() => ?React.Node,
|};

type State = {|
    mounted: boolean,
|};

type RenderState = "root" | "initial" | "standard";
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
const RenderStateContext = React.createContext<RenderState>("root");

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
    state = {
        mounted: false,
    };

    componentDidMount() {
        if (this._isTheRootComponent) {
            // We only want to force a new render if we were responsible for
            // the first render, so we guard that state change here.

            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                mounted: true,
            });
        }
    }

    _isTheRootComponent = false;

    _renderAsRootComponent() {
        const {mounted} = this.state;
        const {children, placeholder} = this.props;

        // We are the first component in the tree.
        // We are in control of instigating a second render for our
        // component tree.
        this._isTheRootComponent = true;

        if (mounted) {
            // This is our second non-SSR render, so let's tell everyone to
            // do their thing.
            return (
                <RenderStateContext.Provider value="standard">
                    {children()}
                </RenderStateContext.Provider>
            );
        }

        // OK, this is the very first render.
        // If we have a placeholder, we render it, and ensure that any
        // nested SSR components know we're still on that first render
        // but they're not in charge of instigating the second render.
        if (placeholder) {
            return (
                <RenderStateContext.Provider value="initial">
                    {placeholder()}
                </RenderStateContext.Provider>
            );
        }

        // Otherwise, we return nothing.
        return null;
    }

    _maybeRender(renderState: RenderState) {
        const {children, placeholder} = this.props;

        switch (renderState) {
            // There are edge cases where for some reason, we get an unknown
            // context value here. So far it seems to be when we're nested in a
            // v1 WithSSRPlaceholder equivalent component, or in some older
            // React v16 situations where we're nested in the provider of a
            // different context.
            //
            // We ignore this from coverage. It's a maintenance case to help
            // us catch code changes that affect the control flow unexpectedly,
            // but it's not something we need to write a test case for.
            //
            /* istanbul ignore next */
            default:
                // Let's log this case so we can debug it easily.
                // Then fall through to the root case.
                /* eslint-disable-next-line no-console */
                console.log(
                    `We got a render state we don't understand: "${renderState}"`,
                );
                // We "fallthrough" to the root case. This is more obvious
                // and maintainable code than just ignoring the no-fallthrough
                // lint rule.
                return this._maybeRender("root");

            case "root":
                return this._renderAsRootComponent();

            case "initial":
                // We're not the root component, so we just have to either
                // render our placeholder or nothing.
                // The second render is going to be triggered for us.
                if (placeholder) {
                    return placeholder();
                }
                // Otherwise, we render nothing.
                return null;

            case "standard":
                // We have covered the SSR render, we're now rendering with
                // standard rendering semantics.
                return children();
        }
    }

    render() {
        return (
            <RenderStateContext.Consumer>
                {(value) => this._maybeRender(value)}
            </RenderStateContext.Consumer>
        );
    }
}
