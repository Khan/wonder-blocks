/**
 * The translated strings that are used to render Wonder Blocks.
 *
 * Nothing here may depend on a translation library: Wonder Blocks declares its
 * strings, the consumer app translates them. Published as the
 * `@khanacademy/wonder-blocks-core/strings` subpath so translation tooling can
 * read the English source without pulling in React.
 *
 * Keys are flat because the extraction tooling walks one `Object.entries`, and
 * prefixed by kind (`iconAlt*`, `sr*`) so a new string lands beside ones it
 * might duplicate.
 */

export type WonderBlocksStrings = {
    // Icon alt text

    /** Rendered by `Link`. */
    iconAltOpensNewTab: string;
};

/**
 * English source plus the context a translator needs. A value is
 * `string | {context?, message} | {context?, one, other}`, interpolated with
 * `%(name)s`.
 *
 * `satisfies` rather than an annotation, so a key cannot exist here without
 * existing in the type, or the reverse.
 */
export const strings = {
    // Icon alt text
    iconAltOpensNewTab: {
        context:
            "Accessible name for the icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },
} satisfies {
    [Key in keyof WonderBlocksStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
};

/**
 * Rendered wherever no provider is mounted.
 *
 * Repeated rather than read off `strings`: that reference is a property lookup
 * the minifier will not inline, so it would keep every `context` line in the
 * bundle each consumer of this package loads. `strings.test.ts` guards drift.
 */
export const defaultEnStrings: WonderBlocksStrings = {
    // Icon alt text
    iconAltOpensNewTab: "(opens in a new tab)",
};
