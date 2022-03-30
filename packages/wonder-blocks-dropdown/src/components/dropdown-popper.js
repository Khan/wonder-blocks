// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import {Popper} from "react-popper";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

const modifiers = [
    {
        name: "preventOverflow",
        options: {
            rootBoundary: "viewport",
            // Allows to overlap the popper in case there's no more vertical
            // room in the viewport.
            altAxis: true,
            // Also needed to make sure the Popper will be displayed correctly
            // in different contexts (e.g inside a Modal)
            tether: false,
        },
    },
];

type Props = {|
    /**
     * The children that will be wrapped by PopperJS.
     */
    children: (isReferenceHidden: boolean) => React.Node,

    /**
     * The reference element used to position the popper.
     */
    referenceElement: ?HTMLElement,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * reference component. Defaults to left-aligned.
     */
    alignment?: "left" | "right",

    /**
     * The popper's reference.
     * @see https://popper.js.org/react-popper/v2/render-props/#innerref
     */
    onPopperElement?: (popperElement: ?HTMLElement) => mixed,

    /**
     * Styles that will be applied to the children.
     */
    style?: StyleType,
|};

/**
 * A wrapper for PopperJS that renders the children inside a portal.
 */
export default function DropdownPopper({
    children,
    alignment = "left",
    onPopperElement,
    referenceElement,
}: Props): React.Node {
    // If we are in a modal, we find where we should be portalling the menu by
    // using the helper function from the modal package on the opener element.
    // If we are not in a modal, we use body as the location to portal to.
    const modalHost =
        maybeGetPortalMountedModalHostElement(referenceElement) ||
        document.querySelector("body");

    if (!modalHost) {
        return null;
    }

    return ReactDOM.createPortal(
        <Popper
            innerRef={(node: ?HTMLElement) => {
                if (node && onPopperElement) {
                    onPopperElement(node);
                }
            }}
            referenceElement={referenceElement}
            strategy="fixed"
            placement={alignment === "left" ? "bottom-start" : "bottom-end"}
            modifiers={modifiers}
        >
            {({placement, ref, style, hasPopperEscaped, isReferenceHidden}) => {
                const shouldHidePopper = !!(
                    hasPopperEscaped || isReferenceHidden
                );

                return (
                    <div
                        ref={ref}
                        style={style}
                        data-test-id="dropdown-popper"
                        data-placement={placement}
                    >
                        {children(shouldHidePopper)}
                    </div>
                );
            }}
        </Popper>,
        modalHost,
    );
}
