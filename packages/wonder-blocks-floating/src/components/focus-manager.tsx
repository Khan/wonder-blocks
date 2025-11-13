import * as React from "react";
import {FloatingFocusManager, FloatingRootContext} from "@floating-ui/react";

/**
 * Renders the floating element with the focus manager if enabled.
 */
export function FocusManager({
    context,
    dismissEnabled,
    useFocusManager,
    initialFocusRef,
    children,
}: {
    context: FloatingRootContext;
    dismissEnabled: boolean;
    useFocusManager: boolean;
    initialFocusRef: React.RefObject<HTMLElement> | undefined;
    children: React.JSX.Element;
}) {
    if (!useFocusManager) {
        return children;
    }

    return (
        <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={initialFocusRef}
            // TODO(WB-1987): Determine if we want to close the floating element
            // when the user focuses outside of it.
            closeOnFocusOut={false}
            visuallyHiddenDismiss={dismissEnabled}
        >
            {children}
        </FloatingFocusManager>
    );
}
