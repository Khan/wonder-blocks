// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {View} from "wonder-blocks-core";

type Props = {
    children: React.Node,
};

/**
 * A private component used by ModalLauncher, that behaves similarly to a React
 * "portal". It renders its children in a new node in `document.body`, rather
 * than in its natural position in the DOM tree.
 *
 * NOTE(mdr): Once we upgrade to React 16, maybe we can use built-in portals!
 */
export default class ModalLauncherPortal extends React.Component<Props> {
    _destination: ?Node;

    /**
     * When we mount, we also mount our children into a new child of
     * `document.body`.
     */
    componentDidMount() {
        const root = this._getRoot();

        // Create a new destination node, and add it to the root.
        // The data attribute is used in unit tests, to identify which
        // ancestors of `children` were created by `ModalLauncherPortal`.
        const destination = document.createElement("div");
        destination.setAttribute("data-modal-launcher-portal", "");
        root.appendChild(destination);

        // We'll also wrap the children in a wrapper node, so that we can
        // accept `React.Node` instead of `React.Element`.
        //
        // NOTE(mdr): Once we upgrade to React 16, we'll no longer need this
        //     wrapper node!
        const wrapper = (
            <View data-modal-launcher-portal>{this.props.children}</View>
        );

        // Render the modal into the destination node.
        ReactDOM.render(wrapper, destination);

        // Save the destination node, so we can remove it on unmount.
        this._destination = destination;
    }

    /**
     * When we unmount, we also unmount our children, and the new child of
     * `document.body` we created.
     */
    componentWillUnmount() {
        const destination = this._destination;
        if (!destination) {
            return;
        }

        ReactDOM.unmountComponentAtNode(destination);

        if (!destination.parentNode) {
            return;
        }
        destination.parentNode.removeChild(destination);
    }

    _getRoot() {
        const root = document.body;
        if (!root) {
            throw new Error("can't mount modal without a document.body");
        }

        return root;
    }

    render() {
        return null;
    }
}
