import * as React from "react";
import {FloatingPortal} from "@floating-ui/react";
import maybeGetPortalMountedModalHostElement from "../util/maybe-get-portal-mounted-modal-host-element";

type Props = {
    /**
     * Whether to render the floating element in a portal.
     *
     * This is useful when the floating element needs to be rendered outside the
     * current DOM hierarchy and instead be rendered in the uppermost DOM
     * hierarchy. This allows us to prevent clipping issues with the floating
     * element.
     *
     * @default true
     */
    portal: boolean;

    /**
     * The children to render in the portal.
     */
    children: React.JSX.Element;

    /**
     * The reference element to use for the portal.
     */
    reference?: Element | null | undefined;
};

/**
 * Renders the floating element in a portal if enabled.
 *
 * Using a portal is recommended so it can prevent any potential clipping
 * issues.
 */
export function Portal({portal, children, reference}: Props) {
    if (portal) {
        const modalHost =
            maybeGetPortalMountedModalHostElement(reference) || document.body;

        return (
            <FloatingPortal root={modalHost as HTMLElement}>
                {children}
            </FloatingPortal>
        );
    }

    return children;
}
