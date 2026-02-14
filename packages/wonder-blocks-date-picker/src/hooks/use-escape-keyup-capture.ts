import * as React from "react";

/**
 * Ref set by the consumer to true when Escape keydown was handled (e.g. overlay closed).
 * The keyup listener uses it to stop propagation so parent modals don't also close.
 */
export type HandledEscapeRef = React.MutableRefObject<boolean>;

/**
 * Registers a keyup listener in the capture phase that, when Escape was previously
 * "handled" (handledEscapeRef.current === true), stops propagation and clears the ref.
 * This prevents a parent modal from closing when the date picker overlay closed on Escape.
 */
export function useEscapeKeyupCapture(): HandledEscapeRef {
    const handledEscapeRef = React.useRef(false);

    React.useEffect(() => {
        const handleKeyup = (e: KeyboardEvent) => {
            if (e.key === "Escape" && handledEscapeRef.current) {
                e.stopPropagation();
                handledEscapeRef.current = false;
            }
        };
        // Use capture phase so this runs before parent modals' keyup listeners
        window.addEventListener("keyup", handleKeyup, true);
        return () => {
            window.removeEventListener("keyup", handleKeyup, true);
        };
    }, []);

    return handledEscapeRef;
}
