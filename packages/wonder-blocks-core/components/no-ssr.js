// @flow
import * as React from "react";

/**
 * We use render functions so that we don't do any work unless we need to.
 * This avoids rendering but not mounting potentially complex component trees.
 */
type Props = {|
    /**
     * The content that is client-only.
     */
    children: () => ?React.Node,

    /**
     * Optionally, instead of rendering nothing the first time around, this
     * component can render a placeholder. To enable this behavior,
     * pass a "placeholder" prop.
     *
     * NOTE: Make sure the placeholder will render the same for both client and
     * server, or it defeats the purpose of using the NoSSR component.
     */
    placeholder?: () => ?React.Node,
|};

type State = {|
    mounted: boolean,
|};

const HasHadFirstRenderContext = React.createContext(false);

/**
 * Defer or change rendering until the component did mount.
 *
 * The purpose of this component is to disable or modify serverside rendering
 * of certain components. Disabling rendering on the server, by itself, would
 * not be sufficient, since the initial render of the component must match
 * what is rendered on the server. Therefore, this component also disables
 * rendering the first time around on the client.
 *
 * If `NoSSR` components are nested within one another, the root `NoSSR`
 * component will handle the initial render, but nested `NoSSR` components
 * will delegate to the root one, meaning that we don't cascade delayed
 * rendering down the component tree. This will also be the case across
 * portal boundaries.
 *
 * Example:
 *
 * ```js
 * <NoSSR placeholder={() => <div>This renders on the server.</div>}>
 *   {() => <div>This will not be rendered on the server.</div>}
 * </NoSSR>
 * ```
 */
export default class NoSSR extends React.Component<Props, State> {
    state = {
        mounted: false,
    };

    componentDidMount() {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            mounted: true,
        });
    }

    _maybeRenderPlaceholderOrChildren(alreadyPerformedFirstRender: boolean) {
        const {mounted} = this.state;
        const {children, placeholder} = this.props;

        // We just get on with rendering if we're passed truthiness as we
        // are reliably told a NoSSR component further up the chain already
        // handled our SSR case.
        if (alreadyPerformedFirstRender) {
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
