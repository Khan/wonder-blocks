/**
 * The translated strings that are used to render Wonder Blocks.
 *
 * Nothing here may depend on a translation library: Wonder Blocks declares its
 * strings, the consumer app translates them. Published as the
 * `@khanacademy/wonder-blocks-core/strings` subpath so translation tooling can
 * read the English source without pulling in React.
 *
 * Keys are flat because the extraction tooling walks one `Object.entries`, and
 * prefixed by kind (`icon*`, `sr*`) so a new string lands beside ones it might
 * duplicate.
 */

export type WonderBlocksStrings = {
    // Icon alt text

    /** Rendered by `Link`. */
    iconExternalLink: string;
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
    iconExternalLink: {
        context:
            "Accessible name for the icon marking a link that opens in a new window.",
        message: "Opens in a new window",
    },
} satisfies {
    [Key in keyof WonderBlocksStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
};

/** Rendered wherever no provider is mounted. */
export const defaultStrings: WonderBlocksStrings = {
    // Icon alt text
    iconExternalLink: strings.iconExternalLink.message,
};
