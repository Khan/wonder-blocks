import * as React from "react";

export type HandleEscapeKeyDown = (
    e: React.KeyboardEvent | KeyboardEvent,
    onHandled?: () => void,
) => void;

/**
 * Provides a single Escape keydown handler that:
 * 1. Stops keydown propagation
 * 2. Marks Escape as "handled" so a keyup listener can stop keyup propagation (e.g. so a parent modal doesn't also close)
 * 3. Runs your callback (e.g. close overlay, focus input)
 *
 * Call this from your keydown handlers (input, calendar root, etc.) when the user presses Escape.
 * The hook registers a keyup listener in the capture phase; when it sees Escape and you've already
 * called handleEscapeKeyDown for that keypress, it stops keyup propagation and clears the internal state.
 */
export function useEscapeKeyupCapture(): {
    handleEscapeKeyDown: HandleEscapeKeyDown;
} {
    const handledEscapeRef = React.useRef(false);

    React.useEffect(() => {
        const handleKeyup = (e: KeyboardEvent) => {
            if (e.key === "Escape" && handledEscapeRef.current) {
                e.stopPropagation();
                handledEscapeRef.current = false;
            }
        };
        window.addEventListener("keyup", handleKeyup, true);
        return () => {
            window.removeEventListener("keyup", handleKeyup, true);
        };
    }, []);

    const handleEscapeKeyDown = React.useCallback<HandleEscapeKeyDown>(
        (e, onHandled) => {
            e.stopPropagation();
            handledEscapeRef.current = true;
            onHandled?.();
        },
        [],
    );

    return {handleEscapeKeyDown};
}
