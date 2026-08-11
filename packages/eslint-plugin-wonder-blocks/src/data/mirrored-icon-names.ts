/**
 * Copy of `MIRRORED_ICON_NAMES` from
 * `@khanacademy/wonder-blocks-icon` (`src/util/mirrored-icon-names.ts`).
 *
 * Kept in this package so the published ESLint plugin does not depend on the
 * React icon package. A sync test fails if the two lists diverge — update both
 * when changing which icons PhosphorIcon mirrors in RTL.
 */
export const MIRRORED_ICON_NAMES: ReadonlySet<string> = new Set([
    "arrow-arc-left",
    "arrow-arc-right",
    "arrow-bend-double-up-left",
    "arrow-bend-double-up-right",
    "arrow-bend-down-left",
    "arrow-bend-down-right",
    "arrow-bend-left-down",
    "arrow-bend-left-up",
    "arrow-bend-right-down",
    "arrow-bend-right-up",
    "arrow-bend-up-left",
    "arrow-bend-up-right",
    "arrow-circle-down-left",
    "arrow-circle-down-right",
    "arrow-circle-left",
    "arrow-circle-right",
    "arrow-circle-up-left",
    "arrow-circle-up-right",
    "arrow-down-left",
    "arrow-down-right",
    "arrow-elbow-down-left",
    "arrow-elbow-down-right",
    "arrow-elbow-left",
    "arrow-elbow-left-down",
    "arrow-elbow-left-up",
    "arrow-elbow-right",
    "arrow-elbow-right-down",
    "arrow-elbow-right-up",
    "arrow-elbow-up-left",
    "arrow-elbow-up-right",
    "arrow-fat-left",
    "arrow-fat-line-left",
    "arrow-fat-line-right",
    "arrow-fat-lines-left",
    "arrow-fat-lines-right",
    "arrow-fat-right",
    "arrow-left",
    "arrow-line-down-left",
    "arrow-line-down-right",
    "arrow-line-left",
    "arrow-line-right",
    "arrow-line-up-left",
    "arrow-line-up-right",
    "arrow-right",
    "arrow-square-down-left",
    "arrow-square-down-right",
    "arrow-square-left",
    "arrow-square-right",
    "arrow-square-up-left",
    "arrow-u-down-left",
    "arrow-u-down-right",
    "arrow-u-left-down",
    "arrow-u-left-up",
    "arrow-u-right-down",
    "arrow-u-right-up",
    "arrow-u-up-left",
    "arrow-u-up-right",
    "arrow-up-left",
    "caret-circle-double-left",
    "caret-circle-double-right",
    "caret-circle-left",
    "caret-circle-right",
    "caret-double-left",
    "caret-double-right",
    "caret-left",
    "caret-line-left",
    "caret-line-right",
    "caret-right",
    "paper-plane",
    "paper-plane-right",
    "paper-plane-tilt",
    "sign-in",
    "sign-out",
    "text-indent",
    "text-outdent",
]);

const WEIGHT_SUFFIXES = ["Bold", "Fill", "Thin", "Light", "Duotone"] as const;

/**
 * Maps a typical icon binding name (`caretLeftIcon`, `arrowRight`,
 * `signOutBold`) to a Phosphor kebab-case name (`caret-left`, `arrow-right`,
 * `sign-out`).
 */
export function identifierToPhosphorName(
    identifier: string,
): string | undefined {
    let name = identifier;

    if (name.endsWith("Icon")) {
        name = name.slice(0, -"Icon".length);
    }

    for (const suffix of WEIGHT_SUFFIXES) {
        if (name.endsWith(suffix)) {
            name = name.slice(0, -suffix.length);
            break;
        }
    }

    if (!name) {
        return undefined;
    }

    return name
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/_/g, "-")
        .toLowerCase();
}

/**
 * Whether an identifier name refers to an icon on the RTL mirroring whitelist.
 */
export function isMirroredIconIdentifier(identifier: string): boolean {
    const phosphorName = identifierToPhosphorName(identifier);
    return phosphorName != null && MIRRORED_ICON_NAMES.has(phosphorName);
}
