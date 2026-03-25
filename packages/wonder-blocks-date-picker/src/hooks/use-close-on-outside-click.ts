import * as React from "react";

type RefsForOutsideClick = {
    /** Wrapper that contains the input (and is the "inside" boundary). */
    refWrapper: React.RefObject<HTMLDivElement | null>;
    /** Element that contains the calendar (may be inside a portal). */
    datePickerRef: React.RefObject<HTMLElement | null>;
};

type Params = RefsForOutsideClick & {
    showOverlay: boolean;
    closeOnSelect: boolean;
    close: () => void;
};

/**
 * Subscribes to document mouseup and closes the overlay when the click is outside
 * the wrapper and outside the calendar (including portaled overlay). Clear boundary:
 * only handles outside-click-to-close; does not manage overlay state.
 */
export function useCloseOnOutsideClick({
    refWrapper,
    datePickerRef,
    showOverlay,
    closeOnSelect,
    close,
}: Params): void {
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target: Node = e.target as Node;
            const thisElement = refWrapper.current;
            const dayPickerCalendar = datePickerRef.current;

            const isElement = target instanceof Element;
            const inThisElement = isElement && thisElement?.contains(target);
            const inCalendar = isElement && dayPickerCalendar?.contains(target);

            const inPortal =
                isElement &&
                (target as HTMLElement).closest("[data-placement]") !== null;

            const shouldClose =
                showOverlay &&
                closeOnSelect &&
                thisElement &&
                !inThisElement &&
                !inCalendar &&
                !inPortal;

            if (shouldClose) {
                close();
            }
        };

        // Use mouseup instead of click to allow the click event to propagate to the input
        document.addEventListener("mouseup", handleClick);
        return () => {
            // clean up the event listener on unmount
            document.removeEventListener("mouseup", handleClick);
        };
    }, [refWrapper, datePickerRef, showOverlay, closeOnSelect, close]);
}
