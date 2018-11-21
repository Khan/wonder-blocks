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
    placeholder: ?(() => ?React.Node),
|};

type State = {|
    mounted: boolean,
|};

const HasHadFirstRenderContext = React.createContext<boolean>(false);

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
        if (!this._alreadyPerformedFirstRender) {
            // We only want to force a new render if we were responsible for
            // the first render, so we guard that state change here.

            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                mounted: true,
            });
        }
    }

    _alreadyPerformedFirstRender = false;

    _maybeRenderPlaceholderOrChildren(alreadyPerformedFirstRender: boolean) {
        const {mounted} = this.state;
        const {children, placeholder} = this.props;

        // We just get on with rendering if we're passed truthiness as
        // we are reliably told a WithSSRPlaceholder component further
        // up the chain already handled our SSR case.
        if (alreadyPerformedFirstRender) {
            // We need to stop the forced second render and to do that, we have
            // to influence our componentDidMount. Fortunately, that occurs
            // after this, so let's save a member value to then use there.
            this._alreadyPerformedFirstRender = alreadyPerformedFirstRender;
            return children();
        }

        // We are mounted and we no higher SSR component handled the first
        // render so let's tell our children that we did.
        if (mounted) {
            return (
                <HasHadFirstRenderContext.Provider value={true}>
                    {children()}
                </HasHadFirstRenderContext.Provider>
            );
        }

        // We don't have a parent that handled SSR, and this must be our
        // first render, and we have a placeholder, so render the placeholder.
        if (placeholder) {
            return placeholder();
        }

        // We don't have a parent that handled SSR, and this must be our
        // first render and we don't have a placeholder, so return nothing.
        return null;
    }

    render() {
        return (
            <HasHadFirstRenderContext.Consumer>
                {(value) => this._maybeRenderPlaceholderOrChildren(value)}
            </HasHadFirstRenderContext.Consumer>
        );
    }
}
