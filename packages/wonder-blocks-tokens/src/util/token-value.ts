/**
 * Matches a CSS `var(--name)` expression and captures the custom property name.
 * Anything after the first `,` (the `var()` fallback) is ignored.
 */
const cssVarRegex = /^\s*var\(\s*(--[^,)\s]+)/;

/**
 * Resolves the raw value of a Wonder Blocks token at runtime.
 *
 * Semantic tokens are exported as `var(--...)` strings so that theming works
 * through the CSS cascade. This helper reads the computed value of that custom
 * property, returning the concrete string (e.g. a hex or `rgba()` value) that
 * third-party libraries expecting raw color values can consume.
 *
 * If `token` is not a `var(...)` expression, it is returned unchanged.
 *
 * @param token A token string — typically a `var(--...)` reference exported
 * from this package, but a raw value is accepted and returned as-is.
 * @param element The element whose computed style should be read. Defaults to
 * `document.documentElement`. Pass a descendant of a `[data-wb-theme]`
 * element to resolve the value for that theme scope.
 * @returns The resolved raw value, trimmed. Returns an empty string when the
 * custom property is not defined on the given element.
 *
 * @example
 * ```ts
 * import {semanticColor, tokenValue} from "@khanacademy/wonder-blocks-tokens";
 *
 * tokenValue(semanticColor.core.foreground.instructive.default);
 * // => "#1865f2"
 * ```
 */
export function tokenValue(
    token: string,
    element: Element = document.documentElement,
): string {
    const match = token.match(cssVarRegex);
    if (!match) {
        return token;
    }
    return getComputedStyle(element).getPropertyValue(match[1]).trim();
}
