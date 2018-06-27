// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import {TooltipPortalAttributeName} from "../util/constants.js";
import TooltipBubble from "./tooltip-bubble.js";

type Props = {|
    // The child element to be rendered within the main React tree.
    // This is the component to which the tooltip is anchored.
    anchor: React.Element<*>,

    // The tooltip that will be rendered in the portal.
    children: ?React.Element<typeof TooltipBubble>,
|};

/**
 * A private component used by Tooltip, that behaves similarly to a React
 * "portal". It renders its children in a new node in `document.body` or
 * the parent modal launcher portal, rather than in its natural position
 * in the DOM tree.
 *
 * See also: ../../wonder-blocks-modal/components/modal-launcher-portal.js
 *
 * TODO(somewhatabstract): Update with a react portal once upgraded to React 16?
 */
export default class TooltipPortalMounter extends React.Component<Props> {
    _destination: ?Node;
    _timeoutId: ?number;
    _rendered: boolean;

    /**
     * When we unmount, we also unmount our children, and the new child of
     * `document.body` we created.
     */
    componentWillUnmount() {
        this._clearMountTimeout();
        this._doUnmount();
    }

    _clearMountTimeout() {
        const timeoutId = this._timeoutId;
        this._timeoutId = undefined;
        if (timeoutId != null) {
            clearTimeout(timeoutId);
        }
    }

    _doMount() {
        const {children} = this.props;
        if (!this._rendered || !children) {
            return;
        }

        const anchorNode = ReactDOM.findDOMNode(this);
        const modalHost =
            anchorNode && maybeGetPortalMountedModalHostElement(anchorNode);

        const root = modalHost || document.body;
        if (root) {
            // If we are already mounted, let's see if we need to remount.
            if (this._destination) {
                if (this._destination.parentElement === root) {
                    // Already mounted in this root.
                    // Nothing to do.
                    return;
                } else {
                    // We moved roots, lets unmount and remount.
                    this._doUnmount();
                }
            }
        } else {
            // We aren't quite ready to mount.
            return;
        }

        // Create a new destination node, and add it to the root.
        // The data attribute is used in unit tests, to identify which
        // ancestors of `children` were created by `TooltipPortal`.
        const destination = document.createElement("div");
        destination.setAttribute(TooltipPortalAttributeName, "");
        root.appendChild(destination);

        // Render the tooltip into the destination node.
        // We have to render the subtree like this so that everything works as expected.
        // See https://github.com/tajo/react-portal/blob/master/src/LegacyPortal.js
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            children,
            destination,
        );

        // Save the destination node, so we can remove it on unmount.
        this._destination = destination;
    }

    _doUnmount() {
        const destination = this._destination;
        if (!destination) {
            return;
        }

        this._destination = null;
        ReactDOM.unmountComponentAtNode(destination);

        if (!destination.parentNode) {
            return;
        }
        destination.parentNode.removeChild(destination);
    }

    _timeoutDoMount() {
        this._clearMountTimeout();
        this._timeoutId = setTimeout(() => this._doMount(), 0);
    }

    _timeoutDoUnmount() {
        this._clearMountTimeout();
        this._timeoutId = setTimeout(() => this._doUnmount(), 0);
    }

    render() {
        const {children, anchor} = this.props;
        this._rendered = true;
        if (children) {
            this._timeoutDoMount();
        } else {
            this._timeoutDoUnmount();
        }
        return anchor;
    }
}
