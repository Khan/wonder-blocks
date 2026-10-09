/**
 * The translated strings that are used to render Wonder Blocks.
 */
export type WonderBlocksStrings = {
    iconAltDismissBanner: string;
    iconAltOpensNewTab: string;
    iconAltStatusCritical: string;
    iconAltStatusInfo: string;
    iconAltStatusSuccess: string;
    iconAltStatusWarning: string;
};

/**
 * Untranslated strings used in Wonder Blocks. To be used by an external
 * translator to produce translated strings, passed in as `WonderBlocksStrings`.
 *
 * !! Note: Ensure that all escape sequences are double-escaped. (e.g. `\\text` -> `\\\\text`)
 */
export const strings = {
    iconAltDismissBanner: {
        context: "Accessible name for an icon button that dismisses a banner.",
        message: "Dismiss banner",
    },
    iconAltOpensNewTab: {
        context:
            "Accessible name for an icon marking a link that opens in a new tab.",
        message: "(opens in a new tab)",
    },
    iconAltStatusCritical: {
        context:
            "Accessible name for an icon indicating a critical status, such as in a banner.",
        message: "Critical",
    },
    iconAltStatusInfo: {
        context:
            "Accessible name for an icon indicating an informational status, such as in a banner.",
        message: "Info",
    },
    iconAltStatusSuccess: {
        context:
            "Accessible name for an icon indicating a success status, such as in a banner.",
        message: "Success",
    },
    iconAltStatusWarning: {
        context:
            "Accessible name for an icon indicating a warning status, such as in a banner.",
        message: "Warning",
    },
} satisfies {
    [Key in keyof WonderBlocksStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
};

/**
 * Default 'en' strings to use.
 */
export const defaultStringsEn: WonderBlocksStrings = {
    iconAltDismissBanner: strings.iconAltDismissBanner.message,
    iconAltOpensNewTab: strings.iconAltOpensNewTab.message,
    iconAltStatusCritical: strings.iconAltStatusCritical.message,
    iconAltStatusInfo: strings.iconAltStatusInfo.message,
    iconAltStatusSuccess: strings.iconAltStatusSuccess.message,
    iconAltStatusWarning: strings.iconAltStatusWarning.message,
};
