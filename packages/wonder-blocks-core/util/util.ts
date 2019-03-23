// @flow
import {StyleSheet, CSSProperties, css} from "aphrodite";

import {StyleType} from "./types";

function flatten(list?: StyleType): Array<CSSProperties> {
    const result: Array<CSSProperties> = [];

    if (!list) {
        return result;
    } else if (Array.isArray(list)) {
        for (const item of list) {
            result.push(...flatten(item));
        }
    } else {
        /**
         * error TS2345: Argument of type 'OpenCSSProperties | NestedArray<false | void | 0 | OpenCSSProperties>' is not assignable to parameter of type 'CSSProperties'.
  Type 'NestedArray<false | void | 0 | OpenCSSProperties>' is not assignable to type 'CSSProperties'.
    Type 'NestedArray<false | void | 0 | OpenCSSProperties>' is not assignable to type 'Pick<Properties<string | number>, "all" | "left" | "right" | "top" | "bottom" | "font" | "clipPath" | "cursor" | "filter" | "marker" | "mask" | "resize" | "color" | "contain" | ... 720 more ... | "vectorEffect">'.
      Types of property 'filter' are incompatible.
        Type '{ <S extends StyleType>(callbackfn: (value: StyleType, index: number, array: ReadonlyArray<StyleType>) => value is S, thisArg?: any): S[]; (callbackfn: (value: StyleType, index: number, array: ReadonlyArray<StyleType>) => any, thisArg?: any): StyleType[]; }' is not assignable to type 'string'.
         */
        // @ts-ignore
        result.push(list);
    }

    return result;
}

export function processStyleList(style?: StyleType) {
    const stylesheetStyles: any[] = [];
    const inlineStyles: any[] = [];

    if (!style) {
        return {
            style: {},
            className: "",
        };
    }

    // Check to see if we should inline all the styles for snapshot tests.
    const shouldInlineStyles: boolean =
        // @ts-ignore - TODO: pass this in from jest in a typesafe way
        typeof global !== "undefined" && global.SNAPSHOT_INLINE_APHRODITE;

    flatten(style).forEach((child: any) => {
        // Check for aphrodite internal property
        if (child._definition) {
            if (shouldInlineStyles) {
                const def = {};
                // React 16 complains about invalid keys in inline styles.
                // It doesn't accept kebab-case in media queries and instead
                // prefers camelCase.
                for (const [key, value] of Object.entries(child._definition)) {
                    // This regex converts all instances of -{lowercaseLetter}
                    // to the uppercase version of that letter, without the
                    // leading dash.
                    def[
                        key.replace(/-[a-z]/g, (match) =>
                            match[1].toUpperCase(),
                        )
                    ] = value;
                }
                inlineStyles.push(def);
            } else {
                stylesheetStyles.push(child);
            }
        } else {
            inlineStyles.push(child);
        }
    });

    const inlineStylesObject = Object.assign({}, ...inlineStyles);

    // TODO(somewhatabstract): When aphrodite no longer puts "!important" on
    // all the styles, remove this <ADD JIRA ISSUE HERE IF THIS PASSES REVIEW>
    // If we're not snapshotting styles, let's create a class for the inline
    // styles so that they can apply to the element even with aphrodite's
    // use of !important.
    if (inlineStyles.length > 0 && !shouldInlineStyles) {
        const inlineStylesStyleSheet = StyleSheet.create({
            inlineStyles: inlineStylesObject,
        });
        stylesheetStyles.push(inlineStylesStyleSheet.inlineStyles);
    }

    return {
        style: shouldInlineStyles ? inlineStylesObject : {},
        className: css(...stylesheetStyles),
    };
}
