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
 * observers, making it stable for Storybook and other environments.
 *
 * @param elementRef - Optional ref to the element to start searching from.
 *                     If not provided, uses document-level detection.
 * @param options - Configuration options for direction detection
 * @returns The detected direction ("ltr" or "rtl")
 *
 * @example
 * ```tsx
 * // With element ref
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
 * // Without element ref (document-level detection)
 * const MyOtherComponent = () => {
 *     const direction = useDirectionDetection();
 *     return <div>Page direction is: {direction}</div>;
 * };
 *
 * // With explicit direction (e.g., from RequestInfo)
 * const MyRTLComponent = ({requestInfo}) => {
 *     const direction = useDirectionDetection(null, {
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

    // Search more broadly in the DOM for dir attributes (helpful for portaled content)
    // Use specific selectors to find story containers
    const storySelectors = [
        "[data-story][dir]",
        ".sb-show-main[dir]",
        ".docs-story[dir]",
        "main[dir]",
    ];

    // Check specific story containers first
    for (const selector of storySelectors) {
        const element = document.querySelector(selector);
        if (element) {
            const dirValue = element.getAttribute("dir");
            if (dirValue === "rtl") {
                return "rtl";
            }
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
 * Simplified version that just returns the current direction without a ref.
 * Useful for detecting the overall page direction.
 *
 * This function performs a direct DOM query on each render and does not use
 * state or observers.
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
