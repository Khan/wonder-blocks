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
 *   3. Plain objects without the Aphrodite `_definition` marker — merged
 *      together (later keys winning). Includes objects whose keys are CSS
 *      custom properties (e.g. `{"--x": "value"}`). The merged object is
 *      returned as `style` (the DOM `style` attribute) when that is safe — see
 *      `canUseStyleAttribute` below. Otherwise it is wrapped into a generated
 *      Aphrodite class so it applies even alongside Aphrodite's `!important`.
 *
 * Any other truthy leaf (numbers, booleans, symbols, etc.) is silently
 * ignored.
 *
 * Plain objects always win over the Aphrodite stylesheets and CSS Module
 * classes in the same list, whichever path they take. In snapshot mode
 * (`SNAPSHOT_INLINE_APHRODITE`), Aphrodite stylesheets and inline objects are
 * both flattened into the returned `style` so tests can assert on concrete
 * values.
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

    const useStyleAttribute =
        !shouldInlineStyles &&
        aphroditeStyles.length === 0 &&
        inlineStylesList.every(canUseStyleAttribute);

    // TODO(somewhatabstract): When aphrodite no longer puts "!important" on
    // all the styles, remove this <ADD JIRA ISSUE HERE IF THIS PASSES REVIEW>
    // If we're not snapshotting styles, let's create a class for the inline
    // styles so that they can apply to the element even with aphrodite's
    // use of !important.
    //
    // When the list has no Aphrodite stylesheets, the inline styles go to the
    // `style` attribute instead. CSS Module rules live in a cascade layer, so
    // the attribute wins over them exactly as the generated (unlayered) class
    // did. When Aphrodite stylesheets are present we keep the generated class:
    // merged into a single class, the stylesheets' pseudo-class and media
    // query rules still override the inline values, which the `style`
    // attribute would not allow.
    if (
        inlineStylesList.length > 0 &&
        !shouldInlineStyles &&
        !useStyleAttribute
    ) {
        const inlineStylesStyleSheet = StyleSheet.create({
            inlineStyles: inlineStylesObject,
        });
        aphroditeStyles.push(inlineStylesStyleSheet.inlineStyles);
    }

    // Join the aphrodite-generated class (empty when no aphrodite is present)
    // with the CSS Module / plain class-name strings, dropping empties so we
    // never emit a leading/trailing space.
    const aphroditeClassName = css(...aphroditeStyles);
    const finalClassName = [aphroditeClassName, joinedClassNames]
        .filter(Boolean)
        .join(" ");

    return {
        style:
            shouldInlineStyles || useStyleAttribute ? inlineStylesObject : {},
        className: finalClassName,
    };
}

/**
 * Whether a plain style object can be expressed as a DOM `style` attribute.
 *
 * Only flat declarations with string or number values qualify. Anything
 * nested needs Aphrodite to generate CSS for it: pseudo-selectors
 * (`":hover"`), at-rules (`"@media ..."`), keyframe objects in
 * `animationName`, font-face objects in `fontFamily`, and array fallback
 * values.
 */
function canUseStyleAttribute(styleObject: Record<any, any>): boolean {
    return Object.values(styleObject).every(
        (value) =>
            value == null ||
            typeof value === "string" ||
            typeof value === "number",
    );
}
