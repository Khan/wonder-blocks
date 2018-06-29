// @flow
/**
 * Defer or change rendering until the component did mount.
 *
 * The purpose of this component is to disable or modify serverside rendering
 * of certain components. Disabling rendering on the server, by itself, would
 * not be sufficient, since the initial render of the component must match
 * what is rendered on the server. Therefore, this component also disables
 * rendering the first time around on the client.
 *
 * Example:
 *
 *   <NoSSR placeholder={() => <div>This renders on the server.</div>}>
 *     {() => <div>This will not be rendered on the server.</div>}
 *   </NoSSR>
 */
import * as React from "react";

/**
 * We use render functions so that we don't do any work unless we need to.
 * This avoids rendering but not mounting potentially complex component trees.
 */
type Props = {
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
};

type State = {
    mounted: boolean,
};

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

    render() {
        const {mounted} = this.state;
        const {children, placeholder} = this.props;

        if (mounted) {
            return children();
        }

        if (placeholder) {
            return placeholder();
        }

        return null;
    }
}
