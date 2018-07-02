// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import {TooltipPortalAttributeName} from "../util/constants.js";
import TooltipPopper from "./tooltip-popper.js";

type Props = {|
    // The child element to be rendered within the main React tree.
    // This is the component to which the tooltip is anchored.
    anchor: React.Element<*>,

    // The tooltip that will be rendered in the portal.
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
    _rendered: boolean;

    componentDidMount() {
        // There's a slight chance we have something to mount on our very first
        // render, so let's try it.
        this._maybeDoMount();
    }

    componentDidUpdate() {
        // Our content may have changed, so let's re-render it.
        // If the portal isn't mounted yet, this will take care of that.
        this._refreshPortalContent();
    }

    /**
     * When we unmount, we also unmount our children, and the new child of
     * `document.body` we created.
     */
    componentWillUnmount() {
        this._doUnmount();
    }

    _maybeDoMount() {
        // We're not going to mount anything if we no children or we haven't
        // rendered yet. That's because the first step in mounting the portal
        // is to get the anchor node, which is what we render in the `render()`
        // method.
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
        // The data attribute is to identify which the mounted portal in
        // unit tests.
        const destination = document.createElement("div");
        destination.setAttribute(TooltipPortalAttributeName, "");
        root.appendChild(destination);

        // Save the destination node, so we can re-use it.
        this._destination = destination;

        // Render the tooltip into the destination node.
        this._refreshPortalContent();
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

    _refreshPortalContent() {
        if (!this._destination) {
            this._maybeDoMount();
            return;
        }

        const {children} = this.props;
        if (!children) {
            // We don't have any portal content, so let's dismantle the portal.
            this._doUnmount();
            return;
        } else {
            // If we get here, the content of the bubble changed, so let's
            // remove what we had and render something new. This way, we reuse
            // the portal we have mounted, rather than take the time to
            // dismantle it and mount a new one.
            //
            // Not certain this is necessary, or if the later render call
            // handles this, but it seems appropriate and is certainly clearer
            // to do it here.
            ReactDOM.unmountComponentAtNode(this._destination);
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
        const {anchor} = this.props;

        this._rendered = true;
        return anchor;
    }
}
