// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import {TooltipPortalAttributeName} from "../util/constants.js";
import TooltipPopper from "./tooltip-popper.js";

type Props = {|
    /**
     * The child element to be rendered within the main React tree.
     * This is the component to which the tooltip is anchored.
     */
    anchor: React.Element<*>,

    /** The tooltip that will be rendered in the portal. */
    children: ?React.Element<typeof TooltipPopper>,
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

    componentDidMount() {
        // There's a slight chance we have something to mount on our very first
        // render, so let's try it.
        this._maybeCreatePortal();
    }

    componentDidUpdate() {
        // Our content may have changed, so let's update things.
        this._maybeCreatePortal();
    }

    /**
     * When we unmount, we also unmount our children, and the new child of
     * `document.body` we created.
     */
    componentWillUnmount() {
        this._destroyPortal();
    }

    _getPortalParent() {
        const anchorNode = ReactDOM.findDOMNode(this);
        if (!anchorNode) {
            return null;
        }

        const modalHost =
            anchorNode && maybeGetPortalMountedModalHostElement(anchorNode);

        const root = modalHost || document.body;
        if (!root) {
            throw new Error(
                "Cannot mount tooltip portal: no document.body nor modal host",
            );
        }
        return root;
    }

    _maybeCreatePortal() {
        // We're not going to create anything if we have no children.
        // As that means we have nothing to render in the portal anyway.
        const {children} = this.props;
        if (!children) {
            this._destroyPortal();
            return;
        }

        const portalParent = this._getPortalParent();
        if (this._destination) {
            // If we already have a portal, we need to see if it is the same
            // one that the current anchor requires or if its different.
            if (portalParent !== this._destination.parentElement) {
                // If we get here, the portal location changed or we no longer
                // a portal (because we have no anchor).
                this._destroyPortal();
            } else {
                // If we get here, the content of the bubble changed, so let's
                // remove what we had and render something new. This way, we
                // reuse the portal we have mounted, rather than take the time
                // to dismantle it and mount a new one.
                //
                // Not certain this is necessary, or if the later render call
                // handles this, but it seems appropriate and is certainly
                // clearer to do it here.
                ReactDOM.unmountComponentAtNode(this._destination);

                // Render the tooltip into the destination node.
                this._refreshPortalContent();
                return;
            }
        }

        if (!portalParent) {
            // We have nowhere to create a portal, so we're done.
            return;
        }

        // Create a new destination node, and add it to the root.
        // The data attribute is to identify the portal when needed.
        const destination = document.createElement("div");
        destination.setAttribute(TooltipPortalAttributeName, "");
        portalParent.appendChild(destination);

        // Save the destination node, so we can re-use it.
        this._destination = destination;

        // Render the tooltip into the destination node.
        this._refreshPortalContent();
    }

    _destroyPortal() {
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

    _refreshPortalContent() {
        const {children} = this.props;
        if (!this._destination || !children) {
            return;
        }

        // Now we can render the portal content.
        // We have to render the subtree like this so that everything works as
        // expected.
        // See https://github.com/tajo/react-portal/blob/master/src/LegacyPortal.js
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            children,
            this._destination,
        );
    }

    render() {
        return this.props.anchor;
    }
}
