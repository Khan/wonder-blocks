// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import {TooltipPortalAttributeName} from "../util/constants.js";

type Props = {|
    // TODO(somewhatabstract): Tell the portal where to mount directly
    // rather than have it figure it out.
    // The element that the tooltip is anchored against.
    // This is used to determine where to mount the tooltip portal so that
    // it sits within the same stacking context as the anchor element.
    anchorElement: null | Element | Text,

    // The tooltip that will be rendered in the portal.
    // TODO(somewhatabstract): Update to stronger types (i.e. Element(typeof TooltipCore))
    children: React.Element<any>,
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
export default class TooltipPortal extends React.Component<Props> {
    _destination: ?Node;

    /**
     * When we mount, we also mount our children into a new child of
     * `document.body`.
     */
    componentDidMount() {
        this._doMount();
    }

    /**
     * If our anchorElement updated, our root may have too, so let's check
     * that!
     */
    componentDidUpdate(prevProps: Props) {
        if (this.props.anchorElement !== prevProps.anchorElement) {
            this._doMount();
        }
    }

    /**
     * When we unmount, we also unmount our children, and the new child of
     * `document.body` we created.
     */
    componentWillUnmount() {
        this._doUnmount();
    }

    _doMount() {
        const root = this._getRoot();
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
            this.props.children,
            destination);

        // Save the destination node, so we can remove it on unmount.
        this._destination = destination;
    }

    _doUnmount() {
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
        if (!this.props.anchorElement) {
            return null;
        }

        // See if we're in a modal portal.
        const modalPortal = maybeGetPortalMountedModalHostElement(
            this.props.anchorElement,
        );

        // If not in a modal or we have no anchor element yet,
        // we'll mount in document.body.
        // Note that we have to mount somewhere, or we won't get called
        // with componentDidUpdate when our anchor changes.
        // And if that doesn't exist, we have a problem.
        const root = modalPortal || document.body;
        if (!root) {
            throw new Error("can't mount tooltip without a document.body");
        }

        return root;
    }

    render() {
        return null;
    }
}
