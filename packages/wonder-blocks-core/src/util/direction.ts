/**
 * The writing direction of a layout.
 */
export type Direction = "ltr" | "rtl";

const DEFAULT_DIRECTION: Direction = "ltr";

/**
 * Narrow an arbitrary `dir` attribute value to a Direction we understand.
 *
 * Returns null for values we don't handle (such as `auto`) so callers can
 * decide how to fall back.
 */
function parseDirection(value: string | null | undefined): Direction | null {
    return value === "rtl" || value === "ltr" ? value : null;
}

/**
 * Resolve the writing direction that applies to an element.
 *
 * The DOM is the source of truth. Logical CSS properties resolve against the
 * `dir` attribute, so reading `dir` is the only way to stay in sync with how
 * the layout actually renders. Direction is deliberately not accepted as an
 * argument from external sources (such as a `RequestInfo` object) — a second
 * source of truth could disagree with the DOM, and the DOM would win visually
 * while the caller acted on the other value.
 *
 * Resolution order:
 * 1. Bottom-up: the nearest ancestor of `element` carrying a `dir` attribute,
 *    including `element` itself.
 * 2. Top-down: the document element, then the body.
 * 3. `"ltr"`.
 *
 * If an ancestor carries a `dir` attribute we honour it and stop, even when
 * its value isn't one we understand. Falling through to the document in that
 * case would ignore an author's explicit intent to scope the direction.
 *
 * Note that this reads the DOM synchronously and does not subscribe to
 * changes. A layout whose direction changes after mount will not be picked up
 * until the next render.
 *
 * @param element The element to resolve the direction for. When omitted (or
 * null), only document-level direction is considered.
 *
 * @example
 * ```ts
 * // Inside an event handler, where hooks can't be used.
 * const handleKeyDown = (event: React.KeyboardEvent) => {
 *     if (isRtl(event.currentTarget)) {
 *         // ...
 *     }
 * };
 * ```
 */
export function getDirection(element?: Element | null): Direction {
    // Guard against server-side rendering, where there is no document to
    // read from.
    if (typeof document === "undefined") {
        return DEFAULT_DIRECTION;
    }

    if (element) {
        const elementWithDir = element.closest("[dir]");
        if (elementWithDir) {
            return (
                parseDirection(elementWithDir.getAttribute("dir")) ??
                DEFAULT_DIRECTION
            );
        }
    }

    return (
        parseDirection(document.documentElement.getAttribute("dir")) ??
        parseDirection(document.body?.getAttribute("dir")) ??
        DEFAULT_DIRECTION
    );
}

/**
 * Whether the layout that applies to an element is right-to-left.
 *
 * A convenience wrapper around `getDirection` for the common case. See
 * `getDirection` for how the direction is resolved.
 */
export function isRtl(element?: Element | null): boolean {
    return getDirection(element) === "rtl";
}
