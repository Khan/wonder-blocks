import * as React from "react";

type Direction = "ltr" | "rtl";

interface DirectionDetectionOptions {
    /**
     * Explicit direction to use, bypassing DOM detection.
     * Useful when direction is known from external sources like RequestInfo.
     */
    direction?: Direction;
    /**
     * The default direction to use if no dir attribute is found.
     * Defaults to "ltr".
     */
    defaultDirection?: Direction;
}

/**
 * Hook for detecting the text direction (LTR/RTL) by looking up the DOM tree
 * for the nearest `dir` attribute. If no elementRef is provided, it will
 * detect the direction from the document element.
 *
 * This hook performs DOM queries on each render and does not use state or
 * observers, making it stable and predictable.
 *
 * @param elementRef - Optional ref to the element to start searching from.
 *                     If provided, searches up the DOM tree from this element.
 *                     If not provided, uses document-level detection.
 * @param options - Configuration options for direction detection
 * @returns The detected direction ("ltr" or "rtl")
 *
 * @example
 * ```tsx
 * // With element ref - searches up DOM tree from the element
 * const MyComponent = () => {
 *     const ref = React.useRef<HTMLDivElement>(null);
 *     const direction = useDirectionDetection(ref);
 *
 *     return (
 *         <div ref={ref}>
 *             Direction is: {direction}
 *         </div>
 *     );
 * };
 *
 * // Without element ref - uses document.documentElement.dir
 * const MyOtherComponent = () => {
 *     const direction = useDirectionDetection();
 *     return <div>Page direction is: {direction}</div>;
 * };
 *
 * // With explicit direction (e.g., from RequestInfo)
 * const MyRTLComponent = ({requestInfo}) => {
 *     const direction = useDirectionDetection(undefined, {
 *         direction: requestInfo.isRTL ? "rtl" : "ltr"
 *     });
 *     return <div>Explicit direction: {direction}</div>;
 * };
 * ```
 */
export function useDirectionDetection(
    elementRef?: React.RefObject<HTMLElement | null>,
    options: DirectionDetectionOptions = {},
): Direction {
    const {direction: explicitDirection, defaultDirection = "ltr"} = options;

    // If explicit direction is provided, use it
    if (explicitDirection) {
        return explicitDirection;
    }

    // If we have an elementRef and it has a current element, use element-based detection
    if (elementRef?.current) {
        // Look up the DOM tree for the nearest element with a dir attribute
        const elementWithDir = elementRef.current.closest("[dir]");

        if (elementWithDir) {
            const dirValue = elementWithDir.getAttribute("dir");
            return dirValue === "rtl" ? "rtl" : "ltr";
        }
    }

    // Fall back to document-level detection
    const documentDir = document.documentElement.getAttribute("dir");
    if (documentDir === "rtl") {
        return "rtl";
    }

    // Fall back to default
    return defaultDirection;
}

/**
 * Simplified version that returns the document-level direction.
 * Useful for detecting the overall page direction.
 *
 * This function reads from document.documentElement.dir on each render
 * and does not use state or observers.
 *
 * @param options - Configuration options
 * @returns The detected direction ("ltr" or "rtl")
 */
export function usePageDirection(
    options: DirectionDetectionOptions = {},
): Direction {
    const {direction: explicitDirection, defaultDirection = "ltr"} = options;

    // If explicit direction is provided, use it
    if (explicitDirection) {
        return explicitDirection;
    }

    // Check document element direction
    const documentDir = document.documentElement.getAttribute("dir");
    return documentDir === "rtl" ? "rtl" : defaultDirection;
}
