import {StyleSheet, css} from "aphrodite";
import type {CSSProperties} from "aphrodite";

import type {StyleType} from "./types";

type StyledExport = {
    style: CSSProperties;
    className: string;
};

type StyleLeaf = CSSProperties | string;

function flatten(list?: StyleType): Array<StyleLeaf> {
    const result: Array<StyleLeaf> = [];

    if (!list) {
        return result;
    } else if (Array.isArray(list)) {
        for (const item of list) {
            result.push(...flatten(item));
        }
    } else {
        // @ts-expect-error: TypeScript thinks that `list` is still an array here
        // even though we handled that case in the preceding block.
        result.push(list);
    }

    return result;
}

/**
 * Sort a nested style list into the three buckets React needs:
 *
 *   1. Aphrodite stylesheets — detected via the `_definition` symbol on the
 *      object. These are emitted as a generated class via `css(...)`.
 *   2. Strings — treated as CSS class names (e.g. CSS Module identifiers) and
 *      appended to the resulting `className`.
 *   3. Plain objects without the Aphrodite `_definition` marker — forwarded
 *      as inline `style`. Includes objects whose keys are CSS custom
 *      properties (e.g. `{"--x": "value"}`).
 *
 * Any other truthy leaf (numbers, booleans, symbols, etc.) is silently
 * ignored.
 *
 * Fast-path: when no Aphrodite stylesheet is present in the merge, the
 * inline-style object is forwarded directly as `style` instead of being
 * wrapped in a generated class. The wrap only exists to outweigh Aphrodite's
 * `!important`, so it's pointless when no Aphrodite is involved.
 */
export function processStyleList(style?: StyleType): StyledExport {
    const aphroditeStyles: Array<any> = [];
    const inlineStylesList: Array<Record<any, any>> = [];
    const classNameStrings: Array<string> = [];

    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    // Check to see if we should inline all the styles for snapshot tests.
    const shouldInlineStyles =
        // @ts-expect-error [FEI-5019] - TS7017 - Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
        typeof global !== "undefined" && global.SNAPSHOT_INLINE_APHRODITE;

    flatten(style).forEach((child) => {
        if (typeof child === "string") {
            classNameStrings.push(child);
            return;
        }

        // Silently ignore non-string, non-object truthy values (numbers,
        // booleans, symbols, etc.). These shouldn't reach us in practice, but
        // we prefer to drop them rather than crash.
        if (typeof child !== "object" || child === null) {
            return;
        }

        // Aphrodite stylesheet detection: own `_definition` property.
        // Intentionally loose — an arbitrary plain object that happens to
        // have a `_definition` key will be treated as an Aphrodite
        // stylesheet. This matches historical behavior.
        const _definition = (child as any)._definition;
        if (_definition != null) {
            if (shouldInlineStyles) {
                const def: Record<string, any> = {};
                // React 16 complains about invalid keys in inline styles.
                // It doesn't accept kebab-case in media queries and instead
                // prefers camelCase.
                for (const [key, value] of Object.entries(_definition)) {
                    // This regex converts all instances of -{lowercaseLetter}
                    // to the uppercase version of that letter, without the
                    // leading dash.
                    def[
                        key.replace(/-[a-z]/g, (match) =>
                            match[1].toUpperCase(),
                        )
                    ] = value;
                }
                inlineStylesList.push(def);
            } else {
                aphroditeStyles.push(child);
            }
        } else {
            inlineStylesList.push(child);
        }
    });

    const inlineStylesObject = Object.assign({}, ...inlineStylesList);
    const joinedClassNames = classNameStrings.join(" ");

    // Fast-path: nothing to compete with Aphrodite's `!important`, so we can
    // forward inline styles directly as `style` and skip the generated class.
    if (aphroditeStyles.length === 0) {
        return {
            style: inlineStylesObject,
            className: joinedClassNames,
        };
    }

    // TODO(somewhatabstract): When aphrodite no longer puts "!important" on
    // all the styles, remove this <ADD JIRA ISSUE HERE IF THIS PASSES REVIEW>
    // If we're not snapshotting styles, let's create a class for the inline
    // styles so that they can apply to the element even with aphrodite's
    // use of !important.
    if (inlineStylesList.length > 0 && !shouldInlineStyles) {
        const inlineStylesStyleSheet = StyleSheet.create({
            inlineStyles: inlineStylesObject,
        });
        aphroditeStyles.push(inlineStylesStyleSheet.inlineStyles);
    }

    const aphroditeClassName = css(...aphroditeStyles);
    const finalClassName = joinedClassNames
        ? `${aphroditeClassName} ${joinedClassNames}`
        : aphroditeClassName;

    return {
        style: shouldInlineStyles ? inlineStylesObject : {},
        className: finalClassName,
    };
}
