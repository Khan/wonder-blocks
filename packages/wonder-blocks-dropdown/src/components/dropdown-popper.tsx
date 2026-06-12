import * as React from "react";
import * as ReactDOM from "react-dom";
import {Popper} from "react-popper";

import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {Placement} from "@popperjs/core";
import {maxHeightModifier} from "../util/popper-max-height-modifier";

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
    maxHeightModifier,
];

/**
 * Re-runs Popper's positioning when the visual viewport changes (e.g. iOS/iPad
 * pinch-zoom). On iOS, `position: fixed` is anchored to the layout viewport and
 * does not track the visual viewport during pinch-zoom, and Popper does not
 * listen to `visualViewport` events on its own. Without this, the menu position
 * goes stale and drifts away from its opener while zoomed.
 *
 * This is a separate component because hooks can't be called inside react-popper's
 * render-prop body.
 */
function VisualViewportUpdater({
    update,
}: {
    update: (() => Promise<unknown>) | null;
}): null {
    React.useEffect(() => {
        const vv =
            typeof window !== "undefined" ? window.visualViewport : undefined;
        // Guard for SSR / browsers without the visualViewport API.
        if (!vv || !update) {
            return;
        }

        const handleViewportChange = () => {
            // update() returns a promise; we don't need the result, but we
            // swallow rejections (e.g. the popper unmounting mid-flight).
            void update()?.catch(() => {});
        };

        vv.addEventListener("resize", handleViewportChange);
        vv.addEventListener("scroll", handleViewportChange);

        return () => {
            vv.removeEventListener("resize", handleViewportChange);
            vv.removeEventListener("scroll", handleViewportChange);
        };
    }, [update]);

    return null;
}

type Props = {
    /**
     * The children that will be wrapped by PopperJS.
     */
    children: (isReferenceHidden: boolean) => React.ReactNode;
    /**
     * The reference element used to position the popper.
     */
    referenceElement?: HTMLElement;
    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * reference component. Defaults to left-aligned.
     */
    alignment?: "left" | "right" | Placement;
    /**
     * The popper's reference.
     * @see https://popper.js.org/react-popper/v2/render-props/#innerref
     */
    onPopperElement?: (
        popperElement?: HTMLElement | null | undefined,
    ) => unknown;
    /**
     * Styles that will be applied to the children.
     */
    style?: StyleType;
};

/**
 * A wrapper for PopperJS that renders the children inside a portal.
 */
const DropdownPopper = function ({
    children,
    alignment = "left",
    onPopperElement,
    referenceElement,
}: Props): React.ReactElement {
    // If we are in a modal, we find where we should be portalling the menu by
    // using the helper function from the modal package on the opener element.
    // If we are not in a modal, we use body as the location to portal to.
    const modalHost =
        maybeGetPortalMountedModalHostElement(referenceElement) ||
        document.querySelector("body");

    if (!modalHost) {
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return null;
    }

    const placement =
        alignment === "left"
            ? "bottom-start"
            : alignment === "right"
              ? "bottom-end"
              : alignment;

    return ReactDOM.createPortal(
        <Popper
            innerRef={(node?: HTMLElement | null) => {
                if (node && onPopperElement) {
                    onPopperElement(node);
                }
            }}
            referenceElement={referenceElement}
            strategy="fixed"
            placement={placement}
            modifiers={modifiers}
        >
            {({placement, ref, style, hasPopperEscaped, update}) => {
                // Only suppress the menu when the popper itself has genuinely
                // escaped its clipping area. We intentionally no longer hide on
                // `isReferenceHidden`, which falsely trips during iOS pinch-zoom
                // (a layout- vs visual-viewport coordinate mismatch) and made
                // the menu impossible to open while zoomed.
                const shouldHidePopper = !!hasPopperEscaped;

                return (
                    <>
                        <VisualViewportUpdater update={update} />
                        <div
                            ref={ref}
                            style={{...style, maxInlineSize: "100%"}}
                            data-testid="dropdown-popper"
                            data-placement={placement}
                        >
                            {children(shouldHidePopper)}
                        </div>
                    </>
                );
            }}
        </Popper>,
        modalHost,
    );
};
export default DropdownPopper;
